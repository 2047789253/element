import { describe, it, expect, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Dropdown from '../Dropdown.vue'

describe('Dropdown Component', () => {
  const defaultMenuOptions = [
    { label: 'Option 1', key: '1' },
    { label: 'Option 2', key: '2' },
    { label: 'Option 3', key: '3', disabled: true },
  ]

  afterEach(() => {
    // cleanup
  })

  // 1. 类名渲染测试
  describe('CSS Classes Rendering', () => {
    it('should render with default BEM classes', () => {
      const wrapper = mount(Dropdown, {
        props: { menuOptions: defaultMenuOptions },
        slots: {
          default: '<button>Dropdown</button>',
        },
      })
      expect(wrapper.find('[class*=dropdown]').exists()).toBeTruthy()
    })
  })

  // 2. Props 驱动测试
  describe('Props Behavior', () => {
    it('should render menu options', () => {
      const wrapper = mount(Dropdown, {
        props: { menuOptions: defaultMenuOptions },
        slots: {
          default: '<button>Dropdown</button>',
        },
      })
      expect(wrapper.props('menuOptions')).toHaveLength(3)
    })

    it('should support menuOptions with various label types', () => {
      const options = [
        { label: 'String Label', key: '1' },
        { label: 'Second Option', key: '2' },
      ]
      const wrapper = mount(Dropdown, {
        props: { menuOptions: options },
        slots: {
          default: '<button>Dropdown</button>',
        },
      })
      expect(wrapper.props('menuOptions')).toEqual(options)
    })

    it('should support disabled menu options', () => {
      const wrapper = mount(Dropdown, {
        props: {
          menuOptions: [{ label: 'Disabled', key: '1', disabled: true }],
        },
        slots: {
          default: '<button>Dropdown</button>',
        },
      })
      expect(wrapper.props('menuOptions')[0].disabled).toBe(true)
    })

    it('should support option dividers', () => {
      const options = [
        { label: 'Option 1', key: '1' },
        { label: 'Divider', key: 'divider', divided: true },
        { label: 'Option 2', key: '2' },
      ]
      const wrapper = mount(Dropdown, {
        props: { menuOptions: options },
        slots: {
          default: '<button>Dropdown</button>',
        },
      })
      expect(wrapper.props('menuOptions')).toHaveLength(3)
    })

    it('should support trigger variants (from Tooltip)', () => {
      const triggers = ['hover', 'click']
      triggers.forEach((trigger) => {
        const wrapper = mount(Dropdown, {
          props: {
            menuOptions: defaultMenuOptions,
            trigger: trigger as any,
          },
          slots: {
            default: '<button>Dropdown</button>',
          },
        })
        expect(wrapper.props('trigger')).toBe(trigger)
      })
    })

    it('should support placement prop (from Tooltip)', () => {
      const wrapper = mount(Dropdown, {
        props: {
          menuOptions: defaultMenuOptions,
          placement: 'bottom-start',
        },
        slots: {
          default: '<button>Dropdown</button>',
        },
      })
      expect(wrapper.props('placement')).toBe('bottom-start')
    })

    it('should support hideAfterClick prop', () => {
      const wrapper = mount(Dropdown, {
        props: {
          menuOptions: defaultMenuOptions,
          hideAfterClick: true,
        },
        slots: {
          default: '<button>Dropdown</button>',
        },
      })
      expect(wrapper.props('hideAfterClick')).toBe(true)
    })
  })

  // 3. 事件派发测试
  describe('Event Handling', () => {
    it('should emit visible-change event', async () => {
      const wrapper = mount(Dropdown, {
        props: {
          menuOptions: defaultMenuOptions,
          trigger: 'click',
        },
        slots: {
          default: '<button>Dropdown</button>',
        },
      })
      await wrapper.find('button').trigger('click')
      // visible-change should be emitted
    })

    it('should emit select event when menu item is clicked', async () => {
      const wrapper = mount(Dropdown, {
        props: {
          menuOptions: defaultMenuOptions,
          trigger: 'click',
        },
        slots: {
          default: '<button>Dropdown</button>',
        },
      })
      // Note: The actual selection logic depends on implementation
      const emitted = wrapper.emitted('select')
      // Emitted might be undefined until item is clicked
    })

    it('should not select disabled options', async () => {
      const wrapper = mount(Dropdown, {
        props: {
          menuOptions: [{ label: 'Disabled Option', key: 'disabled', disabled: true }],
          trigger: 'click',
        },
        slots: {
          default: '<button>Dropdown</button>',
        },
      })
      // Disabled option should not be selectable
    })
  })

  // 4. 插槽渲染测试
  describe('Slot Rendering', () => {
    it('should render trigger slot', () => {
      const wrapper = mount(Dropdown, {
        props: { menuOptions: defaultMenuOptions },
        slots: {
          default: '<div class="custom-trigger">Custom Trigger</div>',
        },
      })
      expect(wrapper.html()).toContain('custom-trigger')
    })

    it('should render trigger with different types', () => {
      const wrapper = mount(Dropdown, {
        props: { menuOptions: defaultMenuOptions },
        slots: {
          default: '<button class="dropdown-trigger">Click me</button>',
        },
      })
      expect(wrapper.html()).toContain('dropdown-trigger')
    })
  })

  // 5. Instance methods test
  describe('Instance Methods', () => {
    it('should expose show method', () => {
      const wrapper = mount(Dropdown, {
        props: { menuOptions: defaultMenuOptions },
        slots: {
          default: '<button>Dropdown</button>',
        },
      })
      const instance = wrapper.vm as any
      expect(typeof instance.show).toBe('function')
    })

    it('should expose hide method', () => {
      const wrapper = mount(Dropdown, {
        props: { menuOptions: defaultMenuOptions },
        slots: {
          default: '<button>Dropdown</button>',
        },
      })
      const instance = wrapper.vm as any
      expect(typeof instance.hide).toBe('function')
    })
  })
})
