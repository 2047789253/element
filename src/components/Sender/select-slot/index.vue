<template>
  <NodeViewWrapper ref="rootRef" :class="ns.b()">
    <button
      type="button"
      :class="ns.e('select-wap')"
      :aria-expanded="visible"
      @click.stop="toggleVisible"
      @keydown.enter.prevent.stop="toggleVisible"
      @keydown.space.prevent.stop="toggleVisible"
      @keydown.esc.prevent.stop="hide"
    >
      <span :class="ns.e('label')">{{ label }}</span>
      <span :class="ns.e('select-icon')">v</span>
    </button>

    <div v-if="visible" :class="ns.e('options-panel')" @click.stop>
      <component
        :is="selectSlotContent"
        v-if="selectSlotContent"
        :options="options"
        :theme="theme"
        :select-value="selectValue"
        :on-select="handleChange"
        :close="hide"
      />
      <div v-else :class="ns.e('options-wap')">
        <div v-if="!options.length" :class="ns.em('options-wap', 'empty')">暂无可选项</div>
        <div
          v-for="option in options"
          :key="option.value"
          :class="[
            ns.em('options-wap', 'option-item'),
            ns.is('active', option.value === selectValue),
          ]"
          @click="handleChange(option.value)"
        >
          <span>{{ option.label }}</span>
          <span v-if="option.value === selectValue" :class="ns.em('options-wap', 'icon')">ok</span>
        </div>
      </div>
    </div>
  </NodeViewWrapper>
</template>

<script setup lang="ts">
import { computed, inject, onMounted, onUnmounted, ref } from 'vue'
import type { NodeViewProps } from '@tiptap/vue-3'
import { NodeViewWrapper } from '@tiptap/vue-3'
import { useNamespace } from '../../../hooks'
import { SELECT_SLOT_CONTENT_INJECTION_KEY } from '../../../constants'
import type { SenderSelectOption } from '../props'

const props = defineProps<NodeViewProps>()
const ns = useNamespace('select-slot')
const visible = ref(false)
const rootRef = ref<HTMLElement | null>(null)

const selectSlotContent = inject(SELECT_SLOT_CONTENT_INJECTION_KEY, null)
const theme = inject<'light' | 'dark'>('theme', 'light')

const options = computed<SenderSelectOption[]>(() => {
  try {
    return JSON.parse(props.node.attrs.options || '[]')
  } catch {
    return []
  }
})

const selectValue = computed(() => {
  return props.node.attrs.value
})

const label = computed(() => {
  return (
    options.value.find((item) => item.value === selectValue.value)?.label ||
    options.value[0]?.label ||
    ''
  )
})

const toggleVisible = () => {
  visible.value = !visible.value
}

const hide = () => {
  visible.value = false
}

const handleChange = (value: string) => {
  visible.value = false
  props.updateAttributes({ value })
}

const handleDocumentClick = (event: MouseEvent) => {
  const target = event.target as Node | null
  if (rootRef.value && target && !rootRef.value.contains(target)) {
    visible.value = false
  }
}

const handleDocumentKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    hide()
  }
}

onMounted(() => {
  document.addEventListener('click', handleDocumentClick)
  document.addEventListener('keydown', handleDocumentKeydown)
})

onUnmounted(() => {
  document.removeEventListener('click', handleDocumentClick)
  document.removeEventListener('keydown', handleDocumentKeydown)
})
</script>
