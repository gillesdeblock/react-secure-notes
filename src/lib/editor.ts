import type { SerializedEditorState } from 'lexical'

export function safeParseEditorState(content: string): SerializedEditorState | null {
  try {
    const json = JSON.parse(content)
    if (!json || typeof json !== 'object' || !json.root) {
      return null
    }
    return json
  } catch (e) {
    return null
  }
}
