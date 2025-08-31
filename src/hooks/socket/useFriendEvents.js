import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useSocket } from '../../contexts/SocketContext'
import { handleFriendRequestAccepted, handleFriendRequestReceived } from '../../redux/slices/friend'
import { OpenSnackBar } from '../../redux/slices/app'

/*
  Registers socket event listeners and dispatches Redux actions. 
  Passive listening, converting socket events -> Redux state updates
*/
export const useFriendEvents = () => {
  const { socket } = useSocket()
  const dispatch = useDispatch()
  const handlersRegistered = useRef(false)

  useEffect(() => {
    if (!socket || handlersRegistered.current) {
      return
    }

    console.log('Registering friend socket events')

    // Friend request events
    const handleNewFriendRequest = (data) => {
      console.log('New friend request received via socket: ', data)
      dispatch(handleFriendRequestReceived(data))
    }

    const handleRequestAccepted = (data) => {
      console.log('Friend request accepted via socket:', data)
      dispatch(handleFriendRequestAccepted(data))
    }

    const handleFriendRequestSent = (data) => {
      console.log('Friend request sent confirmation:', data)
      dispatch(OpenSnackBar({ severity: 'success', message: 'Friend request sent!' }))
    }

    const handleFriendRequestRejected = (data) => {
      console.log('Friend request rejected:', data)
      dispatch(OpenSnackBar({ severity: 'info', message: `${data.rejector?.firstName || 'Someone'} declined your friend request` }))
    }

    // Register handlers
    socket.on('new_friend_request', handleNewFriendRequest)
    socket.on('friend_request_accepted', handleRequestAccepted)
    socket.on('friend_request_sent', handleFriendRequestSent)
    socket.on('friend_request_rejected', handleFriendRequestRejected)

    handlersRegistered.current = true

    // Cleanup
    return () => {
      if (socket) {
        socket.off('new_friend_request', handleNewFriendRequest)
        socket.off('friend_request_accepted', handleRequestAccepted)
        socket.off('friend_request_sent', handleFriendRequestSent)
        socket.off('friend_request_rejected', handleFriendRequestRejected)
      }
      handlersRegistered.current = false
    }
  }, [socket, dispatch])
}
