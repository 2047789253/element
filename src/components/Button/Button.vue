<script setup lang="ts">
import type { ButtonProps } from './types'
import { ref } from 'vue'
import Icon from '../Icon/Icon.vue'

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
      'is-loading': loading,
    }"
    :disabled="disabled || loading"
    :auto-focus="autoFocus"
    :type="nativeType"
  >
    <Icon icon="spinner" spin v-if="loading" />
    <Icon :icon="icon" v-if="icon" />
    <slot></slot>
  </button>
</template>

<style scoped></style>
