import {
  $createParagraphNode,
  $createTextNode,
  ElementNode,
  type LexicalNode,
  type RangeSelection,
  type SerializedElementNode,
} from 'lexical'

export interface SerializedTitleNode extends SerializedElementNode {
  type: 'title'
}

export class TitleNode extends ElementNode {
  static getType(): string {
    return 'title'
  }

  static clone(node: TitleNode): TitleNode {
    return new TitleNode(node.__key)
  }

  static importJSON(): TitleNode {
    return new TitleNode()
  }

  insertNewAfter(selection: RangeSelection, restoreSelection?: boolean): null | LexicalNode {
    const node = $createParagraphNode()
    this.insertAfter(node, true)
    return node
  }

  createDOM(): HTMLElement {
    const el = document.createElement('h1')
    el.className = 'text-3xl font-semibold mb-3'
    return el
  }

  updateDOM(): boolean {
    return false
  }

  exportJSON(): SerializedElementNode {
    return {
      ...super.exportJSON(),
      type: TitleNode.getType(),
    }
  }

  canInsertAfter(): boolean {
    return true
  }

  canInsertBefore(): boolean {
    return false
  }
}

export function $createTitleNode(text?: string) {
  const node = new TitleNode()
  node.append($createTextNode(text))
  return node
}
