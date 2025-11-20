import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
  },
  reducers: {},
})

export default slice.reducer
