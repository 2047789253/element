<script setup lang="ts">
import { computed } from 'vue'
import type { SwitchProps, SwitchEmits, SwitchValueType } from './types'
import { useNamespace } from '@/hooks/useNamespace'
defineOptions({
  name: 'VkSwitch',
  inheritAttrs: false,
})
const props = withDefaults(defineProps<SwitchProps>(), {
  activeValue: true,
  inactiveValue: false,
})
const ns = useNamespace('switch')
const emits = defineEmits<SwitchEmits>()
const innerValue = defineModel<SwitchValueType>()
//现在是否被选中
const checked = computed(() => innerValue.value === props.activeValue)
const switchValue = () => {
  if (props.disabled) return
  const newVal = checked.value ? props.inactiveValue : props.activeValue
  innerValue.value = newVal
  emits('change', newVal)
}
</script>

<template>
  <div
    :class="[
      ns.b(),
      ns.m(props.size),
      ns.is('disabled', props.disabled),
      ns.is('checked', checked),
    ]"
    @click="switchValue"
    @keydown.enter="switchValue"
    @keydown.space.prevent="switchValue"
  >
    <input
      :class="ns.e('input')"
      type="checkbox"
      role="switch"
      :name="props.name"
      :disabled="props.disabled"
      :checked="checked"
    />
    <div :class="ns.e('core')">
      <div :class="ns.bem('core', 'inner')">
        <span v-if="activeText || inactiveText" :class="ns.bem('core', 'inner', 'text')">
          {{ checked ? props.activeText : props.inactiveText }}
        </span>
      </div>
      <div :class="ns.bem('core', 'action')"></div>
    </div>
  </div>
</template>
