import { createSlice } from '@reduxjs/toolkit'
import { OpenSnackBar, ResetApp } from './app'
import { apiClient, API_ENDPOINTS } from '../../utils/api'

const initialState = {
  isLoggedIn: false,
  token: '',
  // To track whether an async operation (like API call) is in progress
  // helps to show loading indicators, disable a form while waiting for a response, etc.
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
    },
    updateRegisterEmail: (state, action) => {
      state.email = action.payload.email
    },
    updateIsLoading: (state, action) => {
      state.isLoading = action.payload.isLoading
      state.error = action.payload.error
    }
  }
})

const authReducer = authSlice.reducer
export default authReducer

export function LoginUser(formValues, navigate) {
  // formValues is an object with email and password
  return async (dispatch, getState) => {
    dispatch(authSlice.actions.updateIsLoading({ isLoading: true, error: false }))

    //API call
    await apiClient
      .post(API_ENDPOINTS.AUTH.LOGIN, { ...formValues })
      .then(function (response) {
        console.log('login response: ', response)
        // Check if the response is successful
        if (response.status === 200) {
          const { token, user_id } = response.data
          dispatch(authSlice.actions.login({ isLoggedIn: true, token, user_id }))
          dispatch(authSlice.actions.updateIsLoading({ isLoading: false, error: false }))
          dispatch(OpenSnackBar({ severity: 'success', message: response.data.message }))

          window.localStorage.setItem('user_id', user_id)
        }
      })
      .catch(function (error) {
        console.log('login error: ', error)
        dispatch(authSlice.actions.logout())
        dispatch(authSlice.actions.updateIsLoading({ isLoading: false, error: true }))
        dispatch(OpenSnackBar({ severity: 'error', message: error.message }))
      })
      .finally(() => {
        if (!getState().auth.error && navigate) {
          setTimeout(() => {
            navigate('/app')
          }, 800)
        }
      })
  }
}
export function LogoutUser() {
  return async (dispatch, getState) => {
    window.localStorage.removeItem('user_id')

    // Update Redux state - this will trigger SocketContext to cleanup automatically
    dispatch(authSlice.actions.logout())
    dispatch(ResetApp())
    console.log('logout')

    dispatch(OpenSnackBar({ severity: 'success', message: 'Logged out successfully' }))
  }
}

export function ForgotPassword(formValues) {
  return async (dispatch, getState) => {
    dispatch(authSlice.actions.updateIsLoading({ isLoading: true, error: false }))

    await apiClient
      .post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { ...formValues })
      .then(function (response) {
        console.log('forgot password response: ', response)
        // Check if the response is successful
        if (response.status === 200) {
          console.log('Forgot password email sent successfully')
          dispatch(authSlice.actions.updateIsLoading({ isLoading: false, error: false }))
          dispatch(OpenSnackBar({ severity: 'success', message: response.data.message }))
        }
      })
      .catch(function (error) {
        console.log('forgot password error: ', error)
        dispatch(authSlice.actions.updateIsLoading({ isLoading: false, error: true }))
        dispatch(OpenSnackBar({ severity: 'error', message: error.message }))
      })
  }
}

export function NewPassword(formValues, navigate) {
  return async (dispatch, getState) => {
    dispatch(authSlice.actions.updateIsLoading({ isLoading: true, error: false }))

    await apiClient
      .patch(API_ENDPOINTS.AUTH.RESET_PASSWORD, { ...formValues })
      .then(function (response) {
        console.log('reset password response: ', response)
        // Check if the response is successful
        if (response.status === 200) {
          dispatch(authSlice.actions.login({ isLoggedIn: true, token: response.data.token }))
          dispatch(authSlice.actions.updateIsLoading({ isLoading: false, error: false }))
          dispatch(OpenSnackBar({ severity: 'success', message: response.data.message }))
          console.log('Password reset successfully')
        }
      })
      .catch(function (error) {
        console.log('reset password error: ', error)
        dispatch(authSlice.actions.updateIsLoading({ isLoading: false, error: true }))
        dispatch(OpenSnackBar({ severity: 'error', message: error.message }))
      })
      .finally(() => {
        if (!getState().auth.error && navigate) {
          setTimeout(() => {
            navigate('/app')
          }, 800)
        }
      })
  }
}

export function RegisterUser(formValues, navigate) {
  return async (dispatch, getState) => {
    dispatch(authSlice.actions.updateIsLoading({ isLoading: true, error: false }))

    await apiClient
      .post(API_ENDPOINTS.AUTH.REGISTER, { ...formValues })
      .then(function (response) {
        console.log('register response: ', response)
        // Check if the response is successful
        if (response.status === 200) {
          console.log('User registered successfully')
          dispatch(authSlice.actions.updateRegisterEmail({ email: formValues.email }))
          dispatch(authSlice.actions.updateIsLoading({ isLoading: false, error: false }))
          dispatch(OpenSnackBar({ severity: 'success', message: response.data.message }))
        }
      })
      .catch(function (error) {
        console.log('register error: ', error)
        dispatch(authSlice.actions.updateIsLoading({ isLoading: false, error: true }))
        dispatch(OpenSnackBar({ severity: 'error', message: error.message }))
      })
      .finally(() => {
        if (!getState().auth.error && navigate) {
          setTimeout(() => {
            navigate('/auth/verify')
          }, 800)
          // window.location.href = '/auth/verify'
        }
      })
  }
}

export function VerifyUser(formValues, navigate) {
  return async (dispatch, getState) => {
    dispatch(authSlice.actions.updateIsLoading({ isLoading: true, error: false }))

    await apiClient
      .post(API_ENDPOINTS.AUTH.VERIFY, { ...formValues })
      .then(function (response) {
        console.log('verify response: ', response)
        // Check if the response is successful
        if (response.status === 200) {
          console.log('User verified successfully')
          dispatch(authSlice.actions.updateRegisterEmail({ email: '' }))
          window.localStorage.setItem('user_id', response.data.user_id)
          dispatch(authSlice.actions.login({ isLoggedIn: true, token: response.data.token }))
          dispatch(authSlice.actions.updateIsLoading({ isLoading: false, error: false }))
          dispatch(OpenSnackBar({ severity: 'success', message: response.data.message }))
        }
      })
      .catch(function (error) {
        console.log('verify error: ', error)
        dispatch(authSlice.actions.updateIsLoading({ isLoading: false, error: true }))
        dispatch(OpenSnackBar({ severity: 'error', message: error.message }))
      })
      .finally(() => {
        if (!getState().auth.error && navigate) {
          setTimeout(() => {
            navigate('/app')
          }, 800)
        }
      })
  }
}
