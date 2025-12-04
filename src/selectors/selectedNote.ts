import type { RootState } from '@/store'
import { notesApi } from '@/reducers/notes.api'
import { createSelector } from '@reduxjs/toolkit'
import { useAppSelector } from '@/hooks'

export const selectSelectedNote = createSelector(
  (state: RootState) => state.notes.selectedNoteId,
  notesApi.endpoints.getNotes.select(),
  (selectedNoteId, { data }) => (selectedNoteId && data?.find(({ id }) => id === selectedNoteId)) || null,
)

export const useSelectSelectedNote = () => [useAppSelector(selectSelectedNote)]
