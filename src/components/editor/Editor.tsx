import { LexicalComposer, type InitialConfigType } from '@lexical/react/LexicalComposer'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { type LexicalEditor } from 'lexical'
import { EditorSaveButton } from './EditorSaveButton'
import { EditorInitPlugin } from './EditorInitPlugin'
import { HeadingNode } from '@lexical/rich-text'
import ToolbarPlugin from './ToolbarPlugin'

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
      h1: 'text-4xl font-bold mb-4',
      h2: 'text-2xl font-bold mb-4',
      h3: 'text-xl font-bold mb-4',
      h4: 'text-lg font-bold mb-4',
      h5: 'text-base font-semibold mb-2',
      h6: 'text-base text-gray-400 font-semibold mb-2',
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
  onSave: (state: LexicalEditor) => void
}

export default function Editor({ initialContent, onSave }: EditorProps) {
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="w-full h-full flex flex-col text-gray-">
        <ToolbarPlugin />

        <div className="relative h-full">
          <RichTextPlugin
            contentEditable={<EditorContentEditable />}
            placeholder={<EditorPlaceholder />}
            ErrorBoundary={LexicalErrorBoundary}
          />
        </div>

        <div className="flex gap-1 p-2 border-t">
          <EditorSaveButton onSave={onSave}></EditorSaveButton>
        </div>

        <EditorInitPlugin content={initialContent} />
      </div>
    </LexicalComposer>
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
