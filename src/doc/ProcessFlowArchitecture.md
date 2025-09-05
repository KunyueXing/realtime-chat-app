
## Outline
- 1 Authentication Flows
  - 1.1 User Registration (HTTP + email verification)
  - 1.2 Login Process (HTTP + socket connection establishment)
  - 1.3 Password Reset (HTTP + email flow)
  - 1.4 Logout (HTTP + socket cleanup)
- 2 Friend Request Flows
  - 2.1 Send Friend Request (HTTP + real-time notification)
  - 2.2 Accept Friend Request (HTTP + real-time notification)
- 3 Chat/ Messaging Flows
  - 3.1 Start Conversation (Socket + HTTP for persistence)
  - 3.2 Send Message (HTTP + real-time socket delivery)
  - 3.3 Message Status Updates (delivered, read receipts via socket)
  - 3.4 Typing Indicators (socket-only, no persistence)
- 4 Audio / Video Call Flows
  - 4.1 Initiate Call (Socket signaling + WebRTC)
  - 4.2 Accept/Reject Call (Socket events + state management)
  - 4.3 Call Termination (cleanup processes)
- 5 User Presence / Status
  - 5.1 Online / Offline Status (socket connection + database updates)
- 6 File / Media Sharing
  - 6.1 Upload Process (HTTP upload + progress tracking)
  - 6.2 Media Message Delivery (file processing + real-time notification)
- 7 Notification System
<br>

## 1 Authentication Flows
### 1.1 User Registration (HTTP + email verification)
```
1. User fills registration form (firstName, lastName, email, password)
   ↓
2. Component calls dispatch(RegisterUser(formValues, navigate))
   ↓
3. Redux action performs HTTP POST /api/v1/auth/register
   ↓
4. Loading state set to true, UI shows loading indicator
   ↓
5. Server processes registration:
   - Validates email format and password strength
   - Checks for existing user with same email
   - Creates new user in database (the default value for verified is set to false)
   - Generates email verification token
   - Sends verification email
   ↓
6. Server responds with success message
   ↓
7. Redux updates state:
   - Sets email in auth state for verification page
   - Shows success notification
   - Sets loading to false
   ↓
8. Navigation redirects to /auth/verify after 800ms delay
   ↓
9. User receives verification email
   ↓
10. User enters verification code on verify page
   ↓
11. Component calls dispatch(VerifyUser(formValues, navigate))
   ↓
12. Redux action performs HTTP POST /api/v1/auth/verify
   ↓
13. Server verifies the code:
   - Validates verification token
   - Marks user as verified
   - Generates JWT token
   - Returns token and user_id
   ↓
14. Redux updates auth state:
   - Sets isLoggedIn: true
   - Stores token and user_id
   - Clears email from state
   ↓
15. localStorage stores user_id for socket connection
   ↓
16. Navigation redirects to /app after 800ms delay
   ↓
17. SocketContext detects isLoggedIn: true and user_id
   ↓
18. Socket connection automatically establishes
   ↓
19. User lands on dashboard with active socket connection
```

---

### 1.2 Login Process Flow (HTTP + socket connection establishment)
```
1. User enters email and password
   ↓
2. Component calls dispatch(LoginUser(formValues, navigate))
   ↓
3. Redux action performs HTTP POST /api/v1/auth/login
   ↓
4. Loading state set to true, UI shows loading indicator
   ↓
5. Server processes login:
   - Validates credentials against database
   - Generates JWT token
   - Returns token and user_id
   ↓
6. Redux updates auth state:
   - Sets isLoggedIn: true
   - Stores token and user_id
   - Shows success notification
   ↓
7. localStorage stores user_id for persistence
   ↓
8. Navigation redirects to /app after 800ms delay
   ↓
9. SocketContext useEffect detects state change:
   - isLoggedIn: true
   - user_id: present
   ↓
10. Socket connection established:
    - Creates io() connection with user_id in query
    - Sets connection state to connecting
    - Includes auth: { user_id, timestamp }
    ↓
11. Socket connects successfully:
    - Server updates user status to 'online'
    - Sets user's socketId in database
    - Connection state updated to connected
    ↓
12. Socket emits 'verify_connection' for validation
    ↓
13. User lands on dashboard with active real-time connection
```

