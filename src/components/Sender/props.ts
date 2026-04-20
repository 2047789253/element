import type { ExtractPropTypes, PropType, VNode } from 'vue'

export const senderProps = {
  placeholder: {
    type: String,
    default: 'Type a message...',
  },
  loading: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  theme: {
    type: String as PropType<'light' | 'dark'>,
    default: '',
  },
  variant: {
    type: String as PropType<'default' | 'updown'>,
    default: 'default',
  },
  enterBreak: {
    type: Boolean,
    default: false,
  },
  onHandleKeyDown: {
    type: Function as PropType<(event: KeyboardEvent) => void>,
    default: undefined,
  },
  showInputTagPrefix: {
    type: Boolean,
    default: false,
  },
  inputTagPrefixValue: {
    type: String,
    default: '',
  },
  inputTagVariant: {
    type: String as PropType<'default' | 'updown'>,
    default: 'default',
  },
  maxHeight: {
    type: Number,
    default: 200,
  },
}

export type SenderSlotsType = {
  prefix?: () => VNode[]
  'input-tag-prefix'?: () => VNode[]
  'action-list'?: () => VNode[]
  'send-btn'?: (props: { disabled?: boolean }) => VNode[]
  'send-btn-loading'?: () => VNode[]
}

export type SenderEmitsType = {
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

export type SenderPropsType = PropType<
  Partial<ExtractPropTypes<typeof senderProps> & { modelValue: string }>
>
