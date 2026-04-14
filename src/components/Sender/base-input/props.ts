import type { Extensions } from '@tiptap/vue-3'
import type { EditorView } from 'prosemirror-view'
import type { ExtractPropTypes, PropType } from 'vue'

export type SenderLegacyKeydownHandler = (event: KeyboardEvent) => void
export type SenderCompatKeydownHandler = (view: EditorView, event: KeyboardEvent) => void

export const baseInputProps = {
  theme: {
    type: String as PropType<'light' | 'dark'>,
    default: 'light',
  },
  placeholder: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  extensions: {
    type: Array as PropType<Extensions>,
    default: () => [],
  },
  inputTagPrefixValue: {
    type: String,
    default: '',
  },
  inputTagVariant: {
    type: String as PropType<'default' | 'updown'>,
    default: 'default',
  },
  enterBreak: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: String,
    default: '',
  },
  showInputTagPrefix: {
    type: Boolean,
    default: false,
  },
  onHandleKeyDown: {
    type: Function as PropType<SenderLegacyKeydownHandler | SenderCompatKeydownHandler>,
    default: undefined,
  },
  variant: {
    type: String as PropType<'default' | 'updown'>,
    default: 'default',
  },
  maxHeight: {
    type: Number,
    default: 200,
  },
}

export type BaseInputEmitsType = {
  (e: 'update:modelValue', value: string): void
  (e: 'update:showInputTagPrefix', value: boolean): void
  (e: 'enterPressed'): void
  (e: 'paste', event: ClipboardEvent): void
  (e: 'pasteFile', files: File[]): void
  (e: 'blur'): void
  (e: 'focus'): void
}

export type BaseInputPropsType = PropType<Partial<ExtractPropTypes<typeof baseInputProps>>>
