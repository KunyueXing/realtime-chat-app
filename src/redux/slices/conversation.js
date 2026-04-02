import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user_id: null,

  direct_chat: {
    conversations: [],
    current_conversation: null,
    current_messages: []
  },
  // TODO: group_chat and AI_chat
  group_chat: {},
  AI_chat: {}
}

const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    fetchDirectConversations: (state, action) => {
      state.user_id = action.payload.user_id
      state.direct_chat.conversations = action.payload.conversations.map((conv) => {
        const otherUser = conv.participants.find((p) => p._id.toString() !== state.user_id)
        const mySettings = conv.userSettings?.find((s) => s.user?.toString() === state.user_id)

        return {
          id: conv._id,
          user_id: otherUser?._id,
          name: `${otherUser?.firstName} ${otherUser?.lastName}`,
          img: otherUser?.avatar,
          online: otherUser?.status === 'online',
          pinned: mySettings?.isPinned || false,
          about: otherUser?.about,
          msg: conv.lastMessage?.content || '', // Last message text
          file: conv.lastMessage?.file,
          time: conv.lastMessage?.createdAt || conv.updatedAt,
          unread: 0 // TODO: derive from lastReadMessage when read receipts are implemented
        }
      })
    },
    setCurrentConversation: (state, action) => {
      state.direct_chat.current_conversation = action.payload.conversation_id
    },
    // Load messages for the current conversation (initial load or pagination)
    setCurrentMessages: (state, action) => {
      const { messages } = action.payload
      state.direct_chat.current_messages = messages.map((msg) => ({
        id: msg._id,
        temp_id: msg.temp_id,
        type: msg.type,
        content: msg.content,
        file: msg.file,
        incoming: msg.sender?.toString() !== state.user_id,
        status: 'delivered',
        createdAt: msg.createdAt
      }))
    },
    // Prepend older messages when user scrolls up (pagination)
    prependMessage: (state, action) => {
      const { messages } = action.payload
      const older = messages.map((msg) => ({
        id: msg._id,
        temp_id: msg.temp_id,
        type: msg.type,
        content: msg.content,
        file: msg.file,
        incoming: msg.sender?.toString() !== state.user_id,
        status: 'delivered',
        createdAt: msg.createdAt
      }))
      state.direct_chat.current_messages = [...older, ...state.direct_chat.current_messages]
    },
    // Add conversation if new, or update it if it already exists (used after start_conversation)
    upsertConversation: (state, action) => {
      const conv = action.payload
      const otherUser = conv.participants.find((p) => p._id.toString() !== state.user_id)
      const mySettings = conv.userSettings?.find((s) => s.user?.toString() === state.user_id)
      const normalized = {
        id: conv._id,
        user_id: otherUser?._id,
        name: `${otherUser?.firstName} ${otherUser?.lastName}`,
        img: otherUser?.avatar,
        online: otherUser?.status === 'online',
        pinned: mySettings?.isPinned || false,
        about: otherUser?.about,
        msg: conv.lastMessage?.content || '',
        file: conv.lastMessage?.file,
        time: conv.lastMessage?.createdAt || conv.updatedAt,
        unread: 0
      }
      const idx = state.direct_chat.conversations.findIndex((c) => c.id?.toString() === conv._id?.toString())
      if (idx !== -1) {
        state.direct_chat.conversations[idx] = normalized
      } else {
        state.direct_chat.conversations.unshift(normalized)
      }
    },

    // Optimistic: add a pending message immediately on send (before ACK)
    addPendingMessage: (state, action) => {
      state.direct_chat.current_messages.push({
        ...action.payload,
        status: 'pending'
      })
    },
    // Update message status on ACK (e.g. from 'pending' to 'delivered') or max retries (failed)
    updateMessageStatus: (state, action) => {
      const { temp_id, status, message_id } = action.payload
      const msg = state.direct_chat.current_messages.find((m) => m.temp_id === temp_id)
      if (msg) {
        msg.status = status
        if (message_id) {
          msg.id = message_id // Update with real ID from server
        }
      }
    },
    // Incoming message from WebSocket (new_message event)
    addMessage: (state, action) => {
      const { message } = action.payload
      const newMsg = {
        id: message._id,
        temp_id: message.temp_id,
        type: message.type,
        content: message.content,
        file: message.file,
        incoming: message.sender?.toString() !== state.user_id,
        status: 'delivered',
        createdAt: message.createdAt
      }
      state.direct_chat.current_messages.push(newMsg)

      // Also update the last message preview in the conversation list
      state.direct_chat.conversations = state.direct_chat.conversations.map((conv) => {
        if (conv.id?.toString() === message.conversationId?.toString()) {
          return {
            ...conv,
            msg: message.content,
            file: message.file,
            time: message.createdAt
          }
        }
        return conv
      })
    }
  }
})
const conversationReducer = conversationSlice.reducer
export default conversationReducer

export const {
  setCurrentConversation,
  setCurrentMessages,
  prependMessage,
  addPendingMessage,
  updateMessageStatus,
  addMessage,
  fetchDirectConversations,
  upsertConversation
} = conversationSlice.actions

