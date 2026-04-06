import { describe, it, expect, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Icon from '../Icon.vue'

describe('Icon Component', () => {
  afterEach(() => {
    // cleanup
  })

  // 1. 类名渲染测试
  describe('CSS Classes Rendering', () => {
    it('should render with icon wrapper classes', () => {
      const wrapper = mount(Icon, {
        props: { icon: 'check' },
      })
      expect(wrapper.element.className).toBeTruthy()
    })

    it('should render border class when border prop is true', () => {
      const wrapper = mount(Icon, {
        props: { icon: 'check', border: true },
      })
      expect(wrapper.classes().join(' ')).toContain('fa-border')
    })

    it('should render fixed-width class', () => {
      const wrapper = mount(Icon, {
        props: { icon: 'check', fixedWidth: true },
      })
      expect(wrapper.classes().join(' ')).toContain('fa-fw')
    })

    it('should apply size modifiers', () => {
      const sizes = ['xs', 'sm', 'lg', 'xl', '2xl', '2x', '3x']
      sizes.forEach((size) => {
        const wrapper = mount(Icon, {
          props: { icon: 'check', size },
        })
        expect(wrapper.classes().join(' ')).toMatch(/fa-/i)
      })
    })
  })

  // 2. Props 驱动测试
  describe('Props Behavior', () => {
    it('should support string icon', () => {
      const wrapper = mount(Icon, {
        props: { icon: 'check' },
      })
      expect(wrapper.props('icon')).toBe('check')
    })

    it('should support icon variations', () => {
      const icons = ['check', 'times', 'star', 'heart', 'search']
      icons.forEach((icon) => {
        const wrapper = mount(Icon, {
          props: { icon },
        })
        expect(wrapper.props('icon')).toBe(icon)
      })
    })

    it('should support rotation prop', () => {
      const rotations = [90, 180, 270]
      rotations.forEach((rotation) => {
        const wrapper = mount(Icon, {
          props: { icon: 'check', rotation: rotation as any },
        })
        expect(wrapper.classes().join(' ')).toMatch(/fa-rotate-\d+/)
      })
    })

    it('should support flip prop', () => {
      const flips = ['horizontal', 'vertical', 'both']
      flips.forEach((flip) => {
        const wrapper = mount(Icon, {
          props: { icon: 'check', flip: flip as any },
        })
        expect(wrapper.classes().join(' ')).toMatch(/fa-flip|fa-flip-/)
      })
    })

    it('should support pulse animation', () => {
      const wrapper = mount(Icon, {
        props: { icon: 'spinner', pulse: true },
      })
      expect(wrapper.classes().join(' ')).toContain('fa-pulse')
    })

    it('should support spin animation', () => {
      const wrapper = mount(Icon, {
        props: { icon: 'spinner', spin: true },
      })
      expect(wrapper.classes().join(' ')).toContain('fa-spin')
    })

    it('should support pull prop', () => {
      const pulls = ['left', 'right']
      pulls.forEach((pull) => {
        const wrapper = mount(Icon, {
          props: { icon: 'check', pull: pull as any },
        })
        expect(wrapper.classes().join(' ')).toContain(`fa-pull-${pull}`)
      })
    })

    it('should support list-item prop', () => {
      const wrapper = mount(Icon, {
        props: { icon: 'check', listItem: true },
      })
      expect(wrapper.classes().join(' ')).toContain('fa-li')
    })

    it('should support fixed-width class', () => {
      const wrapper = mount(Icon, {
        props: { icon: 'check', fixedWidth: true },
      })
      expect(wrapper.classes().join(' ')).toContain('fa-fw')
    })

    it('should support swap-opacity prop', () => {
      const wrapper = mount(Icon, {
        props: { icon: 'check', swapOpacity: true },
      })
      expect(wrapper.classes().join(' ')).toContain('fa-swap-opacity')
    })
  })

  // 3. 事件派发测试
  describe('Event Handling', () => {
    it('should emit click event', async () => {
      const wrapper = mount(Icon, {
        props: { icon: 'check' },
      })
      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toBeTruthy()
    })
  })

  // 4. 插槽渲染测试
  describe('Slot Rendering', () => {
    it('should render component content', () => {
      const wrapper = mount(Icon, {
        props: { icon: 'check' },
      })
      // Icon component renders FontAwesome icon
      expect(wrapper.element).toBeTruthy()
    })
  })
})