---

### 1.3 Password Reset (HTTP + email flow)
```
1. User clicks "Forgot Password" and enters email
   ↓
2. Component calls dispatch(ForgotPassword(formValues))
   ↓
3. Redux action performs HTTP POST /api/v1/auth/forgot-password
   ↓
4. Server processes forgot password:
   - Validates email exists in database
   - Generates password reset token
   - Sends reset email with token/link
   ↓
5. Server responds with success message
   ↓
6. Redux shows success notification
   ↓
7. User receives password reset email
   ↓
8. User clicks reset link (opens /auth/reset-password?token=xyz)
   ↓
9. User enters new password on reset page
   ↓
10. Component calls dispatch(NewPassword(formValues, navigate))
    ↓
11. Redux action performs HTTP PATCH /api/v1/auth/reset-password
    ↓
12. Server processes password reset:
    - Validates reset token
    - Updates user password
    - Generates new JWT token
    - Returns token and user_id
    ↓
13. Redux automatically logs user in:
    - Sets isLoggedIn: true
    - Stores new token and user_id
    - Shows success notification
    ↓
14. localStorage stores user_id
    ↓
15. Navigation redirects to /app after 800ms delay
    ↓
16. SocketContext detects login state change
    ↓
17. Socket connection automatically establishes
    ↓
18. User lands on dashboard with active socket connection
```

---

## 2 Friend Request Flows
### 2.1 Send Friend Request (HTTP + real-time notification)
```
1. User clicks "Send Request" button
   ↓
2. Component calls useFriends().sendFriendRequest(receiverId)
   ↓
3. useFriends dispatches sendFriendRequestHTTP({ receiverId })
   ↓
4. Redux action performs HTTP POST /api/v1/friends/requests
   ↓ 
5. Optimistic UI update: removes user from users list
   ↓
6. Server: friendController.sendFriendRequest()
   - Checks for existing request (409 if exists)
   - Creates new FriendRequest document
   - Updates both users' friendRequests arrays
   - Returns friendRequest object
   ↓
7. If HTTP succeeds: UI shows friend request succesfully sent. And, emit 'send_friend_request' socket event
   ↓
8. Server socket handler: socket/friend.js
   - Looks up receiver's socketId from database
   - Looks up sender's profile details
   - Emits 'new_friend_request' to receiver's socket
   ↓
9. Receiver client gets 'new_friend_request' socket event
   ↓
10. useFriendEvents handles event → dispatches handleFriendRequestReceived
   ↓
11. Redux state updated → UI re-renders → notification shown for the friend request receiver
```

---

### 2.2 Accept Friend Request (HTTP + real-time notification)
```
1. User clicks "Accept" button
   ↓
2. Component calls useFriends().acceptFriendRequest(requestId)
   ↓
3. useFriends dispatches acceptFriendRequestHTTP({ requestId })
   ↓
4. Redux action performs HTTP POST /api/v1/friends/requests/{requestId}/accept
   ↓
5. Optimistic UI update: adds friend to friends list, removes request
   ↓
6. Server: friendController.acceptFriendRequest()
   - Finds and populates FriendRequest with sender details
   - Adds each user to other's friends array
   - Deletes the FriendRequest document
   - Removes request from both users' friendRequests arrays
   - Returns populated sender object as requestSender
   ↓
7. If HTTP succeeds: emit 'accept_friend_request' socket event
   ↓
8. Server socket handler: socket/friend.js
   - Looks up original sender's socketId
   - Looks up accepter's profile details
   - Emits 'friend_request_accepted' to sender's socket
   ↓
9. Original sender gets 'friend_request_accepted' socket event
   ↓
10. useFriendEvents handles event → dispatches handleFriendRequestAccepted
   ↓
11. Redux state updated → UI re-renders → notification shown for the original sender
```

---
