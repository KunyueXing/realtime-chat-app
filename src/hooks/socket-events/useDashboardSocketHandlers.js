import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { OpenSnackBar } from '../../redux/slices/app'
import { getSocket } from '../../socket'
import { useSelector } from 'react-redux'

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
    // start chat -- add new conversation to the chat list or open the existing one
    socket.on('start_chat', (data) => {
      console.log('Start chat:', data)

      const exsitingConversation = conversations.find((ele) => ele?.id === data?._id)

      if (exsitingConversation) {
        console.log('Conversation already exists:', exsitingConversation)

        // TODO: dispatch -- update the current conversation
      } else {
        console.log('New conversation:', data)
        // TODO: dispatch -- add new conversation to the chat list
      }

      // TODO: dispatch -- select the current conversation
    })

    return () => {
      socket?.off('new_friend_request')
      socket?.off('friend_request_accepted')
      socket?.off('friend_request_sent')
      socket?.off('start_chat')
    }
  }, [isLoggedIn, dispatch, user_id])
}

export default useDashboardSocketHandlers
