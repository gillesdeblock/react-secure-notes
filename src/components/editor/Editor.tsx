import { LexicalComposer, type InitialConfigType } from '@lexical/react/LexicalComposer'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { type EditorState, type LexicalEditor } from 'lexical'
import { EditorSaveButton } from './EditorSaveButton'
import { EditorInitPlugin } from './EditorInitPlugin'
import { HeadingNode } from '@lexical/rich-text'

const editorConfig: InitialConfigType = {
  namespace: 'editor',
  editable: true,
  nodes: [HeadingNode],

  onError: (err: Error) => {
    throw err
  },

  theme: {
    paragraph: 'mb-2',
    heading: {
      h1: 'text-3xl font-bold mb-3',
    },
    text: {
      bold: 'font-semibold',
      italic: 'italic',
      underline: 'underline',
    },
  },
}

type EditorProps = {
  initialContent: string
  titlePlaceholder?: string
  onSave: (state: LexicalEditor) => void
}

export default function Editor({ initialContent, onSave }: EditorProps) {
  return (
    <div className="w-full h-full relative">
      <LexicalComposer initialConfig={editorConfig}>
        <div className="relative w-full h-full flex flex-col">
          <RichTextPlugin
            contentEditable={
              <div className="h-full">
                <EditorContentEditable />
              </div>
            }
            placeholder={<EditorPlaceholder />}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <EditorInitPlugin content={initialContent} />

          <div className="flex gap-1 p-2 border-t">
            <EditorSaveButton onSave={onSave}></EditorSaveButton>
          </div>
        </div>
      </LexicalComposer>
    </div>
  )
}

export function EditorContentEditable() {
  return <ContentEditable className="z-10 min-h-[200px] h-full outline-none p-4 bg-transparent" />
}

export function EditorPlaceholder() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="p-4 text-gray-400 select-none">Type here...</div>
    </div>
  )
}
