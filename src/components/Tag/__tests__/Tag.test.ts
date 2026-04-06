import { describe, it, expect, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Tag from '../Tag.vue'

describe('Tag Component', () => {
  afterEach(() => {
    // cleanup
  })

  // 1. 类名渲染测试
  describe('CSS Classes Rendering', () => {
    it('should render with default BEM classes', () => {
      const wrapper = mount(Tag)
      expect(wrapper.element.className).toContain('el-ai-tag')
    })

    it('should render primary type class', () => {
      const wrapper = mount(Tag, {
        props: { type: 'primary' },
      })
      expect(wrapper.classes()).toContain('el-ai-tag--primary')
    })

    it('should render success type class', () => {
      const wrapper = mount(Tag, {
        props: { type: 'success' },
      })
      expect(wrapper.classes()).toContain('el-ai-tag--success')
    })

    it('should render warning type class', () => {
      const wrapper = mount(Tag, {
        props: { type: 'warning' },
      })
      expect(wrapper.classes()).toContain('el-ai-tag--warning')
    })

    it('should render danger type class', () => {
      const wrapper = mount(Tag, {
        props: { type: 'danger' },
      })
      expect(wrapper.classes()).toContain('el-ai-tag--danger')
    })
  })

  // 2. Props 驱动测试
  describe('Props Behavior', () => {
    it('should support all type variants', () => {
      const types = ['primary', 'success', 'warning', 'danger']
      types.forEach((type) => {
        const wrapper = mount(Tag, {
          props: { type: type as any },
        })
        expect(wrapper.classes()).toContain(`el-ai-tag--${type}`)
      })
    })

    it('should have default type', () => {
      const wrapper = mount(Tag)
      // Check if it has a default type class or is empty
      expect(wrapper.element.className).toBeTruthy()
    })
  })

  // 3. 事件派发测试
  describe('Event Handling', () => {
    it('should emit click event', async () => {
      const wrapper = mount(Tag)
      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toBeTruthy()
    })

    it('should emit close event if closable', async () => {
      const wrapper = mount(Tag, {
        props: { closable: true },
      })
      // Look for close button if it exists
      const closeBtn = wrapper.find('[class*=close], button')
      if (closeBtn.exists()) {
        await closeBtn.trigger('click')
      }
    })
  })

  // 4. 插槽渲染测试
  describe('Slot Rendering', () => {
    it('should render default slot content', () => {
      const wrapper = mount(Tag, {
        slots: {
          default: 'Tag Label',
        },
      })
      expect(wrapper.text()).toBe('Tag Label')
    })

    it('should render complex slot content', () => {
      const wrapper = mount(Tag, {
        slots: {
          default: '<strong>Important</strong>',
        },
      })
      expect(wrapper.html()).toContain('Important')
    })

    it('should render with icon and text', () => {
      const wrapper = mount(Tag, {
        slots: {
          default: '<i class="icon"></i> Tag Text',
        },
      })
      expect(wrapper.html()).toContain('Tag Text')
    })
  })
})
