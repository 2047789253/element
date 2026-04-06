export type TypewriterStatus = 'typing' | 'paused' | 'stopped' | 'done'

export interface TypewriterProps {
  speed?: number
  text?: string
  staticText?: string
}

interface TypewriterInfo {
  text: string
  index: number
  status: TypewriterStatus
  staticText?: string
}

export function createTypewriter(props?: Partial<TypewriterProps>) {
  const speed = props?.speed ?? 50
  let text = props?.text ?? ''
  let index = 0
  let status: TypewriterStatus = 'stopped'
  let staticText = props?.staticText ?? ''
  let currentCallback: ((text: string) => void) | null = null
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  const getInfo = (): TypewriterInfo => ({
    text,
    index,
    status,
    staticText,
  })

  const setText = (newText: string) => {
    text = newText
    index = 0
  }

  const setConfig = (config: { staticText?: string; speed?: number }) => {
    if (config.staticText !== undefined) {
      staticText = config.staticText
    }
    if (config.speed !== undefined) {
      // Note: speed is fixed during construction
    }
  }

  const type = (callback: (text: string) => void) => {
    if (index < text.length && status === 'typing') {
      index++
      callback(text.substring(0, index) + staticText)
      timeoutId = setTimeout(() => type(callback), speed)
    } else if (index >= text.length && status === 'typing') {
      status = 'done'
      callback(text + staticText)
    }
  }

  const start = (callback: (text: string) => void) => {
    if (status === 'stopped' || status === 'paused') {
      status = 'typing'
      currentCallback = callback
      type(callback)
    }
  }

  const paused = () => {
    if (status === 'typing') {
      status = 'paused'
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }

  const stop = () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    status = 'stopped'
    index = 0
    text = ''
  }

  const done = () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    status = 'done'
    if (currentCallback) {
      currentCallback(text + staticText)
    }
  }

  const destory = () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
  }

  return {
    getInfo,
    setText,
    setConfig,
    start,
    paused,
    stop,
    done,
    destory,
  }
}

import { onBeforeUnmount, ref } from 'vue'

export const useTyperwriter = (initProps?: Partial<TypewriterProps>) => {
  const content = ref('')
  const status = ref<TypewriterStatus>('stopped')
  const typewriter = createTypewriter(initProps)

  const getStatus = () => {
    status.value = typewriter.getInfo().status
    return status.value
  }

  getStatus()

  const start = () => {
    typewriter.start((text: string) => {
      content.value = text
    })
  }

  const paused = () => {
    typewriter.paused()
    getStatus()
  }

  const stop = () => {
    typewriter.stop()
    getStatus()
  }

  const done = () => {
    typewriter.done()
    getStatus()
  }

  onBeforeUnmount(() => {
    typewriter.destory()
  })

  return {
    ...typewriter,
    start,
    paused,
    stop,
    done,
    status,
    content,
  }
}
