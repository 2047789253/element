import { afterEach, describe, expect, it, vi } from 'vitest'
import { mount, type VueWrapper } from '@vue/test-utils'
import { nextTick } from 'vue'
import type { Editor } from '@tiptap/vue-3'
import Sender from '../index.vue'

const getEditorElement = (wrapper: VueWrapper<any>) => {
  return wrapper.find('.ProseMirror')
}

const getEditor = async (wrapper: VueWrapper<any>): Promise<Editor> => {
  await nextTick()
  await nextTick()
  const editor = wrapper.vm.editor()
  if (!editor) {
    throw new Error('Editor 尚未初始化')
  }
  return editor
}

describe('Sender', () => {
  let wrapper: VueWrapper<any> | null = null

  afterEach(() => {
    wrapper?.unmount()
    wrapper = null
    vi.restoreAllMocks()
  })

  it('应该渲染默认 BEM 类名', async () => {
    wrapper = mount(Sender)
    await getEditor(wrapper)

    expect(wrapper.classes()).toContain('el-ai-sender')
    expect(wrapper.find('.el-ai-sender__content').exists()).toBe(true)
    expect(wrapper.find('.el-ai-base-sender-input').exists()).toBe(true)
    expect(wrapper.find('.el-ai-sender__send-btn').exists()).toBe(true)
    expect(getEditorElement(wrapper).exists()).toBe(true)
  })

  it('应该根据 variant 渲染修饰类并支持 prefix 插槽', async () => {
    wrapper = mount(Sender, {
      props: {
        variant: 'updown',
      },
      slots: {
        prefix: '<div class="prefix-slot">Prefix</div>',
      },
    })

    await nextTick()

    expect(wrapper.classes()).toContain('el-ai-sender--updown')
    expect(wrapper.find('.prefix-slot').exists()).toBe(true)
  })

  it('应该在 disabled 或 loading 下阻止发送', async () => {
    wrapper = mount(Sender, {
      props: {
        disabled: true,
      },
    })

    const editor = await getEditor(wrapper)
    editor.commands.setContent('hello')
    await nextTick()

    await wrapper.find('.el-ai-sender__send-btn').trigger('click')
    expect(wrapper.emitted('send')).toBeFalsy()

    await wrapper.setProps({ disabled: false, loading: true })
    await nextTick()

    expect(wrapper.find('.el-ai-sender__send-btn').exists()).toBe(false)
    await wrapper.find('.el-ai-sender__loading').trigger('click')
    expect(wrapper.emitted('update:loading')).toEqual([[false]])
    expect(wrapper.emitted('send')).toBeFalsy()
  })

  it('应该在编辑器内容变化时触发 update:modelValue', async () => {
    wrapper = mount(Sender, {
      props: {
        modelValue: '',
      },
    })

    const editor = await getEditor(wrapper)
    editor.commands.setContent('new message')
    await nextTick()

    const updateEvents = wrapper.emitted('update:modelValue')
    expect(updateEvents).toBeTruthy()
    expect(updateEvents?.at(-1)).toEqual(['<p>new message</p>'])
  })

  it('应该在 Enter 发送并触发 enterPressed', async () => {
    wrapper = mount(Sender)

    const editor = await getEditor(wrapper)
    editor.commands.setContent('hello')
    await nextTick()

    await getEditorElement(wrapper).trigger('keydown', { key: 'Enter' })

    expect(wrapper.emitted('enterPressed')).toHaveLength(1)
    expect(wrapper.emitted('send')).toEqual([['hello']])
  })

  it('应该在 enterBreak=true 时允许换行而不触发发送', async () => {
    wrapper = mount(Sender, {
      props: {
        enterBreak: true,
      },
    })

    const editor = await getEditor(wrapper)
    editor.commands.setContent('hello')
    await nextTick()

    await getEditorElement(wrapper).trigger('keydown', { key: 'Enter' })

    expect(wrapper.emitted('enterPressed')).toBeFalsy()
    expect(wrapper.emitted('send')).toBeFalsy()
  })

  it('应该支持 onHandleKeyDown(event) 拦截发送', async () => {
    const onHandleKeyDown = vi.fn((event: KeyboardEvent) => {
      event.preventDefault()
    })

    wrapper = mount(Sender, {
      props: {
        onHandleKeyDown,
      },
    })

    const editor = await getEditor(wrapper)
    editor.commands.setContent('hello')
    await nextTick()

    await getEditorElement(wrapper).trigger('keydown', { key: 'Enter' })

    expect(onHandleKeyDown).toHaveBeenCalledTimes(1)
    expect(wrapper.emitted('send')).toBeFalsy()
    expect(wrapper.emitted('enterPressed')).toBeFalsy()
  })

  it('应该兼容 onHandleKeyDown(view, event) 双参数签名', async () => {
    const onHandleKeyDown = vi.fn((view: any, event: KeyboardEvent) => {
      expect(typeof view?.dispatch).toBe('function')
      expect(event.key).toBe('Enter')
      event.preventDefault()
    })

    wrapper = mount(Sender, {
      props: {
        onHandleKeyDown,
      },
    })

    const editor = await getEditor(wrapper)
    editor.commands.setContent('hello')
    await nextTick()

    await getEditorElement(wrapper).trigger('keydown', { key: 'Enter' })

    expect(onHandleKeyDown).toHaveBeenCalledTimes(1)
    expect(wrapper.emitted('send')).toBeFalsy()
    expect(wrapper.emitted('enterPressed')).toBeFalsy()
  })

  it('应该在粘贴文件时触发 paste 与 pasteFile 事件', async () => {
    const file = new File(['demo'], 'demo.txt', { type: 'text/plain' })
    const clipboardData = {
      getData: () => '',
      items: [
        {
          kind: 'file',
          getAsFile: () => file,
        },
      ],
    }

    wrapper = mount(Sender)
    await getEditor(wrapper)
    await getEditorElement(wrapper).trigger('paste', { clipboardData } as any)

    expect(wrapper.emitted('paste')).toHaveLength(1)
    const pasteFileEvents = wrapper.emitted('pasteFile')
    expect(pasteFileEvents).toHaveLength(1)
    expect((pasteFileEvents?.[0]?.[0] as File[])[0].name).toBe('demo.txt')
  })

  it('应该渲染 input-tag-prefix 并在点击移除后触发更新事件', async () => {
    wrapper = mount(Sender, {
      props: {
        showInputTagPrefix: true,
        inputTagPrefixValue: 'DeepSeek-R1',
      },
    })

    await nextTick()

    const prefix = wrapper.find('.el-ai-input-tag-prefix')
    expect(prefix.exists()).toBe(true)
    expect(prefix.text()).toContain('DeepSeek-R1')

    await wrapper.find('.el-ai-input-tag-prefix__content--remove').trigger('click')
    expect(wrapper.emitted('update:showInputTagPrefix')).toEqual([[false]])
  })

  it('应该在 updown 模式渲染 input-tag-updown', async () => {
    wrapper = mount(Sender, {
      props: {
        variant: 'updown',
        inputTagVariant: 'updown',
        showInputTagPrefix: true,
        inputTagPrefixValue: 'Model',
      },
    })

    await nextTick()

    expect(wrapper.find('.el-ai-input-tag-updown').exists()).toBe(true)
  })

  it('应该支持 action-list / send-btn / send-btn-loading 插槽', async () => {
    wrapper = mount(Sender, {
      slots: {
        'action-list': '<button class="custom-action">Action</button>',
        'send-btn': '<button class="custom-send">Send</button>',
        'send-btn-loading': '<div class="custom-loading">Loading</div>',
      },
    })

    await nextTick()

    expect(wrapper.find('.custom-action').exists()).toBe(true)
    expect(wrapper.find('.custom-send').exists()).toBe(true)

    await wrapper.setProps({ loading: true })
    await nextTick()

    expect(wrapper.find('.custom-loading').exists()).toBe(true)
  })

  it('应该暴露 focus / blur / clear / editor API', async () => {
    wrapper = mount(Sender)

    const editor = await getEditor(wrapper)
    editor.commands.setContent('Hello world')
    await nextTick()

    expect(typeof wrapper.vm.focus).toBe('function')
    expect(typeof wrapper.vm.blur).toBe('function')
    expect(typeof wrapper.vm.clear).toBe('function')
    expect(typeof wrapper.vm.editor).toBe('function')

    wrapper.vm.focus()
    await nextTick()

    wrapper.vm.blur()
    await nextTick()

    wrapper.vm.clear()
    await nextTick()

    expect(wrapper.vm.editor()?.getText()).toBe('')
    expect(wrapper.emitted('update:modelValue')).toContainEqual([''])
  })

  it('应该触发 focus 与 blur 事件', async () => {
    wrapper = mount(Sender)

    await getEditor(wrapper)
    await getEditorElement(wrapper).trigger('focus')
    await getEditorElement(wrapper).trigger('blur')

    expect(wrapper.emitted('focus')).toHaveLength(1)
    expect(wrapper.emitted('blur')).toHaveLength(1)
  })

  it('应该在空内容时禁用发送按钮', async () => {
    wrapper = mount(Sender)
    await nextTick()

    const sendBtn = wrapper.find('.el-ai-sender__send-btn')
    expect(sendBtn.classes()).toContain('disabled')

    await sendBtn.trigger('click')
    expect(wrapper.emitted('send')).toBeFalsy()
  })
})
