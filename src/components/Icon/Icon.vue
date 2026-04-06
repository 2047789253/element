<script setup lang="ts">
import { computed } from 'vue'
import { omit } from 'lodash-es'
import type { IconProps } from './types'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useNamespace } from '@/hooks/useNamespace'
defineOptions({
  name: 'VkIcon',
  inheritAttrs: false,
})
const props = defineProps<IconProps>()
const ns = useNamespace('icon')
const filteredProps = computed(() => omit(props, ['type', 'color']))
const customStyles = computed(() => {
  return props.color ? { color: props.color } : {}
})
</script>

<template>
  <i :class="[ns.b(), ns.m(props.type)]" :style="customStyles" v-bind="$attrs">
    <font-awesome-icon v-bind="filteredProps" />
  </i>
</template>
