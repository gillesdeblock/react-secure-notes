import { LexicalComposer, type InitialConfigType } from '@lexical/react/LexicalComposer'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { $getRoot, $parseSerializedNode, type LexicalEditor, type SerializedRootNode, type SerializedTextNode } from 'lexical'
import { TitleNode, type SerializedTitleNode } from '@/components/editor/TitleNode'
import { TitlePlugin } from '@/components/editor/TitlePlugin'
import { EditorSaveButton } from './EditorSaveButton'
import type { Note } from '@/types'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { useEffect, useState } from 'react'
import { parseEditorState } from '@/lib/lexical'

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
  title: string
  content: string
  onSave: (note: Partial<Note> | null) => void
}

const extractNoteContent = (editor: LexicalEditor): Partial<Note> => {
  const note: Partial<Note> = {
    title: '',
    content: '',
  }

  const { root } = editor.getEditorState().clone().toJSON()

  if (!root.children.length) {
    return note
  }

  if (root.children[0]?.type === TitleNode.getType()) {
    const titleNode = root.children[0] as SerializedTitleNode
    const textNode = titleNode.children[0] as SerializedTextNode
    note.title = textNode.text
  }

  note.content = JSON.stringify(editor.getEditorState().toJSON())

  return note
}

export default function Editor({ onSave, content }: EditorProps) {
  return (
    <div className="w-full h-full relative">
      <LexicalComposer initialConfig={editorConfig}>
        <div className="relative w-full h-full flex flex-col">
          <RichTextPlugin
            placeholder={
              <div className="absolute inset-0 pointer-events-none">
                <div className="p-4 text-gray-400 select-none">Type here...</div>
              </div>
            }
            contentEditable={<ContentEditable className="z-10 min-h-[200px] h-full outline-none p-4 bg-transparent" />}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <TitlePlugin />
          <InitializeEditorPlugin content={content} />

          <div className="flex gap-1 p-2 border-t">
            <EditorSaveButton onSave={(editor) => onSave(extractNoteContent(editor))}></EditorSaveButton>
          </div>
        </div>
      </LexicalComposer>
    </div>
  )
}

function InitializeEditorPlugin({ content }: { content?: string }) {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    const contentJSON = parseEditorState(content || '')
    if (contentJSON) {
      editor.update(() => {
        try {
          $getRoot().clear()
          $getRoot().append(...contentJSON.root.children.map($parseSerializedNode))
        } catch (error) {
          console.error('failed to initialize editor', error?.toString())
        }
      })
    }
  }, [editor])

  return null
}
