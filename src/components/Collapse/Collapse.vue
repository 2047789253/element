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
    // 手风琴模式：点击已展开的就收起，否则只展开当前项
    activeNames.value.length = 0 // 清空数组
    if (activeNames.value[0] !== item) {
      activeNames.value.push(item)
    }
  } else {
    // 普通模式
    const index = activeNames.value.indexOf(item)
    if (index > -1) {
      activeNames.value.splice(index, 1)
    } else {
      activeNames.value.push(item)
    }
  }
  // defineModel 会自动触发 update:modelValue，只需手动触发 change
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

<style scoped></style>
