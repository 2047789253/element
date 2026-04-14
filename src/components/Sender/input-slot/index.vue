<template>
  <NodeViewWrapper as="span" :class="ns.b()" :style="{ minWidth }">
    <span
      v-if="isEmpty"
      ref="placeholderRef"
      :data-placeholder="true"
      contenteditable="false"
      :class="ns.e('placeholder')"
    >
      {{ placeholder }}
    </span>
    <NodeViewContent as="span" :class="ns.e('content')" />
  </NodeViewWrapper>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, watchEffect } from 'vue'
import type { NodeViewProps } from '@tiptap/vue-3'
import { NodeViewWrapper, NodeViewContent } from '@tiptap/vue-3'
import { useNamespace } from '../../../hooks'
import { strings } from '../../../constants'

const ns = useNamespace('input-slot')
const props = defineProps<NodeViewProps>()

const placeholder = computed(() => {
  return props.node.attrs.placeholder || ''
})

const isEmpty = computed(() => {
  return !props.node.textContent || props.node.textContent === strings.ZERO_WIDTH_CHAR
})

const placeholderRef = ref<HTMLElement | null>(null)
const placeholderWidth = ref<number | undefined>(undefined)

const minWidth = computed(() => {
  return isEmpty.value && placeholderWidth.value ? `${placeholderWidth.value}px` : undefined
})

watchEffect(async () => {
  if (isEmpty.value && placeholderRef.value && placeholder.value) {
    await nextTick()
    placeholderWidth.value = placeholderRef.value?.offsetWidth
  }
})
</script>
