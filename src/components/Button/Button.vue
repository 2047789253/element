<script setup lang="ts">
import type { ButtonProps } from './types'
import { ref } from 'vue'
import Icon from '../Icon/Icon.vue'
import { useNamespace } from '@/hooks/useNamespace'

defineOptions({
  name: 'VkButton',
})

withDefaults(defineProps<ButtonProps>(), {
  type: 'primary',
  nativeType: 'button',
})

const _ref = ref<HTMLButtonElement | null>(null)
defineExpose({
  sonref: _ref,
})

// ✨ 使用 useNamespace Hook 生成类名
const ns = useNamespace('button')
</script>

<template>
  <button
    ref="_ref"
    :class="[
      ns.b(), // el-ai-button
      ns.m(type), // el-ai-button--primary
      ns.m(size), // el-ai-button--medium
      plain && ns.m('plain'), // el-ai-button--plain
      round && ns.m('round'), // el-ai-button--round
      circle && ns.m('circle'), // el-ai-button--circle
      ns.is('disabled', disabled), // is-disabled
      ns.is('loading', loading), // is-loading
    ]"
    :disabled="disabled || loading"
    :auto-focus="autoFocus"
    :type="nativeType"
  >
    <Icon icon="spinner" spin v-if="loading" />
    <Icon :icon="icon" v-if="icon" />
    <slot></slot>
  </button>
</template>
