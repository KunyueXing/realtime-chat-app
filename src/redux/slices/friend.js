import { createSlice, createEntityAdapter } from '@reduxjs/toolkit'
import { OpenSnackBar } from './app'
import { API_ENDPOINTS, apiMethods } from '../../utils/api'

// Entity adapters for normalized state management - useful for large lists, gives O(1) access by ID
const friendsAdapter = createEntityAdapter({
  selectId: (friend) => friend._id
})

const friendRequestsAdapter = createEntityAdapter({
  selectId: (request) => request._id
})

// Normalized state structure
const initialState = {
  users: [], // all users of app who are not friends and not requested yet
  friends: friendsAdapter.getInitialState(), // all friends
  friendRequests: friendRequestsAdapter.getInitialState(), // all friend requests

  loading: {
    fetchUsers: false,
    fetchFriends: false,
    fetchFriendRequests: false,
    sendFriendRequest: false,
    acceptFriendRequest: false,
    rejectFriendRequest: false
  },

  errors: {
    fetchUsers: null,
    fetchFriends: null,
    fetchFriendRequests: null
  }
}

const friendsSlice = createSlice({
  name: 'friend',
  initialState,
  reducers: {
    // ===== FRIENDS MANAGEMENT =====
    setFriends: (state, action) => {
      friendsAdapter.setAll(state.friends, action.payload.friends)
      state.loading.fetchFriends = false
      state.errors.fetchFriends = null
    },

    addFriend: (state, action) => {
      const { friend, requestId } = action.payload

      // Remove the request from friendRequests if requestId is provided
      if (requestId) {
        friendRequestsAdapter.removeOne(state.friendRequests, requestId)
      }
      // Add the new friend to friends list
      friendsAdapter.addOne(state.friends, friend)
    },

    removeFriend: (state, action) => {
      friendsAdapter.removeOne(state.friends, action.payload.friendId)
    },

    // ===== FRIEND REQUESTS MANAGEMENT =====
    setFriendRequests: (state, action) => {
      friendRequestsAdapter.setAll(state.friendRequests, action.payload.friendRequests)
      state.loading.fetchFriendRequests = false
      state.errors.fetchFriendRequests = null
    },

    addFriendRequest: (state, action) => {
      friendRequestsAdapter.addOne(state.friendRequests, action.payload.friendRequest)
    },
    removeFriendRequest: (state, action) => {
      friendRequestsAdapter.removeOne(state.friendRequests, action.payload.requestId)
    },

    // ===== USERS MANAGEMENT =====
    setUsers: (state, action) => {
      state.users = action.payload.users
      state.loading.fetchUsers = false
      state.errors.fetchUsers = null
    },

    // Optimistic update when a friend request is sent
    removeUserOptimistic: (state, action) => {
      // Remove user from users list when a friend request is sent
      state.users = state.users.filter((user) => user._id !== action.payload.userId)
    },

    // Revert optimistic update if sending friend request fails
    revertUserRemoval: (state, action) => {
      // Revert the optimistic update by adding the user back to users list
      state.users.push(action.payload.user) // assuming action.payload.user contains the full user object
    },

    // ===== LOADING STATES =====
    setLoading: (state, action) => {
      const { type, loading } = action.payload
      if (state.loading && Object.prototype.hasOwnProperty.call(state.loading, type)) {
        state.loading[type] = loading
      }
    },

    // ===== ERROR STATES =====
    setError: (state, action) => {
      const { type, error } = action.payload
      if (state.errors && Object.prototype.hasOwnProperty.call(state.errors, type)) {
        state.errors[type] = error
      }
      if (state.loading && Object.prototype.hasOwnProperty.call(state.loading, type)) {
        state.loading[type] = false // stop loading on error
      }
    },
    clearErrors: (state) => {
      state.errors = initialState.errors
    }
  }
})

