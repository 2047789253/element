import type { VNode } from 'vue'
export interface MessageProps {
  message?: string | VNode
  type?: 'success' | 'warning' | 'info' | 'error'
  showClose?: boolean
  duration?: number
  onDestroy: () => void
  offset?: number
}

export interface MessageContext {
  id: string
  vnode: VNode
  props: MessageProps
}

export type CreateMessageProps = Omit<MessageProps, 'onDestroy'>
