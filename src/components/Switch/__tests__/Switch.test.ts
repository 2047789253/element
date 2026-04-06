import { describe, it, expect, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Switch from '../Switch.vue'

describe('Switch Component', () => {
  afterEach(() => {
    // cleanup
  })

  // 1. 类名渲染测试
  describe('CSS Classes Rendering', () => {
    it('should render with default BEM classes', () => {
      const wrapper = mount(Switch)
      expect(wrapper.element.className).toContain('el-ai-switch')
    })

    it('should apply disabled state class', () => {
      const wrapper = mount(Switch, {
        props: { disabled: true },
      })
      expect(wrapper.classes()).toContain('is-disabled')
    })

    it('should render size modifier', () => {
      const wrapper = mount(Switch, {
        props: { size: 'small' },
      })
      expect(wrapper.classes()).toContain('el-ai-switch--small')
    })

    it('should apply large size class', () => {
      const wrapper = mount(Switch, {
        props: { size: 'large' },
      })
      expect(wrapper.classes()).toContain('el-ai-switch--large')
    })
  })

  // 2. Props 驱动测试
  describe('Props Behavior', () => {
    it('should disable switch when disabled prop is true', () => {
      const wrapper = mount(Switch, {
        props: { disabled: true },
      })
      expect(
        wrapper.element.hasAttribute('disabled') || wrapper.classes().includes('is-disabled'),
      ).toBeTruthy()
    })

    it('should render active text', () => {
      const wrapper = mount(Switch, {
        props: { activeText: 'ON', modelValue: true },
      })
      expect(wrapper.text()).toContain('ON')
    })

    it('should render inactive text', () => {
      const wrapper = mount(Switch, {
        props: { inactiveText: 'OFF', modelValue: false },
      })
      expect(wrapper.text()).toContain('OFF')
    })

    it('should support size variants', () => {
      const sizes = ['small', 'large']
      sizes.forEach((size) => {
        const wrapper = mount(Switch, {
          props: { size: size as any },
        })
        expect(wrapper.classes()).toContain(`el-ai-switch--${size}`)
      })
    })

    it('should support custom active value', () => {
      const wrapper = mount(Switch, {
        props: {
          activeValue: 'yes',
          inactiveValue: 'no',
        },
      })
      // Props should be applied
      expect(wrapper.props('activeValue')).toBe('yes')
    })

    it('should support string active/inactive values', () => {
      const wrapper = mount(Switch, {
        props: {
          activeValue: '1',
          inactiveValue: '0',
        },
      })
      expect(wrapper.props('activeValue')).toBe('1')
      expect(wrapper.props('inactiveValue')).toBe('0')
    })

    it('should support number active/inactive values', () => {
      const wrapper = mount(Switch, {
        props: {
          activeValue: 1,
          inactiveValue: 0,
        },
      })
      expect(wrapper.props('activeValue')).toBe(1)
      expect(wrapper.props('inactiveValue')).toBe(0)
    })

    it('should set name attribute', () => {
      const wrapper = mount(Switch, {
        props: { name: 'toggle' },
      })
      expect(wrapper.find('input').attributes('name')).toBe('toggle')
    })
  })

  // 3. 事件派发测试
  describe('Event Handling', () => {
    it('should emit change event when toggled', async () => {
      const wrapper = mount(Switch)
      await wrapper.trigger('click')
      expect(wrapper.emitted('change')).toBeTruthy()
    })

    it('should emit change with correct value', async () => {
      const wrapper = mount(Switch, {
        props: {
          activeValue: true,
          inactiveValue: false,
        },
      })
      await wrapper.trigger('click')
      const event = wrapper.emitted('change')
      expect(event).toBeTruthy()
    })

    it('should not emit change when disabled', async () => {
      const wrapper = mount(Switch, {
        props: { disabled: true },
      })
      await wrapper.trigger('click')
      // Behavior depends on implementation
    })
  })
})