//  ===== SELECTORS USING ENTITY ADAPTERS (O(1) performance) =====
/*
  getSelectors: This method generates a set of memoized selectors for the entity state.

  getSelectors() is called once per adapter here. This is the recommended Redux Toolkit pattern for accessing entity state efficiently, 
  avoiding repeatedly creating selectors inside components or thunks. 
  Easier to test and extend.
*/
export const friendsSelectors = friendsAdapter.getSelectors((state) => {
  return state.friend?.friends || friendsAdapter.getInitialState()
})
export const friendRequestsSelectors = friendRequestsAdapter.getSelectors((state) => {
  return state.friend?.friendRequests || friendRequestsAdapter.getInitialState()
})

/*
  Custom selectors for specific use cases

  These selectors use the entity adapter's selectById method to retrieve a specific friend or friend request by ID.
  They are implemented as a currying function that commonly recommended for Redux selectors, since it makes useSelector() cleaner and
  avoids having to wrap in an inline function everytime.
*/
export const selectFriendById = (friendId) => (state) => friendsSelectors.selectById(state, friendId)
export const selectFriendRequestById = (requestId) => (state) => friendRequestsSelectors.selectById(state, requestId)

export const selectUsersArray = (state) => state.friend?.users || []
export const selectLoadingStates = (state) => state.friend?.loading || initialState.loading
export const selectErrorStates = (state) => state.friend?.errors || initialState.errors

// ===== EXPORT ACTIONS =====
export const {
  setFriends,
  addFriend,
  removeFriend,
  setFriendRequests,
  addFriendRequest,
  removeFriendRequest,
  setUsers,
  removeUserOptimistic,
  revertUserRemoval,
  setLoading,
  setError,
  clearErrors
} = friendsSlice.actions

export default friendsSlice.reducer

// ==================================================================
// REQUEST DEDUPLICATION & CANCELLATION SYSTEM
// ==================================================================

// Track active requests to prevent duplicates
const activeRequests = new Map()
const abortControllers = new Map()

// Helper function to generate a unique key for each request based on URL and method
const createRequestKey = (type, params = {}) => {
  return `${type}_${JSON.stringify(params)}`
}

// Request deduplication wrapper
const withDeduplication = (requestKey, apiCall) => async (dispatch) => {
  // Check if request is already in progress
  if (activeRequests.has(requestKey)) {
    console.log(`Request ${requestKey} is already in progress. Skipping duplicate.`)
    return activeRequests.get(requestKey)
  }

  // Create abort controller for cancelation
  const abortController = new AbortController()
  abortControllers.set(requestKey, abortController)

  // Create a promise for the API call
  const requestPromise = apiCall(dispatch, abortController.signal)
  activeRequests.set(requestKey, requestPromise)

  try {
    const result = await requestPromise
    return result
  } finally {
    // Clean up after request completes
    activeRequests.delete(requestKey)
    abortControllers.delete(requestKey)
  }
}

// Cancel specific request type
export const cancelRequest = (requestType, params = {}) => {
  const requestKey = createRequestKey(requestType, params)
  const controller = abortControllers.get(requestKey)

  if (controller) {
    controller.abort()
    activeRequests.delete(requestKey)
    abortControllers.delete(requestKey)
    console.log(`Request ${requestKey} has been canceled.`)
  }
}

// Cancel all active requests
export const cancelAllRequests = () => {
  abortControllers.forEach((controller, requestKey) => {
    controller.abort()
    console.log(`Request ${requestKey} has been canceled.`)
  })
  activeRequests.clear()
  abortControllers.clear()
}

// ==================================================================
// HTTP-ONLY ASYNC ACTIONS WITH DEDUPLICATION & CANCELLATION
// ==================================================================

// HTTP-ONLY, getting all friends. With deduplication & cancellation
const _fetchFriends = async (dispatch, signal) => {
  dispatch(setLoading({ type: 'fetchFriends', loading: true }))
  dispatch(setError({ type: 'fetchFriends', error: null }))

  try {
    const response = await apiMethods.get(API_ENDPOINTS.FRIEND.GET_ALL_FRIENDS, { signal })

    console.log('fetch friends response:', response.data)
    const friends = response.data.users || []
    dispatch(setFriends({ friends }))

    return { success: true, data: friends }
  } catch (error) {
    // Don't handle abort requests as real errors
    if (error.name === 'CanceledError' || error.code === 'ERR_CANCELED') {
      console.log('Fetch friends request was canceled')
      return { success: false, cancelled: true }
    }

    console.error('Error fetching friends:', error)
    dispatch(setError({ type: 'fetchFriends', error: error.message || 'Error fetching friends' }))
    dispatch(OpenSnackBar({ severity: 'error', message: 'Error fetching friends' }))

    throw error
  }
}
export const fetchFriends = () => withDeduplication('FETCH_FRIENDS', _fetchFriends)

