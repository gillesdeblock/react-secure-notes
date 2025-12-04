import { Trash2Icon } from 'lucide-react'
import { NoteCreateButton } from '@/components/NoteCreateButton'
import NoteEdit from '@/components/NoteEdit'
import NoteList from '@/components/NoteList'
import Page from '@/components/Page'
import { Button } from '@/components/ui/button'
import { ButtonGroup } from '@/components/ui/button-group'
import { Separator } from '@/components/ui/separator'
import { useCurrentUser } from '@/hooks'
import { useCreateNoteMutation, useGetNotesQuery } from '@/reducers/notes.api'
import { useSelectSelectedNote } from '@/selectors'

export default () => {
  const { data: notes = [] } = useGetNotesQuery()
  const [, { isLoading: isPendingCreate }] = useCreateNoteMutation()
  const [selectedNote] = useSelectSelectedNote()

  useCurrentUser()

  return (
    <Page className="flex">
      <div className="flex flex-col min-h-0">
        <div className="flex items-center p-2 gap-2 border-b">
          <span className="text-nowrap font-semibold text-sm ml-4 text-gray-400">{notes.length} notes</span>
          <ButtonGroup className="ml-auto">
            <NoteCreateButton disabled={isPendingCreate} className="ml-auto" />
          </ButtonGroup>
        </div>
        <NoteList className="p-2 flex-1 min-h-0 overflow-auto" notes={notes} selectedNoteId={selectedNote?.id} />
        <ButtonGroup className="w-full border-t p-2">
          <Button variant="destructive" className="ml-auto">
            <Trash2Icon />
          </Button>
        </ButtonGroup>
      </div>
      <Separator orientation="vertical" />
      <div className="w-full">
        {selectedNote ? (
          <NoteEdit note={selectedNote} />
        ) : (
          <div className="text-gray-400 select-none p-2">Select a note to get started</div>
        )}
      </div>
    </Page>
  )
}
