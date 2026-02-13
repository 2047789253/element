<script setup lang="ts">
import type { MessageProps } from './types'
import RenderVnode from '../Common/RenderVnode.ts'
import Icon from '../Icon/Icon.vue'
import { getLastBottomOffset } from './method.ts'
import { ref, onMounted, watch, computed, nextTick, getCurrentInstance } from 'vue'
const props = withDefaults(defineProps<MessageProps>(), {
  type: 'info',
  duration: 3000,
  offset: 20,
})
const visible = ref(false)
const messageRef = ref<HTMLDivElement>()
const instance = getCurrentInstance()
console.log('inner instance', instance)
//计算偏移高度
//这个div高度
const height = ref(0)
//上一个实例的最下面的坐标数字
const lastOffset = computed(() => getLastBottomOffset())
//这个元素应该使用的top
const topOffset = computed(() => props.offset + lastOffset.value)
//为下一个元素预留offset
const bottomOffset = computed(() => topOffset.value + height.value)
const cssStyle = computed(() => ({
  top: topOffset.value + 'px',
}))
function startTimer() {
  if (props.duration === 0) return
  setTimeout(() => {
    visible.value = false
  }, props.duration)
}
onMounted(async () => {
  visible.value = true
  startTimer()
  await nextTick()
  height.value = messageRef.value!.getBoundingClientRect().height
})
watch(visible, (newVal) => {
  if (!newVal) {
    props.onDestroy()
  }
})
defineExpose({
  bottomOffset,
})
</script>

<template>
  <div
    class="vk-message"
    v-show="visible"
    role="alert"
    :class="{
      [`vk-message--${props.type}`]: props.type,
      'is-close': props.showClose,
    }"
    ref="messageRef"
    :style="cssStyle"
  >
    <div class="vk-message__content">
      <slot>
        <RenderVnode :vNode="props.message" v-if="props.message" />
      </slot>
    </div>
    <div class="vk-message__close" v-if="props.showClose">
      <Icon @click.stop="visible = false" icon="xmark" />
    </div>
  </div>
</template>

<style>
.vk-message {
  width: max-content;
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  border: 1px solid blue;
}
</style>
