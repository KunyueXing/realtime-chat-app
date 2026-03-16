# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start          # Dev server on port 3000
npm run build      # Production build
npm test           # Run tests
npm run lint       # ESLint with auto-fix across src/
npm run format     # Prettier formatting across src/
```

A Husky pre-commit hook runs `lint` and `format` automatically on every commit.

## Architecture

This is a **React-only frontend**. The backend server is expected at `http://localhost:8000` (not in this repo). Configure via environment variables:
- `REACT_APP_API_BASE_URL` — REST API base URL
- `REACT_APP_SOCKET_URL` — Socket.io server URL

### Communication Channels

Two parallel channels run simultaneously:

1. **REST (Axios)** — persistent operations (auth, CRUD). The enhanced Axios client lives in `src/utils/api.js`. It automatically injects the JWT Bearer token and handles 401 responses by dispatching logout.
2. **WebSocket (Socket.io)** — real-time events (messages, friend requests, notifications). Managed in `src/contexts/SocketContext.js`. The socket connects automatically when `isLoggedIn === true` and `user_id` is present; it disconnects on logout.

### State Layers

| Layer | File | Purpose |
|---|---|---|
| Redux store | `src/redux/store.js` | Persisted global state (auth, app, conversations, friends) |
| SocketContext | `src/contexts/SocketContext.js` | Socket connection state + emit/receive |
| SettingContext | `src/contexts/SettingContext.js` | Theme/UI preferences |

Redux slices use **Entity Adapters** for normalized friend/user data (O(1) lookups). State is persisted via Redux Persist and hydrated from localStorage.

### Routing

Routes are defined in `src/routes/index.js` with lazy-loaded components and two layout wrappers:
- `AuthLayout` — unauthenticated pages (login, register, reset, verify)
- `DashboardLayout` — authenticated app pages

### API Endpoints

All endpoints are defined as constants in `src/utils/api.js` under namespaces: `AUTH`, `USER`, `FRIEND`, `CHAT`, `MESSAGE`. All backend routes use the `/api/v1/` prefix.

### Custom Hooks Pattern

Operations that need both HTTP and socket coordination use custom hooks in `src/hooks/`:
- `useFriend()` — friend CRUD operations (HTTP) + socket notifications
- `useFriendEvents()` — listens to incoming friend socket events
- `useSocket()` — access SocketContext

### i18n

5 languages supported (en, fr, cn, es, ar) via `react-i18next`. Default is English.

---

## System Design

### Scale Targets

| Metric | Value |
|---|---|
| Registered users | 50k |
| Concurrent WebSocket connections (peak) | 10k (20% of registered) |
| Peak message rate | 100–1,000 msg/s |
| Read/write ratio | 10:1 (read-heavy) |
| Text delivery latency | <300ms |
| Uptime target | 99.9% (~9 hours downtime per year)|
| Deployment | Single-region |
| Multi-device per user | Not supported now, kept open for future |

### Message Characteristics

| Item | Value |
|---|---|
| Avg DB record size | ~500 bytes |
| DB storage (steady state) | ~2.5–5GB |
| S3 media storage (estimated) | ~100GB |
| Max image upload | 5MB |
| Max file upload | 20MB |
| Max video | 30s clip |
| Media storage | AWS S3 (object storage); DB stores URL reference only |

### Delivery latency
For single-region with 10k WebSocket connections, target:

| Event | Target | Explanation |
| --- | --- | --- |
| Message delivery (text) | < 200 ms | Server receives -> fans out to recipient socket |
| Message delivery (media) | < 500 ms | Includes S3 upload time |
| Typing indicator | < 500 ms | Users tolerate slight delay here |
| Presence (online / offline) | < 2 s | Not latency-sensitive |


### Retention Policy

- Messages deleted after **90 days** via a background cron job
- No per-conversation message cap (avoids per-conversation tracking complexity)
- Text messages may be held longer than media attachments in the future
- Media files have a stricter/shorter retention limit than text

### Current Scope

- **Direct messaging only** — group chat deferred to next phase (target: up to 20 members when built)
- Single-device per user session

### Implementation Priority Order

> **CI setup first** — before implementing any feature, set up GitHub Actions CI (lint). Takes ~30 min, free for public repos.

| Priority | Item | Notes |
|---|---|---|
| 1 | Cursor-based pagination | Replace full message fetch |
| 2 | Message ACK + retry + delivery states | pending → delivered → read / failed |
| 3 | S3 presigned URL media uploads | Images, PDF, txt, video |
| 4 | Socket rate limiting | Security — in-memory per userId, before launch |
| 5 | Message search | MongoDB text index |
| 6 | Read receipts | `read` state, last-read cursor per conversation |
| 7 | Structured logging + metrics | `pino` logs; server responsibility — frontend ensures consistent event naming |
| 8 | Load testing | k6 or Artillery — run after logging so metrics are available to analyze results; document latency percentiles and connection counts against scale targets |
| 9 | Push notifications | FCM web push for offline users |
| 10 | Dockerize + live URL | Dockerfile + docker-compose; `config.env` pattern is already Docker-friendly |
| 11 | CD pipeline | GitHub Actions auto-deploy of Docker image |

### Future: Multi-Server Scaling (Not Current Phase)

