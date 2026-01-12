import { AlignCenter, AlignJustify, AlignLeft, AlignRight, Bold, Italic, Redo, Strikethrough, Underline, Undo } from 'lucide-react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { mergeRegister } from '@lexical/utils'
import {
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  COMMAND_PRIORITY_LOW,
  createCommand,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
  type LexicalNode,
  type LexicalCommand,
  ParagraphNode,
  $createParagraphNode,
  $isTextNode,
} from 'lexical'
import { useCallback, useEffect, useRef, useState } from 'react'
import { ButtonGroup } from '@/components/ui/button-group'
import { $createHeadingNode, $isHeadingNode, HeadingNode, type HeadingTagType } from '@lexical/rich-text'
import { objectifyStyleString, uniquePrimitiveArray } from '@/lib/utils'
import { Separator } from '../ui/separator'
import { ReplaceNodeSelect } from './ReplaceNodeSelect'
import { CommandButton } from './CommandButton'
import type { ReplaceNodeSelectOption } from '@/types/editor'
import { FontTypeSelect } from './FontTypeSelect'

const CHANGE_TYPE_COMMAND: LexicalCommand<string> = createCommand()
const SET_FONT_FAMILY_COMMAND: LexicalCommand<string> = createCommand()

const HEADING_TAGS: HeadingTagType[] = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
const REPLACE_NODE_OPTIONS: ReplaceNodeSelectOption[] = [
  ...HEADING_TAGS.map((tag) => ({
    key: 'heading-' + tag,
    nodeType: HeadingNode.getType(),
    label: 'Heading ' + tag.charAt(1),
    getReplacementNode: () => $createHeadingNode(tag),
  })),
  {
    key: 'paragraph',
    nodeType: ParagraphNode.getType(),
    label: 'Paragraph',
    getReplacementNode: () => $createParagraphNode(),
  },
]

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext()
  const toolbarRef = useRef(null)

  const [selectionBlockNodeTypes, setSelectionBlockNodeTypes] = useState<string[]>([])
  const [canUndo, setCanUndo] = useState(false)
  const [canRedo, setCanRedo] = useState(false)
  const [isBold, setIsBold] = useState(false)
  const [isItalic, setIsItalic] = useState(false)
  const [isUnderline, setIsUnderline] = useState(false)
  const [isStrikethrough, setIsStrikethrough] = useState(false)
  const [selectionComputedStyle, setSelectionComputedStyle] = useState<Record<string, string>>({})

  let currentFontFamily = selectionComputedStyle?.['font-family']

  if (!currentFontFamily) {
    const domSelection = window.getSelection()
    const el = domSelection?.anchorNode?.parentElement
    const computedStyle = (el && getComputedStyle(el)) || null
    if (computedStyle?.fontFamily) currentFontFamily = computedStyle.fontFamily.split(',')[0].trim()
  }

  const $getSelectionBlockNodes = () => {
    try {
      const selection = $getSelection()
      const blocks = new Map<string, LexicalNode>()

      if (!$isRangeSelection(selection)) {
        return []
      }

      for (const node of selection.getNodes()) {
        const el = node.getTopLevelElement()
        if (el && !blocks.has(el.getKey())) {
          blocks.set(el.getKey(), el)
        }
      }

      return Array.from(blocks.values())
    } catch (error) {
      return []
    }
  }

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection()
    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat('bold'))
      setIsItalic(selection.hasFormat('italic'))
      setIsUnderline(selection.hasFormat('underline'))
      setIsStrikethrough(selection.hasFormat('strikethrough'))

      const computedStyle = objectifyStyleString(selection.anchor.getNode().getStyle())
      setSelectionComputedStyle(computedStyle)

      const selectionBlockNodeTypes = $getSelectionBlockNodes()
        .map((node) => {
          const key = $isHeadingNode(node) ? node.getType() + '-' + node.getTag() : node.getType()
          return REPLACE_NODE_OPTIONS.find((option) => option.key === key)?.label
        })
        .filter((value) => typeof value !== 'undefined')

      setSelectionBlockNodeTypes(uniquePrimitiveArray(selectionBlockNodeTypes))
    }
  }, [])

  const onSetFontFamilyCommand = (font: string) => {
    editor.update(() => {
      const selection = $getSelection()
      if ($isRangeSelection(selection)) {
        const nodes = selection.getNodes()
        for (const node of nodes) {
          if ($isTextNode(node)) {
            node.setStyle(`font-family: ${font}`)
          }
        }
      }
    })

    return false
  }

  const onReplaceNodeCommand = (key: string) => {
    editor.update(() => {
      const selectedOption = REPLACE_NODE_OPTIONS.find((option) => option.key === key)

      if (!selectedOption?.getReplacementNode) {
        return
      }

      for (const node of $getSelectionBlockNodes()) {
        node.replace(selectedOption.getReplacementNode(), true)
      }
    })

    return false
  }

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(
          () => {
            $updateToolbar()
          },
          { editor },
        )
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          $updateToolbar()
          return false
        },
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload)
          return false
        },
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload)
          return false
        },
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand(SET_FONT_FAMILY_COMMAND, onSetFontFamilyCommand, COMMAND_PRIORITY_LOW),
      editor.registerCommand(CHANGE_TYPE_COMMAND, onReplaceNodeCommand, COMMAND_PRIORITY_LOW),
    )
  }, [editor, $updateToolbar])

  return (
    <div className="flex items-center justify-center border-b" ref={toolbarRef}>
      <Separator orientation="vertical" />

      <FontTypeSelect
        options={[
          'sans-serif',
          'Georgia',
          'Cambria',
          'Times New Roman',
          'Times',
          'serif',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'Liberation Mono',
          'Courier New',
          'monospace',
        ]}
        triggerLabel={currentFontFamily}
        onValueChange={(e) => editor.dispatchCommand(SET_FONT_FAMILY_COMMAND, e)}
      />

      <Separator orientation="vertical" />

      <ReplaceNodeSelect
        options={REPLACE_NODE_OPTIONS}
        triggerLabel={selectionBlockNodeTypes.join(', ')}
        onValueChange={(value) => editor.dispatchCommand(CHANGE_TYPE_COMMAND, value)}
      />

      <Separator orientation="vertical" />

      <ButtonGroup>
        <CommandButton disabled={!canUndo} onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)} aria-label="Undo">
          <Undo />
        </CommandButton>
        <CommandButton disabled={!canRedo} onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)} aria-label="Redo">
          <Redo />
        </CommandButton>
      </ButtonGroup>

      <Separator orientation="vertical" />

      <ButtonGroup>
        <CommandButton active={isBold} onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')} aria-label="Format Bold">
          <Bold />
        </CommandButton>
        <CommandButton active={isItalic} onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')} aria-label="Format Italics">
          <Italic />
        </CommandButton>
        <CommandButton
          active={isUnderline}
          onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')}
          aria-label="Format Underline"
        >
          <Underline />
        </CommandButton>
        <CommandButton
          active={isStrikethrough}
          onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough')}
          aria-label="Format Strikethrough"
        >
          <Strikethrough />
        </CommandButton>
      </ButtonGroup>

      <Separator orientation="vertical" />

      <ButtonGroup>
        <CommandButton onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left')} aria-label="Left Align">
          <AlignLeft />
        </CommandButton>
        <CommandButton onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center')} aria-label="Center Align">
          <AlignCenter />
        </CommandButton>
        <CommandButton onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right')} aria-label="Right Align">
          <AlignRight />
        </CommandButton>
        <CommandButton onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify')} aria-label="Justify Align">
          <AlignJustify />
        </CommandButton>
      </ButtonGroup>

      <Separator orientation="vertical" />
    </div>
  )
}
