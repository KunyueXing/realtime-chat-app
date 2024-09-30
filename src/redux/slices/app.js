import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: {},
  sideBar: {
    open: false,
    type: 'CONTACT' // can be CONTACT, STARRED, SHARED
  },
  isLoggedIn: true,
  tab: 0, // [0, 1, 2, 3] refers to navigation bar - chats, people, phone, and settings
  snackbar: {
    open: null,
    severity: null,
    message: null
  },
  users: [], // all users of app who are not friends and not requested yet
  all_users: [],
  friends: [], // all friends
  friendRequests: [], // all friend requests
  chat_type: null,
  room_id: null,
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
    }
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
