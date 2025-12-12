import { createSlice, type PayloadAction } from '@reduxjs/toolkit/react'

export interface NotesState {
  selectedNoteId: string | null
  removeNoteIds: string[]
  isRemoveMode: boolean
}

const initialState: NotesState = {
  selectedNoteId: null,
  removeNoteIds: [],
  isRemoveMode: false,
}

export const notes = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    selectNoteById: (state, action: PayloadAction<string | null>) => {
      state.selectedNoteId = action.payload
    },
    setNotesToRemove: (state, action: PayloadAction<string[]>) => {
      state.removeNoteIds = action.payload
    },
    addNoteToRemove: (state, action: PayloadAction<string>) => {
      if (!state.removeNoteIds.includes(action.payload)) {
        state.removeNoteIds.push(action.payload)
      }
    },
    cancelNoteToRemove: (state, action: PayloadAction<string>) => {
      state.removeNoteIds = state.removeNoteIds.filter((id) => id !== action.payload)
    },
    setRemoveMode: (state, action: PayloadAction<boolean>) => {
      state.isRemoveMode = action.payload
    },
  },
})

export const { selectNoteById, setNotesToRemove, addNoteToRemove, cancelNoteToRemove, setRemoveMode } = notes.actions
