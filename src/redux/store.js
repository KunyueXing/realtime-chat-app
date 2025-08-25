import { useDispatch as useAppDispatch, useSelector as useAppSelector } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import { rootPersistConfig, rootReducer } from './rootReducer'
import { apiClient, API_ENDPOINTS } from '../utils/api'

/*
  For a simplified store configuration. Used built-in middleware. 
  getDefaultMiddleware is useful when planning to add some custom middleware, but also still want to have the default 
  middleware added as well. It's also convenient to change some of the default settings by setting it to false.

  immutability check: deeply compares state values for mutations. It can detect mutations in reducers during a dispatch, 
  and also mutations that occur between dispatches (such as in a component or a selector). When a mutation is detected, 
  it will throw an error and indicate the key path for where the mutated value was detected in the state tree. 

  serializability check: Similar in concept to immutable-state-invariant, but deeply checks your state tree and your 
  actions for non-serializable values such as functions, Promises, Symbols, and other non-plain-JS-data values. 
  When a non-serializable value is detected, a console error will be printed with the key path for where the 
  non-serializable value was detected. 
  This check ensures that state and actions are serializable (important for debugging).

  reducer: The root reducer is wrapped with persistReducer, enabling persistence based on rootPersistConfig. 
  This means the state managed by rootReducer will be persisted.
  rootPersistConfig contains the settings for persistence;
  rootReducer is the main reducer that combines all the other reducers in the app;
*/
const store = configureStore({
  reducer: persistReducer(rootPersistConfig, rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false
    })
})

apiClient.interceptors.request.use(
  (config) => {
    const state = store.getState()
    const token = state.auth.token

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    console.error('Request interceptor Error:', error)
    return Promise.reject(error)
  }
)

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    // If we receive a 401 Unauthorized response, it likely means the token has expired or is invalid
    if (error.response?.status === 401) {
      const isLoggedIn = store.getState().auth.isLoggedIn

      if (isLoggedIn) {
        console.log('Unauthorized! Logging out...')
        // Dispatch actions directly so don't need to import the slices
        store.dispatch({ type: 'auth/Logout' })
        store.dispatch({ type: 'app/ResetApp' })

        // Clear local storage
        window.localStorage.removeItem('user_id')

        store.dispatch({
          type: 'app/OpenSnackBar',
          payload: { severity: 'error', message: 'Session expired. Please log in again.' }
        })

        setTimeout(() => {
          window.location.href = API_ENDPOINTS.AUTH.LOGIN // Redirect to login page
        }, 1000)
      }
    }

    if (error.response?.status === 403) {
      console.error('Forbidden: You do not have permission to access this resource.')
      store.dispatch({
        type: 'app/OpenSnackBar',
        payload: { severity: 'error', message: 'You do not have permission to access this resource.' }
      })
    }

    return Promise.reject(error)
  }
)

// Responsible for persisting the store’s state to the configured storage (such as local storage) and rehydrating it
// when the app reloads.
const persistor = persistStore(store)

// Destructures the dispatch func from the store, so it can be used directly to dispatch actions without needing to
// access the store object itself
const { dispatch } = store

const useSelector = useAppSelector

const useDispatch = () => useAppDispatch()

export { store, persistor, dispatch, useSelector, useDispatch }
