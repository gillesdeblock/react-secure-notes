import { createSlice, type PayloadAction } from '@reduxjs/toolkit/react'

export interface NotesState {
  selectedNoteId: string | null
}

const initialState: NotesState = {
  selectedNoteId: null,
}

export const notes = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    selectNoteById: (state, action: PayloadAction<string | null>) => {
      state.selectedNoteId = action.payload
    },
  },
})

export const { selectNoteById } = notes.actions
