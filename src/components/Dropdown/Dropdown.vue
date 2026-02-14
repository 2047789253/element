<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import type { DropdownProps, DropdownEmits, DropdownInstance, MenuOption } from './types'
import Tooltip from '@/components/Tooltip/Tooltip.vue'
import RenderVnode from '@/components/Common/RenderVnode'
import type { TooltipInstance } from '@/components/Tooltip/types'
const props = withDefaults(defineProps<DropdownProps>(), { hideAfterClick: true })
const emit = defineEmits<DropdownEmits>()
const tooltipRef = ref() as Ref<TooltipInstance>
const visibleChange = (e: boolean) => {
  emit('visible-change', e)
}
const itemClick = (e: MenuOption) => {
  if (e.disabled) {
    return
  }
  emit('select', e)
  if (props.hideAfterClick) {
    tooltipRef.value.hide()
  }
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
          <template v-for="item in props.menuOptions" :key="item.key">
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
              <RenderVnode :vNode="item.label" />
            </li>
          </template>
        </ul>
      </template>
    </Tooltip>
  </div>
</template>

<style scoped>
.vk-dropdown_menu {
  margin: 0;
  padding: 0;
  list-style: none;
}

.vk-dropdown__item {
  white-space: nowrap;
}
</style>
