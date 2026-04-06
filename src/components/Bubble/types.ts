import type { ExtractPropTypes, VNode } from 'vue'
import { bubbleProps } from './props'

export type BubbleProps = ExtractPropTypes<typeof bubbleProps>

export type BubbleEmits = Record<string, unknown>

export type BubbleInstance = object

export type BubbleSlots = {
  default?: () => VNode[]
  header?: () => VNode[]
  avatar?: () => VNode[]
  footer?: () => VNode[]
}
