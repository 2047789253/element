import type { VNode, ComponentInternalInstance } from 'vue'
export interface MessageProps {
  message?: string | VNode
  type?: 'success' | 'warning' | 'info' | 'error'
  showClose?: boolean
  duration?: number
  onDestroy: () => void
  id: string
  offset?: number
  getLastBottomOffset: () => number
  zIndex: number
}

export interface MessageContext {
  id: string
  vnode: VNode
  vm: ComponentInternalInstance
  props: MessageProps
  destroy: () => void
}

export type CreateMessageProps = Omit<
  MessageProps,
  'onDestroy' | 'id' | 'getLastBottomOffset' | 'zIndex'
>
