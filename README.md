# A-realtime-chat-app-with-ChatGPT-API
## Outline
- [Summary](https://github.com/KunyueXing/realtime-chat-app/edit/main/README.md#summary)
- [Features](https://github.com/KunyueXing/realtime-chat-app/edit/main/README.md#features)
- Tech Stack / Major Dependencies
- Project Structure
- Integration with Backend
- Installation & Setup
- Testing
- Screenshots
- Deployment Instructions
- Known Issues / Limitations
- Roadmap / Features Under Development
- Acknowledgements
  
---
### Summary
This is the frontend of a real-time chat application using React, Redux, Socket.IO, and Material UI. It connects to a Node.js backend via REST and WebSocket APIs.

---

### Features
1. **User Authentication and Management**
   - Users can register for an account with email and password.
   - Users receive a verification email and must verify their email before accessing full features.
   - Users can log in and log out securely.
   - Password reset functionality is available.

2. **User Discovery and Friend Management**
   - Users can search for other users by username.
   - Users can send, accept, or reject friend requests.
   - Users can view a list of friends and pending friend requests.
   - Users can remove friends.

3. **1-to-1 Messaging**
   - Users can send and receive 1-to-1 messages in real time.
   - Messages can include text, images, links, documents, and emojis.
   - Users can see message delivery and read status (optional).
   - Users can delete or edit their own messages.

4. **User Profile**
   - Users can edit their profile, including avatar, display name, and bio.
   - Users can view other users’ public profiles.

5. **Chat and Group Chats**
   - Users can create group chats and name the group.
   - Users can invite friends to join a group.
   - Invited users can accept or reject group invitations.
   - Group admins can remove members or assign admin roles (optional).
   - Users can leave groups.
   - Users can search for a chat (by chat name, participant, or group).

6. **Group Messaging**
   - Users can send and receive group messages in real time.
   - Messages can contain text, images, links, documents, and emojis.

7. **Audio and Video Calls**
   - Users can initiate audio calls with friends.
   - Users can initiate video calls with friends.
   - Users can join group audio/video calls (optional/advanced).

8. **Personalization and Accessibility**
   - Users can switch between day (light) and night (dark) themes.
   - The app should be responsive and accessible on both desktop and mobile devices (optional).

9. **Starred and Pinned Messages**
   - Users can star (favorite) important messages for quick access.
   - Users can view a list of all their starred messages.
   - Users can pin important chats (optional).

10. **Media and File Management**
    - Users can view a collection of all media, links, and documents shared in a chat.
    - Users can download or preview shared files.

11. **AI Chat**
    - There is a pinned chat with an AI assistant available to all users.
    - Users can ask questions or interact with the AI chat at any time.

12. **Notifications**
    - Users receive notifications for new messages, friend requests, and group invites.
    - Push notifications are supported on mobile (optional).

13. **Security**
    - All data is transmitted securely (HTTPS).
    - User data is protected and privacy is respected.
