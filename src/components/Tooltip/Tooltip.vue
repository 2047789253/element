<script lang="ts" setup>
import { ref, watch, onUnmounted, computed } from 'vue'
import { createPopper } from '@popperjs/core'
import type { Instance } from '@popperjs/core'
import debounce from 'lodash-es/debounce'
import type { TooltipProps, TooltipEmits, TooltipInstance } from './types'
import { useNamespace } from '@/hooks/useNamespace'
import useClickOutside from '@/hooks/useClickOutside'

defineOptions({
  name: 'VkTooltip',
})

const ns = useNamespace('tooltip')
const props = withDefaults(defineProps<TooltipProps>(), {
  placement: 'bottom',
  trigger: 'hover',
  transition: 'fade',
  openDelay: 0,
  closeDelay: 200, // 🔥 核心修复 1：增加默认延迟缓冲区
})
const emit = defineEmits<TooltipEmits>()

const isOpen = ref(false)
const popperNode = ref<HTMLElement>()
const triggerNode = ref<HTMLElement>()
const popperContainerNode = ref<HTMLElement>()
let popperInstance: Instance | null = null
const events = ref<Record<string, () => void>>({})
const outerEvents = ref<Record<string, () => void>>({})

const popperOptions = computed(() => ({
  placement: props.placement,
  modifiers: [{ name: 'offset', options: { offset: [0, 8] } }],
  ...props.popperOptions,
}))

const open = () => {
  isOpen.value = true
  emit('visible-change', true)
}
const close = () => {
  isOpen.value = false
  emit('visible-change', false)
}

const openDebounce = debounce(open, props.openDelay)
const closeDebounce = debounce(close, props.closeDelay)

const openFinal = () => {
  closeDebounce.cancel()
  openDebounce()
}
const closeFinal = () => {
  openDebounce.cancel()
  closeDebounce()
}

const togglePopper = () => {
  if (isOpen.value) {
    closeFinal()
  } else {
    openFinal()
  }
}

const destroyPopperInstance = () => {
  popperInstance?.destroy()
  popperInstance = null
}

useClickOutside(popperContainerNode, () => {
  if (props.trigger === 'click' && isOpen.value && !props.manual) {
    closeFinal()
  }
})

const attachEvents = () => {
  if (props.trigger === 'hover') {
    events.value.mouseenter = openFinal
    outerEvents.value.mouseleave = closeFinal
  } else if (props.trigger === 'click') {
    events.value['click'] = togglePopper
  }
}

if (!props.manual) attachEvents()

watch(
  () => props.manual,
  (isManual) => {
    events.value = {}
    outerEvents.value = {}
    if (!isManual) attachEvents()
  },
)

watch(
  () => props.trigger,
  (newTrigger, oldTrigger) => {
    if (newTrigger !== oldTrigger) {
      events.value = {}
      outerEvents.value = {}
      attachEvents()
    }
  },
)

watch(
  isOpen,
  (newVal) => {
    if (newVal) {
      if (triggerNode.value && popperNode.value) {
        popperInstance = createPopper(triggerNode.value, popperNode.value, popperOptions.value)
      }
    }
    // 注意：这里不再立即销毁 popperInstance，交给 Transition 钩子处理
  },
  { flush: 'post' },
)

onUnmounted(() => {
  popperInstance?.destroy()
})

defineExpose<TooltipInstance>({
  show: openFinal,
  hide: closeFinal,
})
</script>

<template>
  <div :class="ns.b()" ref="popperContainerNode" v-on="outerEvents">
    <div :class="ns.e('trigger')" ref="triggerNode" v-on="events">
      <slot></slot>
    </div>
    <transition :name="transition" @after-leave="destroyPopperInstance">
      <div v-if="isOpen" :class="ns.e('popper')" ref="popperNode">
        <slot name="content">
          {{ props.content }}
        </slot>
        <div :class="ns.e('arrow')" data-popper-arrow></div>
      </div>
    </transition>
  </div>
</template>
