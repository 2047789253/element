import type { ExtractPropTypes, PropType } from 'vue'

export const bubbleProps = {
  theme: {
    type: String as PropType<'light' | 'dark'>,
    default: '',
  },
  placement: {
    type: String as PropType<'start' | 'end'>,
    default: 'start',
  },
  content: {
    type: String,
    default: '',
  },
  typing: {
    type: Boolean,
    default: false,
  },
  typingOver: {
    type: Boolean,
    default: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  isMarkdown: {
    type: Boolean,
    default: false,
  },
  variant: {
    type: String as PropType<'filled' | 'outlined' | 'shadow' | 'borderless'>,
    default: 'filled',
  },
  shape: {
    type: String as PropType<'default' | 'round' | 'corner'>,
    default: 'default',
  },
  footerTrigger: {
    type: String as PropType<'none' | 'hover'>,
    default: 'none',
  },
}

export type BubblePropsType = PropType<Partial<ExtractPropTypes<typeof bubbleProps>>>
