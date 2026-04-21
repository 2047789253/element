<template>
  <div :class="[ns.b(), ns.m(variant), theme === 'dark' ? ns.m('dark') : '']">
    <slot v-if="variant === 'default'" name="prefix"></slot>

    <div :class="ns.e('content')">
<<<<<<< HEAD
      <BaseInput
        v-bind="props"
        ref="baseInputRef"
        @update:modelValue="(value) => !loading && emits('update:modelValue', value)"
        @update:showInputTagPrefix="(value) => emits('update:showInputTagPrefix', value)"
        @enterPressed="onEnterPressed"
        @paste="(event) => emits('paste', event)"
        @pasteFile="(files) => emits('pasteFile', files)"
=======
      <slot
        v-if="shouldShowInputTagPrefix && inputTagVariant === 'default'"
        name="input-tag-prefix"
      >
        <div :class="ns.e('input-tag-prefix')">
          <span :class="ns.e('input-tag-prefix-text')">{{ inputTagPrefixValue }}</span>
          <button
            type="button"
            :class="ns.e('input-tag-prefix-remove')"
            @click="emits('update:showInputTagPrefix', false)"
          >
            ×
          </button>
        </div>
      </slot>

      <textarea
        ref="inputRef"
        :class="[ns.e('input'), ns.is('disabled', disabled || loading)]"
        :placeholder="placeholder"
        v-model="modelValue"
        :disabled="disabled || loading"
        rows="1"
        style="resize: none; overflow-y: auto"
        @compositionstart="isComposing = true"
        @compositionend="onCompositionEnd"
        @keydown="handleKeydown"
        @paste="handlePaste"
        @focus="emits('focus')"
>>>>>>> a35bc07b87a9c8701f05d0a98d435c2492872e4d
        @blur="emits('blur')"
        @focus="emits('focus')"
      >
        <template #input-tag-prefix>
          <slot name="input-tag-prefix"></slot>
        </template>
      </BaseInput>
    </div>

    <div :class="ns.e('action')">
      <slot v-if="variant === 'updown' && inputTagVariant === 'updown'" name="input-tag-prefix">
        <InputTagUpdown
          v-if="showInputTagPrefix && inputTagPrefixValue"
          :value="inputTagPrefixValue"
          @remove="() => emits('update:showInputTagPrefix', false)"
        />
      </slot>

      <slot v-if="variant === 'updown'" name="prefix"></slot>

      <div :class="ns.em('action', 'other')">
        <slot name="action-list"></slot>
      </div>

      <slot v-if="loading" name="send-btn-loading">
        <div :class="ns.e('loading')" @click="emits('update:loading', false)">
          <span>■</span>
        </div>
      </slot>

      <slot v-else name="send-btn" :disabled="sendDisabled">
        <div :class="[ns.e('send-btn'), { disabled: sendDisabled }]" @click="onSend">
          <span>↑</span>
        </div>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'ElASender',
})

import { computed, provide, useTemplateRef } from 'vue'
import type { Editor } from '@tiptap/vue-3'
import { useNamespace } from '../../hooks'
import { SELECT_SLOT_CONTENT_INJECTION_KEY } from '../../constants'
import BaseInput from './base-input/index.vue'
import InputTagUpdown from './base-input/input-tag-updown.vue'
import type { BaseInputEmitsType } from './base-input/props'
import { senderProps, type SenderEmitsType, type SenderSlotsType } from './props'

const ns = useNamespace('sender')
const props = defineProps({
  ...senderProps,
})

<<<<<<< HEAD
const slots = defineSlots<SenderSlotsType>()
=======
const emits = defineEmits<SenderEmitsType>()
const modelValue = defineModel<string>({
  default: '',
})
defineSlots<SenderSlotsType>()
const inputRef = useTemplateRef<HTMLTextAreaElement>('inputRef')
>>>>>>> a35bc07b87a9c8701f05d0a98d435c2492872e4d

provide(SELECT_SLOT_CONTENT_INJECTION_KEY, slots['select-slot-content'])
provide('theme', props.theme)

const emits = defineEmits<BaseInputEmitsType & SenderEmitsType>()

const baseInputRef = useTemplateRef<{ editor?: Editor }>('baseInputRef')

const isEditorRef = (value: unknown): value is { value?: Editor } => {
  return (
    typeof value === 'object' && value !== null && 'value' in (value as Record<string, unknown>)
  )
}

const getEditor = (): Editor | undefined => {
  const editorRef = baseInputRef.value?.editor as unknown

  if (!editorRef) return undefined
  if (isEditorRef(editorRef)) {
    return editorRef.value
  }

  return editorRef as Editor
}

const isEmpty = computed(() => {
<<<<<<< HEAD
  return !getEditor()?.getText().trim()
=======
  return !modelValue.value || modelValue.value.trim().length === 0
>>>>>>> a35bc07b87a9c8701f05d0a98d435c2492872e4d
})

const sendDisabled = computed(() => {
  return isEmpty.value || props.disabled || props.loading
})

const onEnterPressed = () => {
  if (props.loading) return

<<<<<<< HEAD
  emits('enterPressed')
  onSend()
=======
const adjustHeight = async () => {
  await nextTick()
  if (!inputRef.value) return

  inputRef.value.style.height = 'auto'
  const scrollHeight = inputRef.value.scrollHeight
  inputRef.value.style.height = `${Math.min(scrollHeight, props.maxHeight)}px`
}

watch(modelValue, () => {
  adjustHeight()
})

onMounted(() => {
  adjustHeight()
})

const onCompositionEnd = () => {
  isComposing.value = false
}

const handleKeydown = (e: KeyboardEvent) => {
  if (isComposing.value) return

  props.onHandleKeyDown?.(e)
  if (e.defaultPrevented) return

  if (e.key === 'Enter' && !e.shiftKey && !props.enterBreak) {
    e.preventDefault()
    emits('enterPressed')
    onSend()
  }
}

const handlePaste = (event: ClipboardEvent) => {
  emits('paste', event)

  const files: File[] = []
  const clipboardItems = event.clipboardData?.items

  if (clipboardItems) {
    for (const item of clipboardItems) {
      if (item.kind === 'file') {
        const file = item.getAsFile()
        if (file) {
          files.push(file)
        }
      }
    }
  }

  if (files.length > 0) {
    emits('pasteFile', files)
  }
>>>>>>> a35bc07b87a9c8701f05d0a98d435c2492872e4d
}

const onSend = () => {
  const text = getEditor()?.getText() || ''
  if (!text.trim() || props.loading || props.disabled) return

<<<<<<< HEAD
  emits('send', text)
=======
  emits('send', modelValue.value)
  emits('update:modelValue', '')

  nextTick(() => {
    if (inputRef.value) {
      inputRef.value.style.height = 'auto'
    }
  })
>>>>>>> a35bc07b87a9c8701f05d0a98d435c2492872e4d
}

const focus = () => {
  getEditor()?.commands.focus()
}

const blur = () => {
  getEditor()?.commands.blur()
}

const clear = () => {
  getEditor()?.commands.setContent('', { emitUpdate: false })
  emits('update:modelValue', '')
}

defineExpose({
  editor: () => getEditor(),
  focus,
  blur,
  clear,
<<<<<<< HEAD
=======
  editor: () => ({
    getText: () => modelValue.value || '',
  }),
>>>>>>> a35bc07b87a9c8701f05d0a98d435c2492872e4d
})
</script>
