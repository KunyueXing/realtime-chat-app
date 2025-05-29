import { createSlice, current } from '@reduxjs/toolkit'

const initialState = {
  user_id: null,
  // one-to-one chat
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
    fetchDirectMessages: (state, action) => {
      state.user_id = action.payload.user_id
      const list = action.payload.conversations.map((ele) => {
        const user = ele.participants.find((el) => el._id.toString() !== state.user_id)

        // Count unread messages sent *to* the logged-in user
        const unreadCount = ele.messages.filter((msg) => msg.isRead === false && msg.receiver?.toString() === state.user_id).length

        return {
          id: ele._id, // Conversation ID
          user_id: user?._id, // Other participant's user ID
          name: `${user?.firstName} ${user?.lastName}`,
          img: user?.avatar,
          online: user?.status === 'online',
          pinned: ele.isPinned,
          about: user?.about,
          msg: ele.messages.slice(-1)[0]?.content, // Last message text
          file: ele.messages.slice(-1)[0]?.file, // Last message file (if any)
          time: ele.messages.slice(-1)[0]?.createdAt, // Last message time
          unread: unreadCount // unread
        }
      })
      // action.payload is an array of conversations
      state.direct_chat.conversations = list
    },
    updateDirectConversation: (state, action) => {
      const { thisConversation } = action.payload
      if (state.user_id === null) {
        state.user_id = action.payload.user_id
      }

      state.direct_chat.conversations = state.direct_chat.conversations.map((ele) => {
        // If the conversation ID matches the current conversation ID
        if (ele.id === thisConversation._id) {
          // Update this existing conversation
          const user = thisConversation.participants.find((el) => el._id.toString() !== state.user_id)
          const unreadCount = thisConversation.messages.filter(
            (msg) => msg.isRead === false && msg.receiver?.toString() === state.user_id
          ).length

          // Return the updated conversation object
          return {
            id: thisConversation._id, // Conversation ID
            user_id: user?._id, // Other participant's user ID
            name: `${user?.firstName} ${user?.lastName}`,
            img: user?.avatar,
            online: user?.status === 'online',
            pinned: thisConversation.isPinned,
            about: user?.about,
            // Update last message details
            msg: thisConversation.messages.slice(-1)[0]?.content, // Last message text
            file: thisConversation.messages.slice(-1)[0]?.file, // Last message file (if any)
            time: thisConversation.messages.slice(-1)[0]?.createdAt, // Last message time
            unread: unreadCount // unread count
          }
        }
        // If the conversation ID does not match, return it unchanged
        return ele
      })
    },
    addDirectConversation: (state, action) => {
      const { thisConversation } = action.payload
      if (state.user_id === null) {
        state.user_id = action.payload.user_id
      }

      const user = thisConversation.participants.find((el) => el._id.toString() !== state.user_id)

      const unreadCount = thisConversation.messages.filter(
        (msg) => msg.isRead === false && msg.receiver?.toString() === state.user_id
      ).length

      // Add the new conversation to the list
      state.direct_chat.conversations.push({
        id: thisConversation._id, // Conversation ID
        user_id: user?._id, // Other participant's user ID
        name: `${user?.firstName} ${user?.lastName}`,
        img: user?.avatar,
        online: user?.status === 'online',
        pinned: thisConversation.isPinned,
        about: user?.about,
        msg: thisConversation.messages.slice(-1)[0]?.content, // Last message text
        file: thisConversation.messages.slice(-1)[0]?.file, // Last message file (if any)
        time: thisConversation.messages.slice(-1)[0]?.createdAt, // Last message time
        unread: unreadCount // unread count
      })
    }
  }
})
const conversationReducer = conversationSlice.reducer
export default conversationReducer

// get all one-to-one chats for the logged-in user and will be listed in the sidebar when chat is opened
export const FetchDirectMessages = ({ conversations, user_id }) => {
  return async (dispatch, getState) => {
    dispatch(conversationSlice.actions.fetchDirectMessages({ conversations, user_id }))
  }
}

// update the current one-to-one conversation in the chat list
export const UpdateDirectConversation = ({ thisConversation, user_id }) => {
  return async (dispatch, getState) => {
    dispatch(conversationSlice.actions.updateDirectConversation({ thisConversation, user_id }))
  }
}

// add a new one-to-one conversation to the chat list
export const AddDirectConversation = ({ thisConversation, user_id }) => {
  return async (dispatch, getState) => {
    dispatch(conversationSlice.actions.addDirectConversation({ thisConversation, user_id }))
  }
}
