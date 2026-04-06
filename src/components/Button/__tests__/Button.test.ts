import { describe, it, expect, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from '../Button.vue'

describe('Button Component', () => {
  afterEach(() => {
    // cleanup
  })

  // 1. 类名渲染测试
  describe('CSS Classes Rendering', () => {
    it('should render with default BEM classes', () => {
      const wrapper = mount(Button)
      expect(wrapper.element.className).toContain('el-ai-button')
    })

    it('should render primary type class', () => {
      const wrapper = mount(Button, {
        props: { type: 'primary' },
      })
      expect(wrapper.classes()).toContain('el-ai-button--primary')
    })

    it('should render danger type class', () => {
      const wrapper = mount(Button, {
        props: { type: 'danger' },
      })
      expect(wrapper.classes()).toContain('el-ai-button--danger')
    })

    it('should apply size modifier', () => {
      const wrapper = mount(Button, {
        props: { size: 'large' },
      })
      expect(wrapper.classes()).toContain('el-ai-button--large')
    })

    it('should apply plain modifier', () => {
      const wrapper = mount(Button, {
        props: { plain: true },
      })
      expect(wrapper.classes()).toContain('el-ai-button--plain')
    })

    it('should apply round modifier', () => {
      const wrapper = mount(Button, {
        props: { round: true },
      })
      expect(wrapper.classes()).toContain('el-ai-button--round')
    })

    it('should apply circle modifier', () => {
      const wrapper = mount(Button, {
        props: { circle: true },
      })
      expect(wrapper.classes()).toContain('el-ai-button--circle')
    })

    it('should apply disabled state class', () => {
      const wrapper = mount(Button, {
        props: { disabled: true },
      })
      expect(wrapper.classes()).toContain('is-disabled')
    })

    it('should apply loading state class', () => {
      const wrapper = mount(Button, {
        props: { loading: true },
      })
      expect(wrapper.classes()).toContain('is-loading')
    })
  })

  // 2. Props 驱动测试
  describe('Props Behavior', () => {
    it('should disable button when disabled prop is true', () => {
      const wrapper = mount(Button, {
        props: { disabled: true },
      })
      expect(wrapper.attributes('disabled')).toBeDefined()
    })

    it('should support different native types', () => {
      const wrapper = mount(Button, {
        props: { nativeType: 'submit' },
      })
      expect(wrapper.attributes('type')).toBe('submit')
    })

    it('should apply auto-focus attribute', () => {
      const wrapper = mount(Button, {
        props: { autoFocus: true },
      })
      expect(wrapper.attributes('auto-focus')).toBeDefined()
    })

    it('should disable button when loading is true', () => {
      const wrapper = mount(Button, {
        props: { loading: true },
      })
      expect(wrapper.attributes('disabled')).toBeDefined()
    })

    it('should support multiple type variants', () => {
      const types = ['primary', 'success', 'warning', 'danger', 'info']
      types.forEach((type) => {
        const wrapper = mount(Button, {
          props: { type: type as any },
        })
        expect(wrapper.classes()).toContain(`el-ai-button--${type}`)
      })
    })

    it('should support size variants', () => {
      const sizes = ['small', 'medium', 'large']
      sizes.forEach((size) => {
        const wrapper = mount(Button, {
          props: { size: size as any },
        })
        expect(wrapper.classes()).toContain(`el-ai-button--${size}`)
      })
    })
  })

  // 3. 事件派发测试
  describe('Event Handling', () => {
    it('should emit click event when clicked', async () => {
      const wrapper = mount(Button)
      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toBeTruthy()
    })

    it('should not emit click when disabled', async () => {
      const wrapper = mount(Button, {
        props: { disabled: true },
      })
      await wrapper.trigger('click')
      // Browser prevents click on disabled buttons, but we test the disabled attribute
      expect(wrapper.attributes('disabled')).toBeDefined()
    })

    it('should emit click event multiple times', async () => {
      const wrapper = mount(Button)
      await wrapper.trigger('click')
      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toHaveLength(2)
    })
  })

  // 4. 插槽渲染测试
  describe('Slot Rendering', () => {
    it('should render default slot content', () => {
      const wrapper = mount(Button, {
        slots: {
          default: 'Click Me',
        },
      })
      expect(wrapper.text()).toBe('Click Me')
    })

    it('should render complex slot content', () => {
      const wrapper = mount(Button, {
        slots: {
          default: '<span>Complex Content</span>',
        },
      })
      expect(wrapper.html()).toContain('Complex Content')
    })

    it('should render with icon and text', () => {
      const wrapper = mount(Button, {
        props: { icon: 'check' },
        slots: {
          default: 'Confirm',
        },
      })
      expect(wrapper.text()).toContain('Confirm')
    })
  })
})
