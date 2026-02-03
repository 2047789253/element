<script setup lang="ts">
import type { NameType, CollapseEmits } from './types'
import { provide } from 'vue'
import { collapseContextKey } from './types'
defineOptions({
  name: 'VkCollapse',
})

// 使用 defineModel 自动处理 v-model
const activeNames = defineModel<NameType[]>({ default: () => [] })
// 定义其他 props
interface Props {
  accordion?: boolean
}
const props = defineProps<Props>()

// 定义 change 事件
const emits = defineEmits<CollapseEmits>()

if (props.accordion && activeNames.value.length > 1)
  console.warn('Accordion mode allows only one active item. The first item will be kept active.')

const handleItemClick = (item: NameType) => {
  if (props.accordion) {
    activeNames.value = activeNames.value.includes(item) ? [] : [item]
  } else {
    const index = activeNames.value.indexOf(item)
    if (index > -1) {
      // 使用 filter 创建新数组而不是 splice
      activeNames.value = activeNames.value.filter((_, i) => i !== index)
    } else {
      // 使用展开运算符创建新数组而不是 push
      activeNames.value = [...activeNames.value, item]
    }
  }
  emits('change', activeNames.value)
}
provide(collapseContextKey, {
  activeNames,
  handleItemClick,
})
</script>

<template>
  <div class="vk-collapse">
    <slot></slot>
  </div>
</template>
