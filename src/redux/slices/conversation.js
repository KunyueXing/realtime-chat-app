import { createSlice, current } from '@reduxjs/toolkit'

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
    }
  }
})

export default conversationSlice.reducer

export const FetchDirectMessages = ({ conversations, user_id }) => {
  return async (dispatch, getState) => {
    dispatch(conversationSlice.actions.fetchDirectMessages({ conversations, user_id }))
  }
}
