import { Button } from '@/components/ui/button'
import { NotebookPenIcon } from 'lucide-react'
import { useCreateNoteMutation, useLazyGetNotesQuery } from '@/reducers/notes.api'
import { toast } from 'sonner'

export function NoteCreateButton(props: React.ComponentProps<typeof Button>) {
  const [createNote] = useCreateNoteMutation()
  const [getNotesLazy] = useLazyGetNotesQuery()

  const onClick = async () => {
    try {
      await createNote({ title: '', content: '' }).unwrap()
      toast.success('Created note.', { richColors: true })
    } catch (error) {
      toast.error('Failed to create note.', { richColors: true })
    }
    getNotesLazy()
  }

  return (
    <Button {...props} onClick={onClick}>
      <NotebookPenIcon />
    </Button>
  )
}
