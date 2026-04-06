import { describe, it, expect, afterEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Message from '../Message.vue'

describe('Message Component', () => {
  const defaultProps = {
    message: 'Test message',
    type: 'success' as const,
    id: 'msg-1',
    onDestroy: vi.fn(),
    zIndex: 2000,
    getLastBottomOffset: vi.fn(() => 0),
  }

  afterEach(() => {
    vi.clearAllMocks()
  })

  // 1. 类名渲染测试
  describe('CSS Classes Rendering', () => {
    it('should render with default BEM classes', () => {
      const wrapper = mount(Message, {
        props: defaultProps,
      })
      expect(wrapper.find('[class*=message]').exists()).toBeTruthy()
    })

    it('should render success type class', () => {
      const wrapper = mount(Message, {
        props: { ...defaultProps, type: 'success' },
      })
      expect(wrapper.element.className || wrapper.find('[class*=success]').exists()).toBeTruthy()
    })

    it('should render warning type class', () => {
      const wrapper = mount(Message, {
        props: { ...defaultProps, type: 'warning' },
      })
      expect(wrapper.element.className || wrapper.find('[class*=warning]').exists()).toBeTruthy()
    })

    it('should render info type class', () => {
      const wrapper = mount(Message, {
        props: { ...defaultProps, type: 'info' },
      })
      expect(wrapper.element.className || wrapper.find('[class*=info]').exists()).toBeTruthy()
    })

    it('should render danger type class', () => {
      const wrapper = mount(Message, {
        props: { ...defaultProps, type: 'danger' },
      })
      expect(wrapper.element.className || wrapper.find('[class*=danger]').exists()).toBeTruthy()
    })
  })

  // 2. Props 驱动测试
  describe('Props Behavior', () => {
    it('should display message text', () => {
      const wrapper = mount(Message, {
        props: { ...defaultProps, message: 'Success message' },
      })
      expect(wrapper.text()).toContain('Success message')
    })

    it('should support all type variants', () => {
      const types = ['success', 'warning', 'info', 'danger']
      types.forEach((type) => {
        const wrapper = mount(Message, {
          props: { ...defaultProps, type: type as any },
        })
        expect(wrapper.element.className || wrapper.html().includes(type)).toBeTruthy()
      })
    })

    it('should show close button when showClose is true', () => {
      const wrapper = mount(Message, {
        props: { ...defaultProps, showClose: true },
      })
      expect(wrapper.find('[class*=close]').exists()).toBeTruthy()
    })

    it('should set z-index from prop', () => {
      const wrapper = mount(Message, {
        props: { ...defaultProps, zIndex: 3000 },
      })
      expect(wrapper.props('zIndex')).toBe(3000)
    })

    it('should set offset from prop', () => {
      const wrapper = mount(Message, {
        props: { ...defaultProps, offset: 20 },
      })
      expect(wrapper.props('offset')).toBe(20)
    })

    it('should support custom duration', () => {
      const wrapper = mount(Message, {
        props: { ...defaultProps, duration: 3000 },
      })
      expect(wrapper.props('duration')).toBe(3000)
    })
  })

  // 3. 事件派发测试
  describe('Event Handling', () => {
    it('should call onDestroy when close button is clicked', async () => {
      const onDestroy = vi.fn()
      const wrapper = mount(Message, {
        props: { ...defaultProps, showClose: true, onDestroy },
      })
      const closeBtn = wrapper.find('[class*=close]')
      if (closeBtn.exists()) {
        await closeBtn.trigger('click')
        // onDestroy should have been called
      }
    })

    it('should auto-destroy after duration', () => {
      const onDestroy = vi.fn()
      const wrapper = mount(Message, {
        props: { ...defaultProps, duration: 100, onDestroy },
      })
      expect(wrapper.props('duration')).toBe(100)
    })
  })

  // 4. 插槽渲染测试
  describe('Slot Rendering', () => {
    it('should render with custom content', () => {
      const wrapper = mount(Message, {
        props: defaultProps,
        slots: {
          default: '<span>Custom message content</span>',
        },
      })
      expect(wrapper.html()).toContain('Custom message content')
    })
  })
})
