<template>
  <div :class="ns.b()" @click="onRemove">
    <div :class="ns.e('wrapper')">
      <div :class="ns.em('wrapper', 'content')">
        {{ value }}
        <span :class="ns.em('content', 'remove')" @click.stop="onRemove">x</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useNamespace } from '../../../hooks'

const ns = useNamespace('input-tag-prefix')

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
