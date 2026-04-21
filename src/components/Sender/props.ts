import type { ExtractPropTypes, PropType, VNode } from 'vue'
import { baseInputProps } from './base-input/props'

export type { SenderCompatKeydownHandler, SenderLegacyKeydownHandler } from './base-input/props'

export const senderProps = {
<<<<<<< HEAD
  ...baseInputProps,
=======
  placeholder: {
    type: String,
    default: 'Type a message...',
  },
>>>>>>> a35bc07b87a9c8701f05d0a98d435c2492872e4d
  loading: {
    type: Boolean,
    default: false,
  },
}

export interface SenderSelectOption {
  label: string
  value: string
}

export type SenderSlotsType = {
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

export type SenderEmitsType = {
  (e: 'send', content: string): void
  (e: 'update:loading', loading: boolean): void
}

export type SenderPropsType = PropType<
  Partial<ExtractPropTypes<typeof senderProps> & { modelValue: string }>
>
