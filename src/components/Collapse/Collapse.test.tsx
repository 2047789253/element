import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Collapse from './Collapse.vue'
import Item from './CollapseItem.vue'

describe('Collapse.vue', () => {
  test('basic collapse', async () => {
    const wrapper = mount(
      () => (
        <Collapse modelValue={['a']}>
          <Item name="a" title="Title for item a">
            content a
          </Item>
          <Item name="b" title="Title for item b">
            content b
          </Item>
          <Item name="c" title="nice c" disabled>
            content c
          </Item>
        </Collapse>
      ),
      {
        global: {
          stubs: ['Icon'],
        },
        attachTo: document.body,
      },
    )
    const headers = wrapper.findAll('.vk-collapse-item__header')
    const contents = wrapper.findAll('.vk-collapse-item__wrapper')

    //长度
    expect(headers.length).toBe(3)
    expect(contents.length).toBe(3)

    //文本
    const firstHeader = headers[0]!
    expect(firstHeader.text()).toBe('Title for item a')

    //内容
    const firstContent = contents[0]!
    const secondContent = contents[1]!
    const disabledContent = contents[2]!
    expect(firstContent.isVisible()).toBe(true)
    expect(firstContent.text()).toBe('content a')
    expect(secondContent.isVisible()).toBe(false)

    //点击
    await firstHeader.trigger('click')
    expect(firstContent.isVisible()).toBe(false)
    await headers[1]!.trigger('click')
    expect(secondContent.isVisible()).toBe(true)

    //disabled
    const disableHeader = headers[2]!
    expect(disableHeader.classes()).toContain('is-disabled')
    await disableHeader.trigger('click')
    expect(disabledContent.isVisible()).toBe(false)
  })
})
