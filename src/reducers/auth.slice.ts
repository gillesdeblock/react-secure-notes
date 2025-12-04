import type { User } from '@/types'
import { createSlice } from '@reduxjs/toolkit'

export interface AuthState {
  user: User | null
}

const initialState: AuthState = {
  user: null,
}

export const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload ?? null
    },
  },
})

export const { setUser } = auth.actions
