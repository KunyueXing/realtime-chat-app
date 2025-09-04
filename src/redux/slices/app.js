import { createSlice } from '@reduxjs/toolkit'

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
  all_users: [],
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
