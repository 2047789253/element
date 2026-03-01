<script setup lang="ts">
import { computed } from 'vue'
import type { SwitchProps, SwitchEmits } from './types'
defineOptions({
  name: 'VkSwitch',
  inheritAttrs: false,
})
const props = defineProps<SwitchProps>()
const emits = defineEmits<SwitchEmits>()
const innerValue = defineModel<boolean>()
//现在是否被选中
const checked = computed(() => innerValue.value)
const switchValue = () => {
  if (props.disabled) return
  innerValue.value = !innerValue.value
  emits('change', innerValue.value)
}
</script>

<template>
  <div
    class="vk-switch"
    :class="{
      [`vk-switch--${props.size}`]: props.size,
      'is-disabled': props.disabled,
      'is-checked': checked,
    }"
    @click="switchValue"
  >
    <input
      class="vk-switch__input"
      type="checkbox"
      role="switch"
      :name="props.name"
      :disabled="props.disabled"
    />
    <div class="vk-switch__core">
      <div class="vk-switch__core-action"></div>
    </div>
  </div>
</template>
