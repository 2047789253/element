import type { ExtractPropTypes, VNode } from 'vue'
import { conversationsProps } from './props'

export type ConversationsProps = ExtractPropTypes<typeof conversationsProps>

export type ConversationsEmits = {
  next: []
}

export type ConversationsInstance = object

export type ConversationsSlots = {
  default?: () => VNode[]
  header?: () => VNode[]
  scroll?: () => VNode[]
  footer?: () => VNode[]
  loading?: () => VNode[]
}
