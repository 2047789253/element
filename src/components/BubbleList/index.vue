<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useNamespace } from '../../hooks'
import { bubbleListProps } from './props'
import Bubble from '../Bubble/index.vue'

defineOptions({
  name: 'BubbleList',
})

defineProps({
  ...bubbleListProps,
})

// 新增：抛出触顶加载事件
const emits = defineEmits<{
  (e: 'load-more'): void
}>()

const ns = useNamespace('bubble-list')
const listRef = ref<HTMLElement | null>(null)
const isUserScrolling = ref(false)
let observer: MutationObserver | null = null

const handleScroll = () => {
  if (!listRef.value) return
  const { scrollTop, scrollHeight, clientHeight } = listRef.value

  // 1. 防打扰逻辑：距离底部 > 50px 视为用户在往上翻
  isUserScrolling.value = scrollHeight - scrollTop - clientHeight > 50

  // 2. 新增：触顶加载逻辑。当滚动条距离顶部小于等于 10px 时触发加载更多
  if (scrollTop <= 10) {
    emits('load-more')
  }
}

// 修改：增加 isInit 参数，区分“初始加载”和“持续打字”
const scrollToBottom = async (force = false, isInit = false) => {
  if (isUserScrolling.value && !force) return
  await nextTick()
  if (listRef.value) {
    // 核心优化：使用原生 scrollTo 精细控制滚动行为
    listRef.value.scrollTo({
      top: listRef.value.scrollHeight,
      // 如果是组件初次挂载，瞬间到底 ('auto')；否则平滑滚动 ('smooth')
      behavior: isInit ? 'auto' : 'smooth',
    })
  }
}

onMounted(() => {
  // 传入 true, true，代表：强制到底，且是初始加载（瞬间跳跃）
  scrollToBottom(true, true)

  if (listRef.value) {
    observer = new MutationObserver(() => scrollToBottom())
    observer.observe(listRef.value, {
      childList: true,
      subtree: true,
      characterData: true,
    })
  }
})

onBeforeUnmount(() => {
  if (observer) observer.disconnect()
})

// 暴露给父组件的方法也同步更新
defineExpose({
  scrollToBottom: () => scrollToBottom(true),
})
</script>

<template>
  <div ref="listRef" :class="ns.b()" @scroll="handleScroll">
    <div :class="ns.e('inner')">
      <div v-for="item in data" :key="item.id" :class="ns.e('item')">
        <slot name="item" :data="item">
          <Bubble
            :content="item.content"
            :typing="item.typing"
            :placement="item.role === 'user' ? 'end' : 'start'"
            :variant="item.role === 'user' ? 'filled' : 'outlined'"
            is-markdown
          />
        </slot>
      </div>
      <div v-if="loading" :class="ns.e('item')">
        <Bubble loading placement="start" variant="outlined" />
      </div>
    </div>
  </div>
</template>
