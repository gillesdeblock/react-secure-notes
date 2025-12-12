import NoteList from '@/components/NoteList'
import { NoteCreateButton } from '@/components/NoteCreateButton'
import { ButtonGroup } from '@/components/ui/button-group'
import { useCreateNoteMutation, useGetNotesQuery } from '@/reducers/notes.api'
import { cn } from '@/lib/utils'
import { useAppSelector } from '@/hooks'
import { NotesRemoveActions } from './NotesRemoveActions'

export function Notes({ className, ...props }: React.ComponentProps<'div'>) {
  const { data: notes = [] } = useGetNotesQuery()
  const { isLoading: isPendingCreate } = useCreateNoteMutation()[1]
  const selectedNote = useAppSelector((state) => notes.find(({ id }) => state.notes.selectedNoteId === id))
  const removeNoteIds = useAppSelector((state) => state.notes.removeNoteIds)
  const isRemoveMode = useAppSelector((state) => state.notes.isRemoveMode)

  return (
    <div className={cn('flex flex-col min-h-0', className)} {...props}>
      <div className="flex items-center p-2 gap-2 border-b">
        <span className="text-nowrap font-semibold text-sm ml-4 text-gray-400">{notes.length} notes</span>
        <ButtonGroup className="ml-auto">
          <NoteCreateButton disabled={isPendingCreate} className="ml-auto" />
        </ButtonGroup>
      </div>
      <NoteList
        className="p-2 flex-1 min-h-0 overflow-auto"
        notes={notes}
        selectedNoteId={selectedNote?.id}
        selectable={isRemoveMode}
        removeNoteIds={removeNoteIds}
      />
      <NotesRemoveActions />
    </div>
  )
}
