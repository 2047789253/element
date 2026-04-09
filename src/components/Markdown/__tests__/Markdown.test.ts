import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Markdown from '../index.vue'

describe('Markdown', () => {
  it('should render code block with highlight container', () => {
    const wrapper = mount(Markdown, {
      props: { content: '```js\nconst x = 1\n```' },
    })

    expect(wrapper.find('.ela-code-block').exists()).toBe(true)
    expect(wrapper.find('code.hljs').exists()).toBe(true)
  })

  it('should render inline and block math with katex', () => {
    const wrapper = mount(Markdown, {
      props: {
        content: '行内公式 $E=mc^2$\n\n$$\n\\int_0^1 x^2\\,dx = \\frac{1}{3}\n$$',
      },
    })

    expect(wrapper.find('.katex').exists()).toBe(true)
    expect(wrapper.find('.katex-display').exists()).toBe(true)
  })
})
