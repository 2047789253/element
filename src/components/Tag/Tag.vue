<script setup lang="ts">
import type { TagProps } from './types'

defineOptions({
  name: 'VkTag',
})

withDefaults(defineProps<TagProps>(), {
  type: 'primary',
})
</script>

<template>
  <span class="vk-tag" :class="`vk-tag--${type}`">
    <slot></slot>
  </span>
</template>