// FETCH FRIEND REQUESTS - with deduplication and cancellation
const _fetchFriendRequests = async (dispatch, signal) => {
  dispatch(setLoading({ type: 'requests', loading: true }))
  dispatch(setError({ type: 'requests', error: null }))

  try {
    const response = await apiMethods.get(API_ENDPOINTS.FRIEND.FRIEND_REQUEST, {
      signal
    })

    console.log('Friend requests fetched:', response.data)
    const requests = response.data.requests || []
    dispatch(setFriendRequests({ friendRequests: requests }))

    return { success: true, data: requests }
  } catch (error) {
    if (error.name === 'CanceledError' || error.code === 'ERR_CANCELED') {
      console.log('Friend requests fetch was cancelled')
      return { success: false, cancelled: true }
    }

    console.error('Error fetching friend requests:', error)
    dispatch(setError({ type: 'requests', error: error.message }))
    dispatch(OpenSnackBar({ severity: 'error', message: 'Failed to load friend requests' }))

    throw error
  }
}

export const fetchFriendRequests = () => withDeduplication('FETCH_FRIEND_REQUESTS', _fetchFriendRequests)

// FETCH NON-FRIEND USERS - with deduplication & cancellation
const _fetchNonFriendUsers = async (dispatch, signal) => {
  dispatch(setLoading({ type: 'fetchUsers', loading: true }))
  dispatch(setError({ type: 'fetchUsers', error: null }))

  try {
    const response = await apiMethods.get(API_ENDPOINTS.USER.NON_FRIENDS, { signal })
    console.log('fetch non-friend users response:', response.data)
    const users = response.data.users || []
    dispatch(setUsers({ users }))

    return { success: true, data: users }
  } catch (error) {
    if (error.name === 'CanceledError' || error.code === 'ERR_CANCELED') {
      console.log('Fetch non-friend users request was canceled')
      return { success: false, cancelled: true }
    }

    console.error('Error fetching non-friend users:', error)
    dispatch(setError({ type: 'fetchUsers', error: error.message || 'Error fetching users' }))
    dispatch(OpenSnackBar({ severity: 'error', message: 'Error fetching users' }))
    throw error
  }
}

export const fetchNonFriendUsers = () => withDeduplication('FETCH_NON_FRIEND_USERS', _fetchNonFriendUsers)

// Send friend request - Pure HTTP, with optimistic UI update (socket handled in context)
export const sendFriendRequestHTTP =
  ({ receiverId }) =>
  async (dispatch, getState) => {
    const userId = getState().auth.user_id

    if (!receiverId) {
      console.error('Receiver ID is required to send a friend request')
      dispatch(OpenSnackBar({ severity: 'error', message: 'Receiver ID is required' }))
      return { success: false, error: 'Receiver ID is required' }
    }

    dispatch(setLoading({ type: 'sendingRequest', loading: true }))

    // Optimistic UI update: remove user from users list immediately
    const userToRemove = getState().friend.users.find((user) => user._id === receiverId)
    if (userToRemove) {
      dispatch(removeUserOptimistic({ userId: receiverId }))
    }

    try {
      const response = await apiMethods.post(API_ENDPOINTS.FRIEND.FRIEND_REQUEST, { receiverId, senderId: userId })

      console.log('send friend request response:', response.data)
      dispatch(setLoading({ type: 'sendingRequest', loading: false }))
      dispatch(OpenSnackBar({ severity: 'success', message: 'Friend request sent' }))

      return {
        success: true,
        data: {
          friendRequest: response.data.friendRequest,
          senderId: userId,
          receiverId
        }
      }
    } catch (error) {
      console.error('Error sending friend request:', error)

      // Revert optimistic update on error
      if (userToRemove) {
        dispatch(revertUserRemoval({ user: userToRemove }))
      }
      dispatch(setLoading({ type: 'sendingRequest', loading: false }))

      // Handle different error scenarios
      if (error.response?.status === 409) {
        dispatch(OpenSnackBar({ severity: 'info', message: 'Friend request already sent' }))
      } else {
        dispatch(OpenSnackBar({ severity: 'error', message: error.response?.data?.message || 'Error sending friend request' }))
      }

      return { success: false, error: error.message || 'Error sending friend request' }
    }
  }

