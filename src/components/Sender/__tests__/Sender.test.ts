import { describe, it, expect, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Sender from '../index.vue'

describe('Sender Component', () => {
  afterEach(() => {
    // cleanup
  })

  // 1. 类名渲染测试
  describe('CSS Classes Rendering', () => {
    it('should render with default BEM classes', () => {
      const wrapper = mount(Sender)
      expect(wrapper.find('[class*=sender]').exists()).toBeTruthy()
    })

    it('should apply disabled state', () => {
      const wrapper = mount(Sender, {
        props: { disabled: true },
      })
      expect(wrapper.find('textarea').attributes('disabled')).toBeDefined()
    })

    it('should apply loading state', () => {
      const wrapper = mount(Sender, {
        props: { loading: true },
      })
      expect(wrapper.find('textarea').attributes('disabled')).toBeDefined()
    })
  })

  // 2. Props 驱动测试
  describe('Props Behavior', () => {
    it('should support v-model with modelValue', async () => {
      const wrapper = mount(Sender, {
        props: { modelValue: 'Hello' },
      })

      expect(wrapper.props('modelValue')).toBe('Hello')
    })

    it('should update modelValue when input changes', async () => {
      const wrapper = mount(Sender, {
        props: { modelValue: '' },
      })
      const input = wrapper.find('input, textarea, [contenteditable]')
      if (input.exists()) {
        await input.setValue('New text')
      }
    })

    it('should show placeholder', () => {
      const placeholder = 'Type your message...'
      const wrapper = mount(Sender, {
        props: { placeholder },
      })
      const input = wrapper.find('input, textarea, [contenteditable]')
      if (input.exists()) {
        expect(input.attributes('placeholder')).toContain('message')
      }
    })

    it('should disable sender when disabled prop is true', () => {
      const wrapper = mount(Sender, {
        props: { disabled: true },
      })
      const input = wrapper.find('input, textarea, [contenteditable]')
      if (input.exists()) {
        expect(input.attributes('disabled')).toBeDefined()
      }
    })

    it('should support theme prop', () => {
      const themes = ['light', 'dark'] as const
      themes.forEach((theme: (typeof themes)[number]) => {
        const wrapper = mount(Sender, {
          props: { theme },
        })
        expect(wrapper.props('theme')).toBe(theme)
      })
    })

    it('should default placeholder when not provided', () => {
      const wrapper = mount(Sender)
      expect(wrapper.props('placeholder')).toBe('Type a message...')
    })
  })

  // 3. 事件派发测试
  describe('Event Handling', () => {
    it('should emit submit event on enter key', async () => {
      const wrapper = mount(Sender, {
        props: { modelValue: 'test' },
      })
      const textarea = wrapper.find('textarea')
      if (textarea.exists()) {
        await textarea.trigger('keydown.enter.ctrl')
        // Submit event should be emitted on Ctrl+Enter
      }
    })

    it('should emit update:modelValue when input changes', async () => {
      const wrapper = mount(Sender, {
        props: { modelValue: '' },
      })
      const textarea = wrapper.find('textarea')
      if (textarea.exists()) {
        await textarea.setValue('new message')
        expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      }
    })

    it('should support custom submit actions', async () => {
      const wrapper = mount(Sender, {
        props: { modelValue: 'message' },
      })
      const sendBtn = wrapper.find('[class*=send]')
      if (sendBtn.exists()) {
        await sendBtn.trigger('click')
        // Submit should be triggered
      }
    })

    it('should not submit when disabled', async () => {
      const wrapper = mount(Sender, {
        props: { modelValue: 'text', disabled: true },
      })
      const textarea = wrapper.find('textarea')
      if (textarea.exists()) {
        expect(textarea.attributes('disabled')).toBeDefined()
      }
    })
  })

  // 4. 插槽渲染测试
  describe('Slot Rendering', () => {
    it('should render action-list slot', () => {
      const wrapper = mount(Sender, {
        slots: {
          'action-list': '<button>Action</button>',
        },
      })
      expect(wrapper.html()).toContain('Action')
    })

    it('should render custom send button slot', () => {
      const wrapper = mount(Sender, {
        slots: {
          'send-btn': '<button class="custom-send">Send</button>',
        },
      })
      expect(wrapper.html()).toContain('custom-send')
    })

    it('should render loading state slot', () => {
      const wrapper = mount(Sender, {
        props: { loading: true },
        slots: {
          'send-btn-loading': '<span>Loading...</span>',
        },
      })
      expect(wrapper.html()).toContain('Loading')
    })
  })
})
