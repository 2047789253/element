<template>
  <div ref="loadMoreTrigger">
    <slot>
      <div :class="ns.b()">
        <span :class="ns.e('dot')"></span>
        <span :class="ns.e('dot')"></span>
        <span :class="ns.e('dot')"></span>
      </div>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { useNamespace } from '../../hooks'
import { onUnmounted, useTemplateRef } from 'vue'

const ns = useNamespace('conversations-loading-dots')

const loadMoreTrigger = useTemplateRef('loadMoreTrigger')

const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
})

const emits = defineEmits(['next'])

let observer: IntersectionObserver | null = null

const setupObserver = () => {
  if (!loadMoreTrigger.value) return

  observer = new IntersectionObserver(
    (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0]
      if (entry && entry.isIntersecting) {
        if (props.loading) return
        emits('next')
      }
    },
    {
      threshold: 0,
    },
  )

  observer.observe(loadMoreTrigger.value)
}

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})

// Setup after mount
setTimeout(() => {
  setupObserver()
}, 0)
</script>
