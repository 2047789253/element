<template>
  <div :class="[ns.b(), ns.m(variant), theme === 'dark' ? ns.m('dark') : '']">
    <slot v-if="variant === 'default'" name="prefix"></slot>

    <div :class="ns.e('content')">
      <BaseInput
        v-bind="props"
        ref="baseInputRef"
        @update:modelValue="(value) => !loading && emits('update:modelValue', value)"
        @update:showInputTagPrefix="(value) => emits('update:showInputTagPrefix', value)"
        @enterPressed="onEnterPressed"
        @paste="(event) => emits('paste', event)"
        @pasteFile="(files) => emits('pasteFile', files)"
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

const slots = defineSlots<SenderSlotsType>()

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
  return !getEditor()?.getText().trim()
})

const sendDisabled = computed(() => {
  return isEmpty.value || props.disabled || props.loading
})

const onEnterPressed = () => {
  if (props.loading) return

  emits('enterPressed')
  onSend()
}

const onSend = () => {
  const text = getEditor()?.getText() || ''
  if (!text.trim() || props.loading || props.disabled) return

  emits('send', text)
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
})
</script>
