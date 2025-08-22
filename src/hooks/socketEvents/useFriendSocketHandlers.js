import { useEffect, useCallback, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { handleFriendRequestAccepted, handleFriendRequestReceived } from '../../redux/slices/friend'

export const useFriendSocketHandlers = (socketRef) => {
  const dispatch = useDispatch()
  const handlersRef = useRef(null)

  const createHandlers = useCallback(() => {
    return {
      handleNewFriendRequest: (data) => {
        console.log('New friend request received:', data)
        dispatch(handleFriendRequestReceived(data))
      },

      handleNewFriend: (data) => {
        console.log('Friend request accepted:', data)
        dispatch(handleFriendRequestAccepted(data))
      }
    }
  }, [dispatch])

  useEffect(() => {
    const socket = socketRef.current
    if (!socket) {
      console.error('Socket not initialized')
      return
    }

    // Initialize handlers if not already done
    if (!handlersRef.current) {
      handlersRef.current = createHandlers()
    }

    const handlers = handlersRef.current

    // Register socket event handlers
    socket.on('new_friend_request', handlers.handleNewFriendRequest)
    socket.on('friend_request_accepted', handlers.handleNewFriend)

    return () => {
      if (socket && handlers) {
        // Clean up socket event handlers
        socket.off('new_friend_request', handlers.handleNewFriendRequest)
        socket.off('friend_request_accepted', handlers.handleNewFriend)
      }
    }
  }, [socketRef, createHandlers])

  useEffect(() => {
    // Ensure handlers are created when component mounts
    if (!handlersRef.current) {
      handlersRef.current = createHandlers()
    }
  }, [createHandlers])
}
