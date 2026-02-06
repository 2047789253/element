<script lang="ts" setup>
import { ref, watch, onUnmounted, computed } from 'vue'
import { createPopper } from '@popperjs/core'
import type { Instance } from '@popperjs/core'
import debounce from 'lodash-es/debounce'
import type { TooltipProps, TooltipEmits, TooltipInstance } from './types'
import useClickOutside from '@/hooks/useClickOutside'
const props = withDefaults(defineProps<TooltipProps>(), {
  placement: 'bottom',
  trigger: 'hover',
  transition: 'fade',
  openDelay: 0,
  closeDelay: 0,
})
const emit = defineEmits<TooltipEmits>()
const isOpen = ref(false)
const popperNode = ref<HTMLElement>()
const triggerNode = ref<HTMLElement>()
const popperContainerNode = ref<HTMLElement>()
let popperInstance: Instance | null = null
const events = ref<Record<string, () => void>>({})
const outerEvents = ref<Record<string, () => void>>({})
let openTimes = 0
let closeTimes = 0

const popperOptions = computed(() => {
  return {
    placement: props.placement,
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 8],
        },
      },
    ],
    ...props.popperOptions,
  }
})

const open = () => {
  openTimes++
  console.log('open times:', openTimes)
  isOpen.value = true
  emit('visible-change', true)
}

const close = () => {
  closeTimes++
  console.log('close times:', closeTimes)
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

useClickOutside(popperContainerNode, () => {
  if (props.trigger === 'click' && isOpen.value && !props.manual) {
    closeFinal()
  }
})

const attachEvents = () => {
  if (props.trigger === 'hover') {
    // events.value['mouseenter'] = open
    events.value.mouseenter = openFinal
    // outerEvents.value['mouseleave'] = close
    outerEvents.value.mouseleave = closeFinal
  } else if (props.trigger === 'click') {
    events.value['click'] = togglePopper
  }
}

if (!props.manual) {
  attachEvents()
}
attachEvents()

watch(
  () => props.manual,
  (isManual) => {
    if (isManual) {
      events.value = {}
      outerEvents.value = {}
    } else {
      attachEvents()
    }
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
    } else {
      popperInstance?.destroy()
    }
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
  <div class="vk-tooltip" ref="popperContainerNode" v-on="outerEvents">
    <div class="vk-tooltip__trigger" ref="triggerNode" v-on="events">
      <slot></slot>
    </div>
    <transition :name="transition">
      <div v-if="isOpen" class="vk-tooltip__popper" ref="popperNode">
        <slot name="content">
          {{ props.content }}
        </slot>
        <div id="arrow" data-popper-arrow></div>
      </div>
    </transition>
  </div>
</template>
