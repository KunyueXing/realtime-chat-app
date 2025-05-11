import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { OpenSnackBar } from '../../redux/slices/app'
import { getSocket } from '../../socket'

const useDashboardSocketHandlers = ({ user_id, isLoggedIn }) => {
  const dispatch = useDispatch()
  const socket = getSocket()

  useEffect(() => {
    if (!isLoggedIn || !socket) {
      return
    }

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
    // TODO: start chat

    return () => {
      socket?.off('new_friend_request')
      socket?.off('friend_request_accepted')
      socket?.off('friend_request_sent')
    }
  }, [socket, isLoggedIn, dispatch, user_id])
}

export default useDashboardSocketHandlers
