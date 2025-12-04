import { LexicalComposer, type InitialConfigType } from '@lexical/react/LexicalComposer'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { type EditorState } from 'lexical'
import { TitleNode } from '@/components/editor/TitleNode'
import { TitlePlugin } from '@/components/editor/TitlePlugin'
import { EditorSaveButton } from './EditorSaveButton'
import { EditorInitializationPlugin } from './EditorInitializationPlugin'

const editorConfig: InitialConfigType = {
  namespace: 'editor',
  editable: true,
  nodes: [TitleNode],

  onError: (err: Error) => {
    throw err
  },

  theme: {
    paragraph: 'mb-2',
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
  onSave: (state: EditorState) => void
}

export default function Editor({ initialContent, titlePlaceholder, onSave }: EditorProps) {
  return (
    <div className="w-full h-full relative">
      <LexicalComposer initialConfig={editorConfig}>
        <div className="relative w-full h-full flex flex-col">
          <div className="h-full">
            <RichTextPlugin
              placeholder={<EditorPlaceholder />}
              contentEditable={<EditorContentEditable />}
              ErrorBoundary={LexicalErrorBoundary}
            />
          </div>
          <EditorInitializationPlugin content={initialContent} />
          <TitlePlugin placeholder={titlePlaceholder} />

          <div className="flex gap-1 p-2 border-t">
            <EditorSaveButton onSave={(editor) => onSave(editor.getEditorState())}></EditorSaveButton>
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
