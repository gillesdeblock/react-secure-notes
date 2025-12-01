import type { LexicalEditor } from 'lexical'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface EditorSaveButtonProps extends React.ComponentProps<typeof Button> {
  onSave: (editor: LexicalEditor) => void
}

export function EditorSaveButton({ onSave, className }: EditorSaveButtonProps) {
  const [editor] = useLexicalComposerContext()

  return (
    <Button
      className={cn('ml-auto hover:cursor-pointer', className)}
      onClick={() => onSave(editor)}
    >
      Save
    </Button>
  )
}
