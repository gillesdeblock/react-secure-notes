import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authReducer from './reducers/auth.slice'

const store = configureStore({
  reducer: combineReducers({
    auth: authReducer,
  }),
  devTools: true,
})

export default store
