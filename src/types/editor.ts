import type { LexicalNode, SerializedEditorState } from 'lexical'

export const concatNodesTextContent = (nodes: LexicalNode[]) => nodes.map((node) => node.getTextContent()).join('\n')

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
