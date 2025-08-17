import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { getSocket } from '../../socket'
import { OpenSnackBar } from './app'

const initialState = {
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
    }
  }
})
export default friendSlice.reducer

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

        // Emit the friend request event through the socket
        socket.emit('send_friend_request', { sender: userId, receiver: receiverId }, () => {
          console.log('Friend request event emitted')
        })
        dispatch(OpenSnackBar({ severity: 'success', message: 'Friend request sent!' }))
      }

      if (response.status === 409) {
        console.log('Friend request already sent:')
        dispatch(OpenSnackBar({ severity: 'info', message: 'Friend request already sent' }))
      }
    } catch (error) {
      console.error('Error sending friend request:', error)
      dispatch(OpenSnackBar({ severity: 'error', message: 'Error sending friend request' }))
    }
  }
}
