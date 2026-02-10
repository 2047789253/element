<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import type { DropdownProps, DropdownEmits, DropdownInstance, menuOption } from './types'
import Tooltip from '@/components/Tooltip/Tooltip.vue'
import type { TooltipInstance } from '@/components/Tooltip/types'
const props = defineProps<DropdownProps>()
const emit = defineEmits<DropdownEmits>()
const tooltipRef = ref() as Ref<TooltipInstance>
const visibleChange = (e: boolean) => {
  emit('visible-change', e)
}
const itemClick = (e: menuOption) => {
  if (e.disabled) {
    return
  }
  emit('select', e)
}

// 定义 show 和 hide 方法，它们会调用内部 Tooltip 的相应方法
const show = () => {
  tooltipRef.value?.show()
}
const hide = () => {
  tooltipRef.value?.hide()
}
// 暴露这些方法给父组件
defineExpose<DropdownInstance>({
  show,
  hide,
})
</script>

<template>
  <div class="vk-dropdown">
    <Tooltip
      :trigger="props.trigger"
      :placement="props.placement"
      :popper-options="props.popperOptions"
      :open-delay="props.openDelay"
      :close-delay="props.closeDelay"
      @visible-change="visibleChange"
      ref="tooltipRef"
    >
      <slot />
      <template #content>
        <ul class="vk-dropdown_menu">
          <template v-for="item in menuOptions" :key="item.key">
            <li v-if="item.divided" role="separator" class="divided-placeholder"></li>
            <li
              class="vk-dropdown__item"
              :class="{
                'is-divided': item.divided,
                'is-disabled': item.disabled,
              }"
              :id="`dropdown-item-${item.key}`"
              @click="itemClick(item)"
            >
              {{ item.label }}
            </li>
          </template>
        </ul>
      </template>
    </Tooltip>
  </div>
</template>
