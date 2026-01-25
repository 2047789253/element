<script setup lang="ts">
// Vue 3.3+ 新写法：直接在这里定义名字
defineOptions({
  name: 'VkButton',
})

import type { ButtonProps } from './types'
withDefaults(defineProps<ButtonProps>(), {
  nativeType: 'button',
})

import { ref } from 'vue'
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