Redis Pub/Sub via `@socket.io/redis-adapter` — required when adding a second server. Handler code unchanged; only the adapter changes. Not needed until single-server capacity is exhausted.

### Key Design Decisions

- **Message search**: Use MongoDB full-text search — sufficient for 1–10M messages, no Elasticsearch needed
- **Message ordering**: Strict ordering via DB-assigned `created_at` timestamp; MongoDB `ObjectId` encodes timestamp and doubles as a cursor
- **Typing indicators**: Client debounces before emitting `typing_start`; server fans out to conversation partner; no DB writes
- **Presence (online/offline)**: Tracked in-memory/socket only, up to 2s staleness is acceptable
- **Retention cron**: Single job deletes rows older than 90 days — no per-conversation cap logic

---

## Feature Design

### Cursor-Based Pagination

- **Page size**: 50 messages per page
- **Scroll direction**: scroll up to load older messages; always open at the latest message (no saved scroll position)
- **Cursor**: MongoDB `ObjectId` (`_id`) doubles as cursor — encodes timestamp, index-friendly, no extra field needed
- **Initial load**: fetch latest 50 with no cursor, scroll to bottom
- **Load more**: fetch 50 messages where `_id < cursor` (cursor = oldest `_id` in current view)
- **Response shape**: `{ messages[], nextCursor, hasMore }`
- **UX**: show loading spinner at top while fetching; show "no more messages" when `hasMore: false`

#### Flow
```
Open conversation
    → fetch latest 50 messages (no cursor), scroll to bottom

User scrolls to top
    → fetch next 50 messages older than oldest visible message
    → maintain scroll position (don't jump to bottom)
    → show loading spinner at top while fetching
    → hide spinner + show "no more messages" when exhausted
```

### S3 Media Uploads (Presigned URL)

Server never touches file bytes. Flow:
```
1. Client validates file type/size locally
2. Client → POST /api/v1/upload/presign { fileName, fileType, fileSize }
3. Server validates (type whitelist, size limits) → returns { uploadUrl, fileKey }
4. Client → PUT file directly to S3 using uploadUrl (shows progress bar)
5. Upload complete → client sends message event with fileKey
6. Server saves message with S3 fileKey → ACKs
```

- **Storage**: private S3 bucket; DB stores `fileKey` only
- **Viewing**: server generates **signed URLs with 24-hour expiry** when fetching message history
- **Upload limits**: image 5MB, file 20MB, video 30s clip
- **Supported types**: images, PDFs, txt, video, links
- **Failure UX**: show inline progress bar during upload; on failure show "Failed · Retry" inline (WhatsApp-style); user taps retry to re-attempt
- **Security**: Skip virus/content scan at the current stage

### Message Delivery States (ACK + Retry + Optimistic UI)

Full state machine shown to sender (icon after message bubble):

```
pending ○  →  delivered ✓✓  →  read ✓✓ (blue)
                                    ↑
                         recipient opens conversation
```

| State | Icon | Meaning |
|---|---|---|
| `pending` | ○ circle | Sending — waiting for server ACK |
| `delivered` | ✓✓ grey | Recipient's device received the message |
| `read` | ✓✓ blue | Recipient has opened the conversation |
| `failed` | ✕ cross | All retries exhausted — tap to retry |

**Send flow:**
```
User sends → generate temp_id (UUID) on client
→ add to Redux as { status: 'pending' }, show ○
→ emit socket event { temp_id, content, ... } with 5s ACK timeout
  ACK received → status: 'delivered', show grey ✓✓
  Timeout → retry up to 3x (2s apart)
  All retries fail → status: 'failed', show ✕ + "Tap to retry"

Recipient opens conversation
→ server emits message_read_ack to sender
→ update all messages up to lastReadMessageId → status: 'read', show blue ✓✓
```

**Server deduplication**: before saving, check if `temp_id` already exists → return existing ACK (idempotent, prevents duplicates on retry).

**Read receipt (frontend responsibility):**
- On conversation open → emit `message_read { conversationId, lastMessageId }` (batch, not per message)
- Listen for `message_read_ack` → update Redux state for all messages up to `lastMessageId`
- State machine must accept `read` from any prior state (edge case: read arrives before delivered ACK)

The `read` should be tracked **per conversation**: store "last read `message_id`" per user per conversation. Count messages after `lastReadMessageId` for query to find unread count. Cost one storage record per user per conversation. Can only show "read up to here".

**Known tradeoff (next phase):** When recipient is offline, message stays `pending` (○) until they reconnect, which may feel like a send failure to the sender. Fix: split pending into two sub-states — server-ACKed (dimmed ✓) vs. recipient-delivered (✓✓) — so sender knows the server received it even if recipient is offline.

### Rate Limiting
`express-rate-limit` at 3000 req/hr — covers HTTP requests

**Rate limit on sockets:**
| Event | Designed limit |
| --- | --- |
| text_message | 10 messages / second per user|
| typing_start | 1 emit / second per user (debounce on client too) |
| send_friend_request | 20 / hour per user|
| get_direct_messages | 30 / minute per user|

- **Implementation for single server:** In-memory rate limiting per `userId`, via a sinmple Map tracking event timestamps.No Redis needed at the current stage.