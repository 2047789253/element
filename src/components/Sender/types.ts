import type { Editor } from '@tiptap/vue-3'
import type { VNode } from 'vue'

<<<<<<< HEAD
export interface SenderSelectOption {
  label: string
  value: string
=======
export type SenderProps = ExtractPropTypes<typeof senderProps> & { modelValue: string }

export type SenderEmits = SenderEmitsType

export interface SenderEditorLike {
  getText: () => string
>>>>>>> a35bc07b87a9c8701f05d0a98d435c2492872e4d
}

export interface SenderProps {
  modelValue: string
  placeholder: string
  loading: boolean
  disabled: boolean
  theme: 'light' | 'dark'
  extensions: unknown[]
  inputTagPrefixValue: string
  inputTagVariant: 'default' | 'updown'
  enterBreak: boolean
  showInputTagPrefix: boolean
  onHandleKeyDown?:
    | ((event: KeyboardEvent) => void)
    | ((view: unknown, event: KeyboardEvent) => void)
  variant: 'default' | 'updown'
  maxHeight: number
}

export interface SenderEmits {
  (e: 'send', content: string): void
  (e: 'enterPressed'): void
  (e: 'update:modelValue', value: string): void
  (e: 'update:showInputTagPrefix', value: boolean): void
  (e: 'update:loading', loading: boolean): void
  (e: 'paste', event: ClipboardEvent): void
  (e: 'pasteFile', files: File[]): void
  (e: 'focus'): void
  (e: 'blur'): void
}

export type SenderEditorLike = Editor | undefined

export interface SenderInstance {
  focus: () => void
  blur: () => void
  clear: () => void
  editor: () => SenderEditorLike
}

export interface SenderSlots {
  prefix?: () => VNode[]
  'input-tag-prefix'?: () => VNode[]
  'action-list'?: () => VNode[]
  'send-btn'?: (props: { disabled?: boolean }) => VNode[]
  'send-btn-loading'?: () => VNode[]
  'select-slot-content'?: (props: {
    options: SenderSelectOption[]
    theme: 'light' | 'dark'
    selectValue: string
    onSelect: (value: string) => void
    close: () => void
  }) => VNode[]
}
