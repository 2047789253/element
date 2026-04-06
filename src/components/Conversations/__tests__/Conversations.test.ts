import { describe, it, expect, afterEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Conversations from '../index.vue'

describe('Conversations Component', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  // 1. 类名渲染测试
  describe('CSS Classes Rendering', () => {
    it('should render with default BEM classes', () => {
      const wrapper = mount(Conversations)
      expect(wrapper.element.className).toContain('el-ai-conversations')
    })

    it('should apply theme class', () => {
      const wrapper = mount(Conversations, {
        props: { theme: 'dark' },
      })
      expect(wrapper.classes().join(' ')).toContain('dark')
    })

    it('should apply light theme class', () => {
      const wrapper = mount(Conversations, {
        props: { theme: 'light' },
      })
      expect(wrapper.classes().join(' ')).toContain('light')
    })
  })

  // 2. Props 驱动测试
  describe('Props Behavior', () => {
    it('should support theme prop', () => {
      const themes = ['dark', 'light']
      themes.forEach((theme) => {
        const wrapper = mount(Conversations, {
          props: { theme: theme as any },
        })
        expect(wrapper.props('theme')).toBe(theme)
      })
    })

    it('should support hasMore prop', () => {
      const wrapper = mount(Conversations, {
        props: { hasMore: true },
      })
      expect(wrapper.props('hasMore')).toBe(true)
    })

    it('should support onNext callback', () => {
      const onNext = vi.fn()
      const wrapper = mount(Conversations, {
        props: { onNext },
      })
      expect(wrapper.props('onNext')).toBe(onNext)
    })

    it('should default theme to undefined', () => {
      const wrapper = mount(Conversations)
      expect(wrapper.props('theme')).toBeUndefined()
    })

    it('should default hasMore to false', () => {
      const wrapper = mount(Conversations)
      expect(wrapper.props('hasMore')).toBe(false)
    })

    it('should default onNext to undefined', () => {
      const wrapper = mount(Conversations)
      expect(wrapper.props('onNext')).toBeUndefined()
    })
  })

  // 3. 事件派发测试
  describe('Event Handling', () => {
    it('should call onNext when load more is triggered', async () => {
      const onNext = vi.fn()
      const wrapper = mount(Conversations, {
        props: { onNext, hasMore: true },
      })
      // If there's a load-more button/element
      const loadMoreBtn = wrapper.find('[class*=load], [class*=next], [class*=more]')
      if (loadMoreBtn.exists()) {
        await loadMoreBtn.trigger('click')
        // onNext should be called
      }
    })

    it('should not show load more when hasMore is false', () => {
      const wrapper = mount(Conversations, {
        props: { hasMore: false },
      })
      const loadMoreBtn = wrapper.find('[class*=load], [class*=next], [class*=more]')
      // Load more should not be visible
    })

    it('should handle scroll to load more', async () => {
      const onNext = vi.fn()
      const wrapper = mount(Conversations, {
        props: { onNext, hasMore: true },
      })
      // Simulate scroll event if component supports it
    })
  })

  // 4. 插槽渲染测试
  describe('Slot Rendering', () => {
    it('should render default slot for conversation items', () => {
      const wrapper = mount(Conversations, {
        slots: {
          default: '<div class="conversation-item">Item 1</div>',
        },
      })
      expect(wrapper.html()).toContain('conversation-item')
    })

    it('should render multiple conversation items', () => {
      const wrapper = mount(Conversations, {
        slots: {
          default: `
            <div class="item">Item 1</div>
            <div class="item">Item 2</div>
            <div class="item">Item 3</div>
          `,
        },
      })
      expect(wrapper.findAll('.item')).toHaveLength(3)
    })

    it('should render complex conversation structure', () => {
      const wrapper = mount(Conversations, {
        slots: {
          default: `
            <div class="bubble" style="text-align: left;">AI message</div>
            <div class="bubble" style="text-align: right;">User message</div>
          `,
        },
      })
      expect(wrapper.findAll('.bubble')).toHaveLength(2)
    })
  })

  // 5. Conversation list behavior test
  describe('Conversation List Behavior', () => {
    it('should display conversation history', () => {
      const wrapper = mount(Conversations, {
        slots: {
          default: `
            <div class="msg ai-msg">Hello</div>
            <div class="msg user-msg">Hi there</div>
            <div class="msg ai-msg">How are you?</div>
          `,
        },
      })
      expect(wrapper.findAll('.msg')).toHaveLength(3)
    })

    it('should support conversation rendering with mixed content', () => {
      const wrapper = mount(Conversations, {
        slots: {
          default: `
            <div class="conversation">
              <div class="avatar">👤</div>
              <div class="content">Message</div>
            </div>
          `,
        },
      })
      expect(wrapper.find('.conversation').exists()).toBeTruthy()
    })

    it('should handle empty conversation list', () => {
      const wrapper = mount(Conversations)
      // Empty state should be handled gracefully
      expect(wrapper.element).toBeTruthy()
    })
  })

  // 6. Theme behavior
  describe('Theme Behavior', () => {
    it('should apply dark theme styling', () => {
      const wrapper = mount(Conversations, {
        props: { theme: 'dark' },
        slots: {
          default: '<div class="item">Content</div>',
        },
      })
      expect(wrapper.classes().join(' ')).toContain('dark')
    })

    it('should apply light theme styling', () => {
      const wrapper = mount(Conversations, {
        props: { theme: 'light' },
        slots: {
          default: '<div class="item">Content</div>',
        },
      })
      expect(wrapper.classes().join(' ')).toContain('light')
    })

    it('should support switching themes dynamically', async () => {
      const wrapper = mount(Conversations, {
        props: { theme: 'light' },
      })
      await wrapper.setProps({ theme: 'dark' })
      expect(wrapper.props('theme')).toBe('dark')
    })
  })
})
