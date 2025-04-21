import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoggedIn: false,
  token: '',
  isLoading: false,
  error: null,
  user_id: null,
  email: ''
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn
      state.token = action.payload.token
      state.user_id = action.payload.user_id
    },
    logout: (state, action) => {
      state.isLoggedIn = false
      state.token = ''
      state.user_id = null
    }
  }
})

const authReducer = authSlice.reducer
export default authReducer

export function Login(formValues) { }
export function Logout() { }
