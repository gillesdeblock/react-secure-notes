import type { Note } from '@/types'
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type NoteState = {
  notes: Note[]
  selectedNoteId?: string
}

const initialState: NoteState = {
  notes: [],
  selectedNoteId: undefined,
}

const slice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    setNotes: (state, action: PayloadAction<Note[]>) => {
      state.notes = action.payload
    },
    setSelectedNote: (state, action: PayloadAction<string | undefined>) => {
      state.selectedNoteId = action.payload
    },
  },
})

export const { setNotes, setSelectedNote } = slice.actions
export default slice.reducer
