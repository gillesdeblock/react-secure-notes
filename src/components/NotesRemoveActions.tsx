import { ListChecksIcon, TrashIcon } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { ButtonGroup } from '@/components/ui/button-group'
import { setRemoveMode, setNotesToRemove } from '@/reducers/notes.slice'
import { useGetNotesQuery, useRemoveNotesMutation } from '@/reducers/notes.api'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { toast } from 'sonner'

export function NotesRemoveActions() {
  const dispatch = useAppDispatch()
  const { refetch: refetchNotes } = useGetNotesQuery()
  const [removeNotes] = useRemoveNotesMutation()
  const removeNoteIds = useAppSelector((state) => state.notes.removeNoteIds)
  const isRemoveMode = useAppSelector((state) => state.notes.isRemoveMode)

  const onConfirmRemove = async () => {
    try {
      const { deleted } = await removeNotes({ ids: removeNoteIds }).unwrap()
      toast.success(<span>Removed {deleted} notes</span>)
      dispatch(setNotesToRemove([]))
      refetchNotes()
    } catch (e) {
      toast.error('Failed to remove notes')
    } finally {
      dispatch(setRemoveMode(false))
    }
  }
  const onCancelRemove = () => {
    dispatch(setNotesToRemove([]))
    dispatch(setRemoveMode(false))
  }

  return (
    <ButtonGroup className="w-full border-t p-2 justify-center">
      {isRemoveMode ? (
        <>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" disabled={!removeNoteIds.length}>
                <TrashIcon />
                <span>Remove {removeNoteIds.length} notes</span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>You are about to remove {removeNoteIds.length} notes, are you sure?</AlertDialogTitle>
                <AlertDialogDescription>This action cannot be undone!</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction variant="destructive" onClick={onConfirmRemove}>
                  Remove
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Button variant="secondary" onClick={onCancelRemove}>
            Cancel
          </Button>
        </>
      ) : (
        <Button variant="destructive" onClick={() => dispatch(setRemoveMode(true))}>
          <ListChecksIcon /> Select notes to remove
        </Button>
      )}
    </ButtonGroup>
  )
}
