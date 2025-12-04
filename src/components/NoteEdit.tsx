import type { Note } from '@/types'
import Editor from '@/components/editor/Editor'
import { useLazyGetNotesQuery, useUpdateNoteMutation } from '@/reducers/notes.api'
import { toast } from 'sonner'
import type { EditorState, SerializedTextNode } from 'lexical'
import { TitleNode, type SerializedTitleNode } from './editor/TitleNode'

type NoteEditProps = React.ComponentProps<'div'> & {
  note: Note
}

export default function NoteEdit({ note, ...props }: NoteEditProps) {
  const [updateNote] = useUpdateNoteMutation()
  const [getNotesLazy] = useLazyGetNotesQuery()

  const onSave = async (state: EditorState) => {
    try {
      const extracted = extractNoteContent(state)
      const { title = '', content = '' } = extracted
      await updateNote({ id: note.id, title, content }).unwrap()
      toast.success(<span>Saved note {note.title}.</span>, { richColors: true })
      getNotesLazy()
    } catch (error) {
      toast.error(<span>Failed to save Note {note.title}.</span>, { richColors: true })
    }
  }

  return <Editor key={note.id} onSave={onSave} title={note.title} initialContent={note.content} titlePlaceholder="New note" {...props} />
}

function extractNoteContent(state: EditorState): Partial<Note> {
  const note: Partial<Note> = {
    title: '',
    content: '',
  }

  const { root } = state.clone().toJSON()

  if (!root.children.length) {
    return note
  }

  if (root.children[0]?.type === TitleNode.getType()) {
    const titleNode = root.children[0] as SerializedTitleNode
    const textNode = titleNode.children[0] as SerializedTextNode
    note.title = textNode.text
  }

  note.content = JSON.stringify(state.toJSON())

  return note
}
