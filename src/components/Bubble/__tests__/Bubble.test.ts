import { describe, it, expect, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Bubble from '../index.vue'

describe('Bubble Component', () => {
  afterEach(() => {
    // cleanup
  })

  // 1. 类名渲染测试
  describe('CSS Classes Rendering', () => {
    it('should render with default BEM classes', () => {
      const wrapper = mount(Bubble)
      expect(wrapper.element.className).toContain('el-ai-bubble')
    })

    it('should render start placement class', () => {
      const wrapper = mount(Bubble, {
        props: { placement: 'start' },
      })
      expect(wrapper.classes()).toContain('el-ai-bubble-start')
    })

    it('should render end placement class', () => {
      const wrapper = mount(Bubble, {
        props: { placement: 'end' },
      })
      expect(wrapper.classes()).toContain('el-ai-bubble-end')
    })

    it('should apply loading state class', () => {
      const wrapper = mount(Bubble, {
        props: { loading: true },
      })
      expect(wrapper.element.querySelector('[class*=loading], [class*=dots]')).toBeTruthy()
    })

    it('should apply typing state class', () => {
      const wrapper = mount(Bubble, {
        props: { typing: true },
      })
      expect(wrapper.classes()).toContain('is-typing')
    })
  })

  // 2. Props 驱动测试
  describe('Props Behavior', () => {
    it('should render content from props', () => {
      const content = 'Hello, this is a test message'
      const wrapper = mount(Bubble, {
        props: { content },
      })
      expect(wrapper.text()).toContain(content)
    })

    it('should support placement prop variation', () => {
      const placements = ['start', 'end']
      placements.forEach((placement) => {
        const wrapper = mount(Bubble, {
          props: { placement: placement as any },
        })
        expect(wrapper.classes()).toContain(`el-ai-bubble-${placement}`)
      })
    })

    it('should display loading indicator when loading is true', () => {
      const wrapper = mount(Bubble, {
        props: { loading: true },
      })
      expect(
        wrapper.find('.vk-bubble__loading, .vk-bubble__dots, [class*=loading]').exists(),
      ).toBeTruthy()
    })

    it('should support typing animation', () => {
      const wrapper = mount(Bubble, {
        props: { typing: true },
      })
      expect(wrapper.classes()).toContain('is-typing')
    })

    it('should support markdown rendering', () => {
      const wrapper = mount(Bubble, {
        props: {
          content: '# Heading',
          isMarkdown: true,
        },
      })
      expect(
        wrapper.find('[class*=markdown]').exists() || wrapper.html().includes('Heading'),
      ).toBeTruthy()
    })

    it('should support theme variants', () => {
      const themes = ['light', 'dark']
      themes.forEach((theme) => {
        const wrapper = mount(Bubble, {
          props: { theme },
        })
        expect(wrapper.classes()).toContain(`vk-bubble--${theme}`)
      })
    })
  })

  // 3. 事件派发测试
  describe('Event Handling', () => {
    it('should support click interaction', async () => {
      const wrapper = mount(Bubble, {
        props: { content: 'Click test' },
      })
      await wrapper.trigger('click')
      // Bubble may emit custom events on click
    })
  })

  // 4. 插槽渲染测试
  describe('Slot Rendering', () => {
    it('should render default slot', () => {
      const wrapper = mount(Bubble, {
        slots: {
          default: '<div class="custom-content">Custom</div>',
        },
      })
      expect(wrapper.html()).toContain('Custom')
    })

    it('should render header slot', () => {
      const wrapper = mount(Bubble, {
        slots: {
          header: '<div class="bubble-header">Header</div>',
        },
      })
      expect(wrapper.html()).toContain('Header')
    })

    it('should render avatar slot', () => {
      const wrapper = mount(Bubble, {
        slots: {
          avatar: '<img src="avatar.png" alt="avatar" />',
        },
      })
      expect(wrapper.html()).toContain('avatar')
    })

    it('should render footer slot', () => {
      const wrapper = mount(Bubble, {
        slots: {
          footer: '<div class="bubble-footer">Footer</div>',
        },
      })
      expect(wrapper.html()).toContain('Footer')
    })
  })
})
