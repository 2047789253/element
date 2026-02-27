import { render, h, shallowReactive } from 'vue'
import type { CreateMessageProps, MessageContext } from './types'
import MessageConstructor from './Message.vue'
import useZIndex from '../../hooks/useZIndex'

let seed = 1
const instances: MessageContext[] = shallowReactive([])
export const createMessage = (props: CreateMessageProps) => {
  const { nextZIndex } = useZIndex()
  const id = `message_${seed++}`
  const container = document.createElement('div')

  const destroy = () => {
    //删除数组中的实例
    const index = instances.findIndex((instance) => instance.id === id)
    if (index === -1) return
    else instances.splice(index, 1)
    render(null, container)
  }

  //手动调用删除
  const manualDestroy = () => {
    const instance = instances.find((instance) => instance.id === id)
    if (instance) {
      instance.vm.exposed!.visible.value = false
    }
  }

  // 动态查找前一个实例，读取响应式 instances 数组使 computed 可追踪
  const getLastBottomOffset = () => {
    const idx = instances.findIndex((instance) => instance.id === id)
    if (idx === -1) {
      // 初次 render 时自己还没 push，数组最后一个就是前一个实例
      const prev = instances.length > 0 ? instances[instances.length - 1] : null
      return prev?.vm.exposed?.bottomOffset.value ?? 0
    }
    if (idx === 0) return 0
    const prev = instances[idx - 1]
    return prev?.vm.exposed?.bottomOffset.value ?? 0
  }

  const newProps = {
    ...props,
    id,
    zIndex: nextZIndex(),
    onDestroy: destroy,
    getLastBottomOffset,
  }
  const vnode = h(MessageConstructor, newProps)
  render(vnode, container)
  document.body.appendChild(container.firstElementChild!) //非空断言操作符
  const vm = vnode.component!
  const instance = {
    id,
    vnode,
    vm,
    props: newProps,
    destroy: manualDestroy,
  }
  instances.push(instance)
  return instance
}

// export const getLastInstance = () => {
//   return instances[instances.length - 1]
// }
