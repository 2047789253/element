import type { ExtractPropTypes, PropType, VNode } from 'vue'

export const senderProps = {
  modelValue: {
    type: String,
    default: '',
  },
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
}

export type SenderSlotsType = {
  prefix?: () => VNode[]
  'action-list'?: () => VNode[]
  'send-btn'?: (props: { disabled?: boolean }) => VNode[]
  'send-btn-loading'?: () => VNode[]
}

export type SenderEmitsType = {
  (e: 'send', content: string): void
  (e: 'update:modelValue', value: string): void
  (e: 'update:loading', loading: boolean): void
  (e: 'focus'): void
  (e: 'blur'): void
}

export type SenderPropsType = PropType<Partial<ExtractPropTypes<typeof senderProps>>>
