import { TitleNode, type SerializedTitleNode } from '@/components/editor/TitleNode'
import {
  TextNode,
  type SerializedEditorState,
  type SerializedElementNode,
  type SerializedLexicalNode,
  type SerializedRootNode,
  type SerializedTextNode,
} from 'lexical'

type SerializedNode = SerializedElementNode | SerializedLexicalNode

export const isSerializedRootNode = (node: SerializedNode): node is SerializedRootNode => node.type === 'root'
export const isSerializedTitleNode = (node: SerializedNode): node is SerializedTitleNode => node.type === TitleNode.getType()
export const isSerializedTextNode = (node: SerializedNode): node is SerializedTextNode => node.type === TextNode.getType()

export const isSerializedElementNode = (node: SerializedNode): node is SerializedElementNode =>
  'children' in node && Array.isArray(node.children)

export const isSerializedEditorState = (value: any): value is SerializedEditorState => {
  if (!value || typeof value !== 'object') return false
  if (value.root && isSerializedRootNode(value.root)) return true
  return false
}

export const parseEditorState = (state: string): SerializedEditorState | null => {
  try {
    const parsed = JSON.parse(state)
    if (isSerializedEditorState(parsed)) {
      return parsed
    }
    return null
  } catch (error) {
    console.warn(error instanceof Error ? error.message : `could not parse editor state '${state}'`)
    return null
  }
}

export const findNodeRecursive = (
  node: SerializedNode,
  matchFn: (node: SerializedNode, path: SerializedNode[]) => boolean,
  path: SerializedNode[] = [],
): { node: SerializedNode | null; path?: SerializedNode[] } => {
  const currentPath = [...path, node]

  if (matchFn(node, path)) {
    return { node, path: currentPath }
  }
  if (!isSerializedElementNode(node)) {
    return { node: null }
  }

  for (const child of node.children) {
    const found = findNodeRecursive(child, matchFn, currentPath)
    if (found.node) {
      return found
    }
  }

  return { node: null }
}
