<script setup lang="ts">
import { ref } from 'vue'
import BubbleList from '@/components/BubbleList/index.vue'
import type { MessageItem } from '@/components/BubbleList/props'

const seed = ref(10)
const loading = ref(false)
const messages = ref<MessageItem[]>([
  {
    id: 1,
    role: 'assistant',
    content: '你好，我是助手消息。向上滚动触顶会触发 load-more。',
  },
  {
    id: 2,
    role: 'user',
    content: '收到，我先看下自动滚动和底部操作。',
  },
  {
    id: 3,
    role: 'assistant',
    typing: true,
    content: '这是一条 typing 演示消息。',
  },
])

const append = () => {
  messages.value.push({
    id: seed.value++,
    role: seed.value % 2 === 0 ? 'assistant' : 'user',
    content: `新增消息 #${seed.value}`,
    typing: false,
  })
}

const onLoadMore = () => {
  loading.value = true
  setTimeout(() => {
    messages.value.unshift({
      id: seed.value++,
      role: 'assistant',
      content: '这是触顶后加载的历史消息。',
    })
    loading.value = false
  }, 600)
}
</script>

<template>
  <div class="bubble-list-demo">
    <div class="bubble-list-demo__toolbar">
      <button class="bubble-list-demo__btn" type="button" @click="append">追加消息</button>
    </div>

    <BubbleList
      :data="messages"
      :loading="loading"
      :top-load-threshold="20"
      @load-more="onLoadMore"
    />
  </div>
</template>

<style scoped>
.bubble-list-demo {
  border: 1px solid var(--el-ai-border-color-light);
  border-radius: 10px;
  overflow: hidden;
}

.bubble-list-demo .el-ai-bubble-list {
  height: 320px;
}

.bubble-list-demo__toolbar {
  padding: 8px;
  border-bottom: 1px solid var(--el-ai-border-color-light);
  background: var(--el-ai-fill-color);
}

.bubble-list-demo__btn {
  border: 1px solid var(--el-ai-border-color);
  background: var(--el-ai-bg-color);
  color: var(--el-ai-text-color-regular);
  border-radius: 6px;
  padding: 4px 10px;
  cursor: pointer;
}
</style>
