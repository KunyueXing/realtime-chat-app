import { createSlice } from '@reduxjs/toolkit'
import axios from '../../utils/axios'

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

export function LoginUser(formValues) {
  // formValues is an object with email and password
  return async (dispatch, getState) => {
    //API call
    await axios
      .post('/auth/login', { ...formValues }, { headers: { 'content-type': 'application/json' } })
      .then(function (response) {
        console.log('login response: ', response)
        // Check if the response is successful
        if (response.status === 200) {
          const { token, user_id } = response.data
          dispatch(authSlice.actions.login({ isLoggedIn: true, token, user_id }))

          window.localStorage.setItem('user_id', user_id)
        }
      })
      .catch(function (error) {
        console.log('login error: ', error)
        dispatch(authSlice.actions.logout())
      })
  }
}
export function LogoutUser() {
  return async (dispatch, getState) => {
    window.localStorage.removeItem('user_id')
    dispatch(authSlice.actions.logout())
    console.log('logout')
  }
}

export function ForgotPassword(formValues) {
  return async (dispatch, getState) => {
    await axios
      .post('/auth/forgotPassword', { ...formValues }, { headers: { 'content-type': 'application/json' } })
      .then(function (response) {
        console.log('forgot password response: ', response)
        // Check if the response is successful
        if (response.status === 200) {
          console.log('Forgot password email sent successfully')
        }
      })
      .catch(function (error) {
        console.log('forgot password error: ', error)
      })
  }
}
