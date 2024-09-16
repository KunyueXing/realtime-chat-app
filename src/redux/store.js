import { useDispatch as useAppDispatch, useSelector as useAppDispatch } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import { rootPersistConfig, rootReducer } from './rootReducer'

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

// Responsible for persisting the store’s state to the configured storage (such as local storage) and rehydrating it
// when the app reloads.
const persistor = persistStore(store)

// Destructures the dispatch func from the store, so it can be used directly to dispatch actions without needing to
// access the store object itself
const { dispatch } = store

const useSelector = useAppSelector

const useDispatch = () => useAppDispatch()

export { store, persistor, dispatch, useSelector, useDispatch }
