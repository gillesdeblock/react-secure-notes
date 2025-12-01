import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authReducer from './reducers/auth.slice'
import noteReducer from './reducers/note.slice'

const store = configureStore({
  reducer: combineReducers({
    auth: authReducer,
    note: noteReducer,
  }),
  devTools: true,
})

export default store
