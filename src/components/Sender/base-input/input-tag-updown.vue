<template>
  <div :class="ns.b()" @click="onRemove">
    <div :class="ns.e('wrapper')">
      {{ value }}
    </div>
    <div :class="ns.e('remove')">
      <span :class="ns.em('remove', 'icon')" @click.stop="onRemove">x</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useNamespace } from '../../../hooks'

const ns = useNamespace('input-tag-updown')

defineProps({
  value: {
    type: String,
    default: '',
  },
})

const emits = defineEmits<{
  (e: 'remove'): void
}>()

const onRemove = () => {
  emits('remove')
}
</script>
