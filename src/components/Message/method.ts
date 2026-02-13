import { render, h } from 'vue'
import type { CreateMessageProps, MessageContext } from './types'
import MessageConstructor from './Message.vue'
let seed = 1
const instances: MessageContext[] = []
export const createMessage = (props: CreateMessageProps) => {
  const id = `message_${seed++}`
  const container = document.createElement('div')
  const destroy = () => {
    //删除数组中的实例
    const index = instances.findIndex((instance) => instance.id === id)
    if (index === -1) return
    else instances.splice(index, 1)
    render(null, container)
  }
  const newProps = {
    ...props,
    onDestroy: destroy,
  }
  const vnode = h(MessageConstructor, newProps)
  render(vnode, container)
  //非空断言操作符
  document.body.appendChild(container.firstElementChild!)
  const instance = {
    id,
    vnode,
    props: newProps,
  }
  instances.push(instance)
  return instance
}

export const getLastInstance = () => {
  return instances[instances.length - 1]
}

export const getLastBottomOffset = () => {
  return 0
}
