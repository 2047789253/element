<script setup lang="ts">
import type { InputProps } from './types'
defineOptions({ name: 'VkInput' })
withDefaults(defineProps<InputProps>(), {
  type: 'text',
})
</script>

<template>
  <div
    class="vk-input"
    :class="{
      [`vk-input--${type}`]: type,
      [`vk-input--${size}`]: size,
      'is-disabled': disabled,
    }"
  ></div>
</template>
