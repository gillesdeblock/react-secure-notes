import type { LexicalNode } from 'lexical'

export type ReplaceNodeSelectOption = {
  key: string
  label?: string
  nodeType?: string
  getReplacementNode?: () => LexicalNode
}
