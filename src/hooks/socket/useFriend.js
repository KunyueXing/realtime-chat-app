import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSocket } from '../../contexts/SocketContext'
import { useFriendEvents } from './useFriendEvents'
import {
  sendFriendRequestHTTP,
  acceptFriendRequestHTTP,
  rejectFriendRequestHTTP,
  fetchFriends,
  fetchFriendRequests,
  fetchNonFriendUsers,
  friendsSelectors,
  friendRequestsSelectors,
  selectUsersArray,
  selectLoadingStates,
  selectErrorStates,
  cancelRequest
} from '../../redux/slices/friend'

/*
  Provides clean API for components, combines HTTP + Socket operations. 
  Active operations, orchestrating HTTP requests + socket (emissions) for component needs
*/
export const useFriends = () => {
  const dispatch = useDispatch()
  const { emit, isConnected } = useSocket()

  // Register friend socket events
  useFriendEvents()

  // Debug: Log the entire state
  const entireState = useSelector((state) => state)
  // console.log('Entire Redux State:', entireState)
  // console.log('Friend State:', entireState.friend)

  // Use entity selectors with error handling
  const friends = useSelector((state) => {
    try {
      // console.log('Selecting friends from state:', state.friend?.friends)
      return friendsSelectors.selectAll(state)
    } catch (error) {
      console.error('Error selecting friends:', error)
      return []
    }
  })

  const friendRequests = useSelector((state) => {
    try {
      // console.log('Selecting friend requests from state:', state.friend?.friendRequests)
      return friendRequestsSelectors.selectAll(state)
    } catch (error) {
      console.error('Error selecting friend requests:', error)
      return []
    }
  })

  const users = useSelector((state) => {
    // console.log('Selecting users from state:', state.friend?.users)
    return selectUsersArray(state)
  })

  const loading = useSelector(selectLoadingStates)
  const errors = useSelector(selectErrorStates)

  // console.log('useFriends hook values:', {
  //   friends,
  //   friendRequests,
  //   users,
  //   loading,
  //   errors
  // })

  // Load data functions
  const loadFriends = useCallback(() => {
    dispatch(fetchFriends())
  }, [dispatch])

  const loadFriendRequests = useCallback(() => {
    dispatch(fetchFriendRequests())
  }, [dispatch])

  const loadUsers = useCallback(() => {
    dispatch(fetchNonFriendUsers())
  }, [dispatch])

  // Send friend requests (HTTP + socket)
  const sendFriendRequest = useCallback(
    async (receiverId) => {
      try {
        const result = await dispatch(sendFriendRequestHTTP({ receiverId }))

        if (result.success && isConnected) {
          try {
            await emit('send_friend_request', {
              receiver: receiverId,
              sender: result.data.senderId,
              friendRequest: result.data.friendRequest
            })
          } catch (socketError) {
            console.warn('Socket emit failed, but HTTP succeeded:', socketError)
          }
        }

        return result
      } catch (error) {
        console.error('Send friend request failed:', error)
        throw error
      }
    },
    [dispatch, emit, isConnected]
  )

  // Accept friend request (HTTP + socket)
  const acceptFriendRequest = useCallback(
    async (requestId) => {
      try {
        const result = await dispatch(acceptFriendRequestHTTP({ requestId }))

        if (result.success && isConnected) {
          try {
            await emit('accept_friend_request', {
              requestId,
              acceptedBy: result.data.acceptedBy
            })
          } catch (socketError) {
            console.warn('Socket emit failed, but HTTP succeeded:', socketError)
          }
        }

        return result
      } catch (error) {
        console.error('Accept friend request failed:', error)
        throw error
      }
    },
    [dispatch, emit, isConnected]
  )

  // Reject friend request (HTTP only)
  const rejectFriendRequest = useCallback(
    async (requestId) => {
      try {
        return await dispatch(rejectFriendRequestHTTP({ requestId }))
      } catch (error) {
        console.error('Reject friend request failed:', error)
        throw error
      }
    },
    [dispatch]
  )

  return {
    // Data
    friends,
    friendRequests,
    users,
    loading,
    errors,

    // Actions
    loadFriends,
    loadFriendRequests,
    loadUsers,
    sendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,

    // Computed values
    friendsCount: friends.length,
    requestsCount: friendRequests.length,
    usersCount: users.length,

    // Status
    isLoadingAny: Object.values(loading).some(Boolean),
    hasErrors: Object.values(errors).some(Boolean)
  }
}
