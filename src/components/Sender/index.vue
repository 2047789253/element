<template>
  <div :class="[ns.b(), ns.m(variant), theme ? ns.m(theme) : '']">
    <slot v-if="variant === 'default'" name="prefix"></slot>

    <div :class="ns.e('content')">
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
        @blur="emits('blur')"
      ></textarea>
    </div>

    <div :class="ns.e('action')">
      <slot
        v-if="variant === 'updown' && inputTagVariant === 'updown' && shouldShowInputTagPrefix"
        name="input-tag-prefix"
      >
        <div :class="[ns.e('input-tag-prefix'), ns.em('input-tag-prefix', 'updown')]">
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

      <slot v-if="variant === 'updown'" name="prefix"></slot>

      <div :class="ns.em('action', 'other')">
        <slot name="action-list"></slot>
      </div>

      <slot v-if="loading" name="send-btn-loading">
        <div :class="ns.e('loading')" @click="emits('update:loading', false)">
          <span>●</span>
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
import { computed, useTemplateRef, ref, nextTick, watch, onMounted } from 'vue'
import { useNamespace } from '../../hooks'
import type { SenderEmitsType, SenderSlotsType } from './props'
import { senderProps } from './props'

const ns = useNamespace('sender')
const props = defineProps({
  ...senderProps,
})

const emits = defineEmits<SenderEmitsType>()
const modelValue = defineModel<string>({
  default: '',
})
defineSlots<SenderSlotsType>()
const inputRef = useTemplateRef<HTMLTextAreaElement>('inputRef')

const isComposing = ref(false)

const isEmpty = computed(() => {
  return !modelValue.value || modelValue.value.trim().length === 0
})

const sendDisabled = computed(() => {
  return isEmpty.value || props.loading || props.disabled
})

const shouldShowInputTagPrefix = computed(() => {
  return props.showInputTagPrefix && !!props.inputTagPrefixValue
})

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
}

const onSend = () => {
  if (sendDisabled.value) return

  emits('send', modelValue.value)
  emits('update:modelValue', '')

  nextTick(() => {
    if (inputRef.value) {
      inputRef.value.style.height = 'auto'
    }
  })
}

const focus = () => {
  inputRef.value?.focus()
}

const blur = () => {
  inputRef.value?.blur()
}

const clear = () => {
  emits('update:modelValue', '')
  nextTick(() => {
    if (inputRef.value) inputRef.value.style.height = 'auto'
  })
}

defineExpose({
  focus,
  blur,
  clear,
  editor: () => ({
    getText: () => modelValue.value || '',
  }),
})
</script>
