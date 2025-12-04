import {
  $createParagraphNode,
  $createTextNode,
  ElementNode,
  type LexicalNode,
  type NodeKey,
  type SerializedElementNode,
  type SerializedTextNode,
} from 'lexical'

const titleNodeClassName = [
  'text-3xl font-semibold mb-3 relative',
  '[&.empty]:before:absolute',
  '[&.empty]:before:content-[attr(data-placeholder)]',
  '[&.empty]:before:left-0',
  '[&.empty]:before:top-0',
  '[&.empty]:before:text-gray-400',
].join(' ')

export type SerializedTitleNode = SerializedElementNode & {
  placeholder: string
}

export class TitleNode extends ElementNode {
  __placeholder: string

  constructor(key?: NodeKey, placeholder: string = '') {
    super(key)
    this.__placeholder = placeholder
  }

  static getType(): string {
    return 'title'
  }

  static clone(node: TitleNode): TitleNode {
    return new TitleNode(node.__key, node.__placeholder)
  }

  static importJSON(node: SerializedTitleNode): TitleNode {
    return new TitleNode((node.children[0] as SerializedTextNode)?.text, node.placeholder)
  }

  insertNewAfter(): null | LexicalNode {
    const node = $createParagraphNode()
    this.insertAfter(node, true)
    return node
  }
  excludeFromCopy(destination?: 'clone' | 'html'): boolean {
    return destination === 'html'
  }

  createDOM(): HTMLElement {
    const el = document.createElement('h1')
    el.className = titleNodeClassName
    el.setAttribute('data-placeholder', this.__placeholder)

    if (this.getTextContentSize() === 0) {
      el.classList.add('empty')
    }

    return el
  }

  updateDOM(prevNode: TitleNode, dom: HTMLElement): boolean {
    const empty = prevNode.getTextContentSize() === 0

    if (prevNode.__placeholder !== this.__placeholder) {
      dom.setAttribute('data-placeholder', this.__placeholder)
    }

    if (empty) {
      dom.classList.add('empty')
    } else {
      dom.classList.remove('empty')
    }

    return false
  }

  exportJSON(): SerializedTitleNode {
    return {
      ...super.exportJSON(),
      placeholder: this.__placeholder,
    }
  }

  canInsertAfter(): boolean {
    return true
  }

  canInsertBefore(): boolean {
    return false
  }
}

export function $createTitleNode(text?: string, placeholder?: string) {
  const node = new TitleNode(undefined, placeholder)
  node.append($createTextNode(text))
  return node
}
