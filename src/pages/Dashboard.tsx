import NoteEdit from '@/components/NoteEdit'
import NoteList from '@/components/NoteList'
import Page from '@/components/Page'
import { Separator } from '@/components/ui/separator'
import useCurrentUser from '@/hooks/useCurrentUser'
import { fetchNotes } from '@/lib/notes'
import { setNotes } from '@/reducers/note.slice'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default () => {
  const dispatch = useDispatch()
  const notes = useSelector((state) => state.note.notes)
  const selectedNoteId = useSelector((state) => state.note.selectedNoteId)
  const selectedNote = useSelector((state) =>
    state.note.notes.find(({ id }) => state.note.selectedNoteId === id),
  )

  useCurrentUser()

  useEffect(() => {
    fetchNotes().then((notes) => dispatch(setNotes(notes)))
  }, [])

  return (
    <Page className="flex">
      <NoteList className="p-3" notes={notes} selectedNoteId={selectedNoteId} />
      <Separator orientation="vertical" />
      <div className="w-full">
        {selectedNote ? (
          <NoteEdit note={selectedNote} />
        ) : (
          <div className="text-gray-400 select-none p-3">Select a note to get started</div>
        )}
      </div>
    </Page>
  )
}
