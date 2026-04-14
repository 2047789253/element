<template>
  <div
    :class="ns.b()"
    :style="{
      minHeight: placeholderHeight,
      opacity,
      '--el-ai-sender-editor-max-height': `${maxHeight}px`,
    }"
  >
    <slot v-if="inputTagVariant === 'default' || variant === 'default'" name="input-tag-prefix">
      <InputTagPrefix
        v-if="showInputTagPrefix && inputTagPrefixValue"
        :value="inputTagPrefixValue"
        @remove="closeInputTagPrefix"
      />
    </slot>

    <EditorContent :editor="editor" />
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'ElABaseInput',
})

import { ref, watch } from 'vue'
import type { EditorView } from 'prosemirror-view'
import { EditorContent, useEditor } from '@tiptap/vue-3'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import HardBreak from '@tiptap/extension-hard-break'
import History from '@tiptap/extension-history'
import Placeholder from '@tiptap/extension-placeholder'
import { useNamespace } from '../../../hooks'
import InputTagPrefix from './input-tag-prefix.vue'
import InputSlot from '../input-slot/index'
import SelectSlot from '../select-slot/index'
import {
  baseInputProps,
  type BaseInputEmitsType,
  type SenderCompatKeydownHandler,
  type SenderLegacyKeydownHandler,
} from './props'

const ns = useNamespace('base-sender-input')

const props = defineProps({
  ...baseInputProps,
})

const emits = defineEmits<BaseInputEmitsType>()

const placeholderHeight = ref('36px')
const opacity = ref(0)

const parseClipboardFiles = (event: ClipboardEvent) => {
  const items = event.clipboardData?.items
  const files: File[] = []

  if (!items) return files

  for (const item of items) {
    if (item.kind === 'file') {
      const file = item.getAsFile()
      if (file) files.push(file)
    }
  }

  return files
}

const handleKeyDown = (view: EditorView, event: KeyboardEvent) => {
  if (event.key === 'Backspace' && editor.value?.isEmpty && props.inputTagPrefixValue) {
    emits('update:showInputTagPrefix', false)
  }

  if (props.onHandleKeyDown) {
    if (props.onHandleKeyDown.length >= 2) {
      const result = (props.onHandleKeyDown as SenderCompatKeydownHandler)(view, event)
      if (typeof result === 'boolean') return result
    } else {
      ;(props.onHandleKeyDown as SenderLegacyKeydownHandler)(event)
    }

    if (event.defaultPrevented) return true
  }

  if (event.key === 'Enter' && !props.enterBreak) {
    if (event.shiftKey) {
      return false
    }

    emits('enterPressed')
    event.preventDefault()
    return true
  }

  return false
}

const editor = useEditor({
  content: '',
  editable: !props.disabled,
  extensions: [
    Document,
    Paragraph,
    Text,
    HardBreak,
    History,
    InputSlot,
    SelectSlot,
    Placeholder.configure({
      placeholder: () => props.placeholder,
      showOnlyWhenEditable: false,
    }),
    ...props.extensions,
  ],
  editorProps: {
    handleKeyDown,
    handlePaste: (_view, event) => {
      emits('paste', event)
      const files = parseClipboardFiles(event)
      if (files.length) {
        emits('pasteFile', files)
      }
      return false
    },
    attributes: {
      class: ns.e('editor'),
    },
  },
  onUpdate: ({ editor: currentEditor }) => {
    emits('update:modelValue', currentEditor.getHTML())
  },
  onCreate: ({ editor: currentEditor }) => {
    if (currentEditor.isEmpty) {
      placeholderHeight.value = '36px'
    }
    if (props.modelValue) {
      currentEditor.commands.setContent(props.modelValue, { emitUpdate: false })
    }
    opacity.value = 1
  },
  onFocus: () => emits('focus'),
  onBlur: () => emits('blur'),
})

const closeInputTagPrefix = () => {
  emits('update:showInputTagPrefix', false)
}

watch(
  () => props.disabled,
  (disabled) => {
    editor.value?.setEditable(!disabled)
  },
)

watch(
  () => props.placeholder,
  () => {
    if (!editor.value) return
    editor.value.view.dispatch(editor.value.state.tr)
  },
)

watch(
  () => props.modelValue,
  (newContent) => {
    if (!editor.value) return

    const currentHtml = editor.value.getHTML()
    const nextHtml = newContent || ''
    if (currentHtml === nextHtml) return

    editor.value.commands.setContent(nextHtml, { emitUpdate: false })
  },
)

defineExpose({
  editor,
})
</script>
