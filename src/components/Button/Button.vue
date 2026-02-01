<script setup lang="ts">
import type { ButtonProps } from './types'
import { ref } from 'vue'

defineOptions({
  name: 'VkButton',
})

withDefaults(defineProps<ButtonProps>(), {
  nativeType: 'button',
})

const _ref = ref<HTMLButtonElement | null>(null)
defineExpose({
  sonref: _ref,
})
</script>

<template>
  <button
    ref="_ref"
    class="vk-button"
    :class="{
      [`vk-button--${type}`]: type,
      [`vk-button--${size}`]: size,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle,
      'is-disabled': disabled,
    }"
    :disabled="disabled"
    :auto-focus="autoFocus"
    :type="nativeType"
  >
    <slot></slot>
  </button>
</template>

<style scoped></style>
