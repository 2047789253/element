<template>
  <div :class="[ns.b(), ns.m(variant), ns.m(theme)]">
    <div :class="ns.e('content')">
      <textarea
        ref="inputRef"
        :class="ns.e('input')"
        :placeholder="placeholder"
        :value="modelValue"
        :disabled="disabled || loading"
        @input="(e) => emits('update:modelValue', (e.target as HTMLTextAreaElement).value)"
        @focus="emits('focus')"
        @blur="emits('blur')"
        @keydown.enter.ctrl="onSend"
      ></textarea>
    </div>
    <div :class="ns.e('action')">
      <div :class="ns.em('action', 'other')">
        <slot name="action-list"></slot>
      </div>
      <slot v-if="loading" name="send-btn-loading">
        <div :class="ns.e('loading')" @click="emits('update:loading', false)">
          <span>●</span>
        </div>
      </slot>
      <slot v-else name="send-btn" :disabled="isEmpty">
        <div :class="[ns.e('send-btn'), ns.is('disabled', isEmpty || disabled)]" @click="onSend">
          <span>↑</span>
        </div>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, useTemplateRef } from 'vue'
import type { PropType } from 'vue'
import { useNamespace } from '../../hooks'
import type { SenderEmitsType } from './props'
import { senderProps } from './props'

const ns = useNamespace('sender')

const props = defineProps({
  ...senderProps,
  variant: {
    type: String as PropType<'default' | 'updown'>,
    default: 'default',
  },
})

const emits = defineEmits<SenderEmitsType>()
const inputRef = useTemplateRef('inputRef')

const isEmpty = computed(() => {
  return !props.modelValue || props.modelValue.trim().length === 0
})

const onSend = () => {
  if (isEmpty.value || props.loading || props.disabled) return
  emits('send', props.modelValue)
  emits('update:modelValue', '')
}

defineExpose({
  focus: () => {
    inputRef.value?.focus()
  },
  clear: () => {
    emits('update:modelValue', '')
  },
})
</script>
