import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { OpenSnackBar, SelectConversation } from '../../redux/slices/app'
import { getSocket } from '../../socket'
import { useSelector } from 'react-redux'
import { AddDirectConversation, UpdateDirectConversation } from '../../redux/slices/conversation'

const useDashboardSocketHandlers = ({ user_id, isLoggedIn }) => {
  const dispatch = useDispatch()
  const { conversations, current_conversation } = useSelector((state) => state.conversation.direct_chat)

  useEffect(() => {
    if (!isLoggedIn || !user_id) {
      return
    }

    console.log('useDashboardSocketHandlers user_id:', user_id)
    const socket = getSocket(user_id)
    console.log('useDashboardSocketHandlers socket:', socket)

    // Friend request handlers
    socket.on('new_friend_request', (data) => {
      console.log('Friend request received:', data)
      dispatch(
        OpenSnackBar({
          message: data.message,
          severity: 'info'
        })
      )
    })

    socket.on('friend_request_accepted', (data) => {
      console.log('Friend request accepted:', data)
      dispatch(
        OpenSnackBar({
          message: data.message,
          severity: 'success'
        })
      )
    })

    socket.on('friend_request_sent', (data) => {
      console.log('Sent friend request:', data)
      dispatch(
        OpenSnackBar({
          message: data.message,
          severity: 'info'
        })
      )
    })

    // TODO: audio/video notifications
    // TODO: new message
    // start one-to-one chat -- add new conversation to the chat list or open the existing one
    socket.on('start_chat', (data) => {
      console.log('Start chat:', data)

      const exsitingConversation = conversations.find((ele) => ele?.id === data?._id)

      if (exsitingConversation) {
        console.log('Conversation already exists:', exsitingConversation)

        // dispatch -- update the current conversation
        dispatch(UpdateDirectConversation({ thisConversation: data, user_id }))
      } else {
        console.log('New conversation:', data)
        // dispatch -- add new conversation to the chat list
        dispatch(AddDirectConversation({ thisConversation: data, user_id }))
      }

      // dispatch -- the (existing) specific conversation
      dispatch(SelectConversation({ room_id: data?._id, chat_type: 'direct' }))
    })

    return () => {
      socket?.off('new_friend_request')
      socket?.off('friend_request_accepted')
      socket?.off('friend_request_sent')
      socket?.off('start_chat')
    }
  }, [isLoggedIn, dispatch, user_id, conversations])
}

export default useDashboardSocketHandlers