// Accept friend request - Pure HTTP (socket handled in context)
export const acceptFriendRequestHTTP =
  ({ requestId }) =>
  async (dispatch, getState) => {
    const userId = getState().auth.user_id
    dispatch(setLoading({ type: 'acceptingFriendRequest', loading: true }))

    try {
      const response = await apiMethods.post(API_ENDPOINTS.FRIEND.ACCEPT_REQUEST(requestId), { requestId, userId })

      console.log('accept friend request response:', response)
      console.log('requestSender:', response.data?.requestSender)
      console.log('requestSender._id:', response.data?.requestSender?._id)
      console.log('accept friend request response:', response.data)
      const { requestSender } = response.data

      // Optimistic UI update: added new friend and removed request
      dispatch(addFriend({ friend: requestSender, requestId }))
      dispatch(setLoading({ type: 'acceptingFriendRequest', loading: false }))
      dispatch(OpenSnackBar({ severity: 'success', message: 'Friend request accepted' }))

      return {
        success: true,
        data: {
          sender: requestSender._id,
          acceptedBy: userId
        }
      }
    } catch (error) {
      console.error('Error accepting friend request:', error)
      dispatch(setLoading({ type: 'acceptingFriendRequest', loading: false }))
      dispatch(OpenSnackBar({ severity: 'error', message: error.response?.data?.message || 'Error accepting friend request' }))

      return { success: false, error: error.message || 'Error accepting friend request' }
    }
  }

// Reject friend request - Pure HTTP (socket handled in context)
export const rejectFriendRequestHTTP =
  ({ requestId }) =>
  async (dispatch, getState) => {
    const userId = getState().auth.user_id
    dispatch(setLoading({ type: 'rejectingFriendRequest', loading: true }))

    try {
      await apiMethods.post(API_ENDPOINTS.FRIEND.REJECT_REQUEST(requestId), { requestId, userId })
      console.log('Friend request rejected:', requestId)

      // Remove from friend requests list
      dispatch(removeFriendRequest({ requestId }))
      dispatch(setLoading({ type: 'rejectingFriendRequest', loading: false }))
      dispatch(OpenSnackBar({ severity: 'success', message: 'Friend request rejected' }))

      return { success: true, data: { requestId, rejectedBy: userId } }
    } catch (error) {
      console.error('Error rejecting friend request:', error)
      dispatch(setLoading({ type: 'rejectingFriendRequest', loading: false }))
      dispatch(OpenSnackBar({ severity: 'error', message: error.response?.data?.message || 'Error rejecting friend request' }))

      return { success: false, error: error.message || 'Error rejecting friend request' }
    }
  }

// ==================================================================
// SOCKET EVENT HANDLERS (Called by Socket Context)
// ==================================================================

// Handle incoming friend request from socket
export const handleFriendRequestReceived = (data) => async (dispatch) => {
  console.log('Friend reducer - Friend request received:', data)
  dispatch(addFriendRequest({ friendRequest: data.friendRequest }))
  dispatch(OpenSnackBar({ severity: 'info', message: `${data.sender?.firstName || 'Someone'} sent you a friend request!` }))
}

// Handle friend request accepted from socket
export const handleFriendRequestAccepted = (data) => async (dispatch) => {
  console.log('Friend reducer - Friend request accepted:', data)
  dispatch(addFriend({ friend: data.friend }))
  dispatch(OpenSnackBar({ severity: 'success', message: `${data.friend?.firstName || 'Someone'} accepted your friend request!` }))
}
