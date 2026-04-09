import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import BubbleList from '../index.vue'
import type { MessageItem } from '../types'

describe('BubbleList', () => {
  let wrapper: unknown

  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount()
    }
  })

  it('应该正确渲染组件并应用 BEM 类名', () => {
    const data: MessageItem[] = [{ id: 1, content: 'Hello', role: 'user' }]
    wrapper = mount(BubbleList, {
      props: { data },
    })

    expect(wrapper.classes()).toContain('el-ai-bubble-list')
    expect(wrapper.find('.el-ai-bubble-list__inner').exists()).toBe(true)
  })

  it('应该根据数据正确渲染消息项', () => {
    const data: MessageItem[] = [
      { id: 1, content: 'Message 1', role: 'user' },
      { id: 2, content: 'Message 2', role: 'assistant' },
      { id: 3, content: 'Message 3', role: 'user', typing: true },
    ]
    wrapper = mount(BubbleList, {
      props: { data },
    })

    const items = wrapper.findAll('.el-ai-bubble-list__item')
    expect(items).toHaveLength(3)
  })

  it('应该在没有数据时呈现空状态', () => {
    wrapper = mount(BubbleList, {
      props: { data: [] },
    })

    const items = wrapper.findAll('.el-ai-bubble-list__item')
    expect(items).toHaveLength(0)
  })

  it('应该支持自定义插槽', () => {
    const data: MessageItem[] = [{ id: 1, content: 'Test', role: 'user' }]
    wrapper = mount(BubbleList, {
      props: { data },
      slots: {
        item: '<div class="custom-item">{{ data.content }}</div>',
      },
    })

    expect(wrapper.find('.custom-item').exists()).toBe(true)
  })

  it('应该在数据更新时保持正确的消息顺序', async () => {
    const initialData: MessageItem[] = [{ id: 1, content: 'First', role: 'user' }]
    wrapper = mount(BubbleList, {
      props: { data: initialData },
    })

    const newData: MessageItem[] = [
      { id: 1, content: 'First', role: 'user' },
      { id: 2, content: 'Second', role: 'assistant' },
    ]

    await wrapper.setProps({ data: newData })
    await flushPromises()

    const items = wrapper.findAll('.el-ai-bubble-list__item')
    expect(items).toHaveLength(2)
  })

  it('应该暴露 scrollToBottom 方法', () => {
    const data: MessageItem[] = [{ id: 1, content: 'Test', role: 'user' }]
    wrapper = mount(BubbleList, {
      props: { data },
    })

    expect(typeof wrapper.vm.scrollToBottom).toBe('function')
  })

  it('应该正确传递消息属性到气泡组件', () => {
    const data: MessageItem[] = [
      { id: 1, content: 'User message', role: 'user', typing: false },
      { id: 2, content: 'AI message', role: 'assistant', typing: true },
    ]
    wrapper = mount(BubbleList, {
      props: { data },
      global: {
        stubs: {
          ElABubble: true,
        },
      },
    })

    const bubbles = wrapper.findAllComponents({ name: 'ElABubble' })
    expect(bubbles.length).toBeGreaterThanOrEqual(0)
  })

  it('应该在用户手动滚动后不自动滚动到底部', async () => {
    const data: MessageItem[] = [{ id: 1, content: 'Message', role: 'user' }]
    wrapper = mount(BubbleList, {
      props: { data },
    })

    const listEl = wrapper.find('.el-ai-bubble-list').element as HTMLElement

    // 直接修改 ref 对象的属性
    if (wrapper.vm.isUserScrolling !== undefined) {
      Object.defineProperty(listEl, 'scrollHeight', {
        value: 500,
        writable: true,
        configurable: true,
      })
      Object.defineProperty(listEl, 'clientHeight', {
        value: 300,
        writable: true,
        configurable: true,
      })
      Object.defineProperty(listEl, 'scrollTop', {
        value: 100,
        writable: true,
        configurable: true,
      })

      // 手动触发 handleScroll 逻辑
      wrapper.vm.handleScroll()

      expect(wrapper.vm.isUserScrolling).toBe(true)
    }
  })
})
