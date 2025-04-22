import { combineReducers } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
// slices
import appReducer from './slices/app'
import authReducer from './slices/auth'

/*
  A configuration for redux-persist, which specifies how and where the Redux state should be persisted.

  key: Specifies the root key for the persisted data in local storage.
  storage: Defines where the persisted data will be stored. Here, it’s using the default localStorage.
  keyPrefix: 'redux-': This adds a prefix to the keys in the storage, so all keys in local storage will be prefixed 
  with redux-.
*/
const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-'
}

const rootReducer = combineReducers({
  // placeholders for appReducer, authReducer, conversationReducer, autioCallReducer, VideoCallreducer
  app: appReducer,
  auth: authReducer
})

export { rootPersistConfig, rootReducer }
