import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface AuthState {
  accessToken: string | null
}

const initialState: AuthState = {
  accessToken: null,
}

export const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload
    },
    clearAccessToken: (state) => {
      state.accessToken = null
    },
  },
})

export const { setAccessToken, clearAccessToken } = auth.actions
