<script setup lang="ts">
import type { TagProps } from './types'
import { useNamespace } from '@/hooks'

defineOptions({
  name: 'VkTag',
})

const props = withDefaults(defineProps<TagProps>(), {
  type: 'primary',
})

const ns = useNamespace('tag')
</script>

<template>
  <span :class="[ns.b(), ns.m(type)]">
    <slot></slot>
  </span>
</template>
