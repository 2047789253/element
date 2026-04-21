<script setup lang="ts">
import { ref } from 'vue'
import Conversations from '@/components/Conversations/index.vue'

const seed = ref(6)
const sessions = ref([
  '需求评审：Sender 行为收敛',
  '设计讨论：BubbleList 滚动体验',
  '文档更新：Markdown 插槽能力',
  '性能测试：CodeHighlight 大片段渲染',
  '回归验证：Switch 基础交互',
])

const loadMore = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  sessions.value.unshift(`历史会话 #${seed.value++}`)
}
</script>

<template>
  <div class="conversation-demo">
    <Conversations theme="light" :has-more="true" :on-next="loadMore">
      <template #header>
        <div class="conversation-demo__header">项目会话</div>
      </template>

      <template #scroll>
        <ul class="conversation-demo__list">
          <li v-for="item in sessions" :key="item">{{ item }}</li>
        </ul>
      </template>

      <template #footer>
        <div class="conversation-demo__footer">共 {{ sessions.length }} 条</div>
      </template>
    </Conversations>
  </div>
</template>

<style scoped>
.conversation-demo {
  height: 360px;
  border: 1px solid var(--el-ai-border-color-light);
  border-radius: 10px;
  overflow: hidden;
}

.conversation-demo__header,
.conversation-demo__footer {
  height: 48px;
  display: flex;
  align-items: center;
  padding: 0 12px;
  font-size: 13px;
  color: var(--el-ai-text-color-secondary);
}

.conversation-demo__list {
  margin: 0;
  padding: 10px;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.conversation-demo__list li {
  padding: 10px;
  border: 1px solid var(--el-ai-border-color-light);
  border-radius: 8px;
  background: var(--el-ai-bg-color);
  color: var(--el-ai-text-color-regular);
  font-size: 13px;
}
</style>
