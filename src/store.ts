import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { auth } from '@/reducers/auth.slice'
import { notes } from '@/reducers/notes.slice'
import { authApi } from '@/reducers/auth.api'
import { notesApi } from '@/reducers/notes.api'

export const store = configureStore({
  reducer: combineReducers({
    auth: auth.reducer,
    notes: notes.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [notesApi.reducerPath]: notesApi.reducer,
  }),
  middleware: (getDefaultMiddleWare) => getDefaultMiddleWare().concat(authApi.middleware).concat(notesApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
