import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { getSocket } from '../../socket'
import { OpenSnackBar } from './app'

const initialState = {
  users: [], // all users of app who are not friends and not requested yet
  friends: [], // all friends
  friendRequests: [] // all friend requests
}

const friendSlice = createSlice({
  name: 'friend',
  initialState,
  reducers: {
    updateFriends: (state, action) => {
      state.friends = action.payload.friends
    },
    updateFriendRequests: (state, action) => {
      state.friendRequests = action.payload.friendRequests
    },
    addFriendRequestSent: (state, action) => {
      // Remove user from users list when a friend request is sent
      state.users = state.users.filter((user) => user._id !== action.payload.receiverId)
    },
    addFriendRequestReceived: (state, action) => {
      // Add the new friend request to the friendRequests list
      state.friendRequests.push(action.payload.friendRequest)
    },
    addNewFriend: (state, action) => {
      // Remove the accepted request from friendRequests
      state.friendRequests = state.friendRequests.filter((request) => request._id !== action.payload.requestId)
      // Add the new friend to friends list
      state.friends.push(action.payload.friend)
    },
    updateUsers(state, action) {
      state.users = action.payload.users
    },
    removeFriendRequest: (state, action) => {
      // Remove the request from friendRequests
      state.friendRequests = state.friendRequests.filter((request) => request._id !== action.payload.requestId)
    }
  }
})
export default friendSlice.reducer

export function FetchFriendRequests() {
  return async (dispatch, getState) => {
    await axios
      .get('/friends/requests', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getState().auth.token}`
        }
      })
      .then((response) => {
        console.log('response:', response)
        dispatch(friendSlice.actions.updateFriendRequests({ friendRequests: response.data.users }))
      })
      .catch((error) => {
        console.log('error:', error)
        dispatch(OpenSnackBar({ severity: 'error', message: 'Error fetching friend requests' }))
      })
  }
}

export function FetchFriends() {
  return async (dispatch, getState) => {
    await axios
      .get('/friends', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getState().auth.token}`
        }
      })
      .then((response) => {
        console.log('response:', response)
        dispatch(friendSlice.actions.updateFriends({ friends: response.data.users }))
      })
      .catch((error) => {
        console.log('error:', error)
        dispatch(OpenSnackBar({ severity: 'error', message: 'Error fetching friends' }))
      })
  }
}

// HTTP, getting all users except friends
export function FetchNonFriendUsers(users) {
  return async (dispatch, getState) => {
    await axios
      .get('/user/non-friends', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getState().auth.token}`
        }
      })
      .then((response) => {
        console.log('response:', response)
        dispatch(friendSlice.actions.updateUsers({ users: response.data.users }))
      })
      .catch((error) => {
        console.log('error:', error)
        dispatch(OpenSnackBar({ severity: 'error', message: 'Error fetching users' }))
      })
  }
}

// HTTP + Socket.io, sending a friend request
export function SendFriendRequest({ receiverId }) {
  return async (dispatch, getState) => {
    const state = getState() // access the current Redux store state
    const userId = state.auth.user_id
    const socket = getSocket(userId)

    if (!socket || !socket.connected) {
      console.error('Socket not initialized or not connected')
      dispatch(OpenSnackBar({ severity: 'error', message: 'Socket not connected' }))
      return
    }
    if (!receiverId) {
      console.error('Receiver ID is required to send a friend request')
      dispatch(OpenSnackBar({ severity: 'error', message: 'Receiver ID is required' }))
      return
    }

    console.log('Sending friend request from user:', userId, 'to receiver:', receiverId)

    try {
      const response = await axios.post(
        '/friends/requests',
        { receiverId, senderId: userId },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${state.auth.token}`
          }
        }
      )

      if (response.status === 200 || response.status === 201) {
        console.log('Friend request sent successfully:', response.data)
        dispatch(OpenSnackBar({ severity: 'success', message: 'Friend request sent' }))

        // Optimistic UI update
        dispatch(friendSlice.actions.addFriendRequestSent({ receiverId }))

        // Emit the friend request event through the socket
        socket.emit('send_friend_request', { sender: userId, receiver: receiverId }, () => {
          console.log('Friend request event emitted')
        })
        dispatch(OpenSnackBar({ severity: 'success', message: 'Friend request sent!' }))
      }

      if (response.status === 409) {
        console.error('Friend request already sent:')
        dispatch(OpenSnackBar({ severity: 'info', message: 'Friend request already sent' }))
      }
    } catch (error) {
      console.error('Error sending friend request:', error)
      dispatch(OpenSnackBar({ severity: 'error', message: 'Error sending friend request' }))
    }
  }
}

// HTTP + Socket.io, accepting a friend request
export function AcceptFriendRequest({ requestId }) {
  return async (dispatch, getState) => {
    const state = getState()
    const userId = state.auth.user_id
    const socket = getSocket(userId)

    if (!socket || !socket.connected) {
      console.error('Socket not initialized or not connected')
      dispatch(OpenSnackBar({ severity: 'error', message: 'Socket not connected' }))
      return
    }

    try {
      const response = await axios.post(
        `/friends/requests/${requestId}/accept`,
        { requestId, userId },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${state.auth.token}`
          }
        }
      )

      if (response.status === 200) {
        console.log('Friend request accepted:', response.data)
        const { requestSender } = response.data
        // Optimistic UI update: added new friend and removed request
        dispatch(friendSlice.actions.addNewFriend({ friend: requestSender, requestId }))
        dispatch(OpenSnackBar({ severity: 'success', message: 'Friend request accepted' }))

        // Emit the friend accepted event through the socket
        socket.emit(
          'accept_friend_request',
          {
            requestId,
            acceptedBy: userId,
            notifyUserId: requestSender
          },
          () => {
            console.log('Friend accepted event emitted')
          }
        )
      } else {
        dispatch(OpenSnackBar({ severity: 'error', message: response.message }))
        console.error('Failed to accept friend request:', response.message)
      }
    } catch (error) {
      console.error('Error accepting friend request:', error)
      dispatch(OpenSnackBar({ severity: 'error', message: 'Error accepting friend request' }))
    }
  }
}

export function RejectFriendRequest({ requestId }) {
  return async (dispatch, getState) => {
    const state = getState()
    const userId = state.auth.user_id
    const socket = getSocket(userId)

    if (!socket || !socket.connected) {
      console.error('Socket not initialized or not connected')
      dispatch(OpenSnackBar({ severity: 'error', message: 'Socket not connected' }))
      return
    }

    try {
      const response = await axios.post(
        `/friends/requests/${requestId}/reject`,
        { requestId, userId },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${state.auth.token}`
          }
        }
      )

      if (response.status === 200) {
        console.log('Friend request rejected:', requestId)
        dispatch(friendSlice.actions.removeFriendRequest({ requestId }))
        // Only notify the user who received the request. So don't need to use socket.emit here to notify the sender
        dispatch(OpenSnackBar({ severity: 'success', message: 'Friend request rejected' }))
      }
    } catch (error) {
      console.error('Error rejecting friend request:', error)
      dispatch(OpenSnackBar({ severity: 'error', message: 'Error rejecting friend request' }))
    }
  }
}
