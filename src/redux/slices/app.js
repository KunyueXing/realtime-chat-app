import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  user: {},
  sideBar: {
    open: false,
    type: 'CONTACT' // can be CONTACT, STARRED, SHARED
  },
  tab: 0, // [0, 1, 2, 3] refers to navigation bar - chats, people, phone, and settings
  snackbar: {
    open: false,
    severity: null,
    message: null
  },
  users: [], // all users of app who are not friends and not requested yet
  all_users: [],
  friends: [], // all friends
  friendRequests: [], // all friend requests
  chat_type: null, // can be individual or group
  room_id: null, // room id of the chat
  call_logs: []
}

/*
  createSlice accepts a single configuration object parameter, with the following options:
  A name, used in action types;
  The initial state for the reducer;
  
  An object of "case reducers". Key names will be used to generate actions.
  reducers: Record<string, ReducerFunction | ReducerAndPrepareObject>,
*/
const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    updateTab(state, action) {
      state.tab = action.payload.tab
    },
    // Toggle sidebar
    toggleSidebar(state) {
      state.sideBar.open = !state.sideBar.open
    },
    updateSidebarType(state, action) {
      state.sideBar.type = action.payload.type
    },
    openSnackBar(state, action) {
      console.log('open snackbar in slice action:', action.payload)
      state.snackbar.open = true
      state.snackbar.severity = action.payload.severity
      state.snackbar.message = action.payload.message
    },
    closeSnackBar(state) {
      console.log('close snackbar in slice action')
      state.snackbar.open = false
      state.snackbar.severity = null
      state.snackbar.message = null
    },
    updateUsers(state, action) {
      state.users = action.payload.users
    },
    updateFriends(state, action) {
      state.friends = action.payload.friends
    },
    updateFriendRequests(state, action) {
      state.friendRequests = action.payload.friendRequests
    },
    selectConversation(state, action) {
      state.chat_type = action.payload.chat_type
      state.room_id = action.payload.room_id
    },
    resetApp: () => initialState
  }
})

export default slice.reducer

export function UpdateTab(tab) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.updateTab(tab))
  }
}

export function ToggleSidebar() {
  return async (dispatch, getState) => {
    dispatch(slice.actions.toggleSidebar())
  }
}

export function UpdateSidebarType(type) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.updateSidebarType({ type }))
  }
}

export function OpenSnackBar({ severity, message }) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.openSnackBar({ severity, message }))

    setTimeout(() => {
      dispatch(slice.actions.closeSnackBar())
    }, 6000)
  }
}

export function CloseSnackBar() {
  return async (dispatch, getState) => {
    dispatch(slice.actions.closeSnackBar())
  }
}

export function FetchUsers(users) {
  return async (dispatch, getState) => {
    await axios
      .get('/user/get-users', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getState().auth.token}`
        }
      })
      .then((response) => {
        console.log('response:', response)
        dispatch(slice.actions.updateUsers({ users: response.data.users }))
      })
      .catch((error) => {
        console.log('error:', error)
        dispatch(slice.actions.openSnackBar({ severity: 'error', message: 'Error fetching users' }))
      })
  }
}

export function FetchFriends() {
  return async (dispatch, getState) => {
    await axios
      .get('/user/get-friends', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getState().auth.token}`
        }
      })
      .then((response) => {
        console.log('response:', response)
        dispatch(slice.actions.updateFriends({ friends: response.data.users }))
      })
      .catch((error) => {
        console.log('error:', error)
        dispatch(slice.actions.openSnackBar({ severity: 'error', message: 'Error fetching friends' }))
      })
  }
}

export function FetchFriendRequests() {
  return async (dispatch, getState) => {
    await axios
      .get('/user/get-friend-requests', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getState().auth.token}`
        }
      })
      .then((response) => {
        console.log('response:', response)
        dispatch(slice.actions.updateFriendRequests({ friendRequests: response.data.users }))
      })
      .catch((error) => {
        console.log('error:', error)
        dispatch(slice.actions.openSnackBar({ severity: 'error', message: 'Error fetching friend requests' }))
      })
  }
}

export function SelectConversation({ chat_type, room_id }) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.selectConversation({ chat_type, room_id }))
  }
}

export function ResetApp() {
  return async (dispatch, getState) => {
    dispatch(slice.actions.resetApp())
  }
}
