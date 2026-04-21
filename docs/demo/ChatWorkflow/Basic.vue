<script setup lang="ts">
import { nextTick, ref } from 'vue'
import Conversations from '@/components/Conversations/index.vue'
import BubbleList from '@/components/BubbleList/index.vue'
import Bubble from '@/components/Bubble/index.vue'
import Sender from '@/components/Sender/index.vue'
import type { MessageItem } from '@/components/BubbleList/props'

type ChatMessage = MessageItem & {
  createdAt: string
}

const listRef = ref<{
  scrollToBottom: (behavior?: ScrollBehavior) => void
} | null>(null)

const seed = ref(100)
const inputValue = ref('')
const responding = ref(false)
const loadingHistory = ref(false)

const nowLabel = () => {
  const now = new Date()
  const hh = String(now.getHours()).padStart(2, '0')
  const mm = String(now.getMinutes()).padStart(2, '0')
  return `${hh}:${mm}`
}

const messages = ref<ChatMessage[]>([
  {
    id: 1,
    role: 'assistant',
    content: '你好，我是工作流演示助手。你可以直接输入问题，我会模拟回复。',
    createdAt: nowLabel(),
  },
  {
    id: 2,
    role: 'assistant',
    content: '向上滚动到顶部会自动触发历史消息加载。',
    createdAt: nowLabel(),
  },
])

const pushAssistantReply = (question: string) => {
  const answer = [
    `已收到你的问题：${question}`,
    '',
    '建议你这样推进：',
    '1. 先拆分目标与约束。',
    '2. 再把组件职责分层（容器 / 列表 / 输入）。',
    '3. 最后补测试和文档，形成闭环。',
  ].join('\n')

  messages.value.push({
    id: seed.value++,
    role: 'assistant',
    content: answer,
    createdAt: nowLabel(),
  })
}

const onSend = async (content: string) => {
  const question = content.trim()
  if (!question) return

  messages.value.push({
    id: seed.value++,
    role: 'user',
    content: question,
    createdAt: nowLabel(),
  })

  responding.value = true
  await nextTick()
  listRef.value?.scrollToBottom('smooth')

  window.setTimeout(async () => {
    pushAssistantReply(question)
    responding.value = false
    await nextTick()
    listRef.value?.scrollToBottom('smooth')
  }, 700)
}

const loadHistory = () => {
  if (loadingHistory.value) return
  loadingHistory.value = true

  window.setTimeout(() => {
    const base = seed.value
    const history: ChatMessage[] = [
      {
        id: base + 1,
        role: 'assistant',
        content: '历史消息：你可以把 Conversations 当成聊天页面外壳。',
        createdAt: '09:41',
      },
      {
        id: base + 2,
        role: 'user',
        content: '历史消息：那 BubbleList 负责什么？',
        createdAt: '09:42',
      },
      {
        id: base + 3,
        role: 'assistant',
        content: '历史消息：它负责消息流渲染、自动滚动和触顶加载。',
        createdAt: '09:42',
      },
    ]

    seed.value += 3
    messages.value.unshift(...history)
    loadingHistory.value = false
  }, 600)
}

const insertPrompt = () => {
  const template = '请根据这个需求给我一个 3 步执行计划。'
  inputValue.value = inputValue.value ? `${inputValue.value}\n${template}` : template
}
</script>

<template>
  <div class="chat-workflow-demo">
    <Conversations theme="light">
      <template #header>
        <div class="chat-workflow-demo__header">
          <div>
            <div class="chat-workflow-demo__title">完整聊天工作流</div>
            <div class="chat-workflow-demo__subtitle">
              Conversations + BubbleList + Bubble + Sender
            </div>
          </div>
          <span class="chat-workflow-demo__count">消息数：{{ messages.length }}</span>
        </div>
      </template>

      <template #scroll>
        <BubbleList
          ref="listRef"
          :data="messages"
          :loading="responding || loadingHistory"
          :top-load-threshold="20"
          @load-more="loadHistory"
        >
          <template #item="{ data }">
            <Bubble
              :placement="data.role === 'user' ? 'end' : 'start'"
              :content="data.content"
              :header="data.role === 'user' ? '你' : 'AI 助手'"
              :footer="String(data.createdAt ?? '')"
            >
              <template #avatar>
                <div class="chat-workflow-demo__avatar">
                  {{ data.role === 'user' ? 'U' : 'AI' }}
                </div>
              </template>
            </Bubble>
          </template>

          <template #bottom-action="{ scrollToBottom }">
            <button
              class="chat-workflow-demo__float-btn"
              type="button"
              @click="scrollToBottom('smooth')"
            >
              回到底部
            </button>
          </template>
        </BubbleList>
      </template>

      <template #footer>
        <div class="chat-workflow-demo__sender-wrap">
          <Sender
            v-model="inputValue"
            :loading="responding"
            placeholder="输入问题，回车发送，Shift + Enter 换行"
            @send="onSend"
          >
            <template #action-list>
              <button class="chat-workflow-demo__sender-action" type="button" @click="insertPrompt">
                插入模板
              </button>
            </template>
          </Sender>
        </div>
      </template>
    </Conversations>
  </div>
</template>

<style scoped>
.chat-workflow-demo {
  height: 560px;
  border: 1px solid var(--el-ai-border-color-light);
  border-radius: 12px;
  overflow: hidden;
}

.chat-workflow-demo__header {
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  border-bottom: 1px solid var(--el-ai-border-color-light);
  background: var(--el-ai-fill-color);
}

.chat-workflow-demo__title {
  font-size: 14px;
  font-weight: 600;
  color: var(--el-ai-text-color-primary);
}

.chat-workflow-demo__subtitle,
.chat-workflow-demo__count {
  font-size: 12px;
  color: var(--el-ai-text-color-secondary);
}

.chat-workflow-demo :deep(.el-ai-conversations__scroll) {
  display: flex;
  min-height: 0;
  padding: 10px;
  box-sizing: border-box;
}

.chat-workflow-demo :deep(.el-ai-bubble-list) {
  flex: 1;
  min-height: 240px;
  height: auto;
  border: 1px solid var(--el-ai-border-color-lighter);
  border-radius: 10px;
}

.chat-workflow-demo :deep(.el-ai-conversations__footer) {
  padding: 8px 10px 10px;
}

.chat-workflow-demo__avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--el-ai-fill-color);
  color: var(--el-ai-text-color-secondary);
  font-size: 11px;
  font-weight: 600;
  user-select: none;
}

.chat-workflow-demo__float-btn {
  border: 1px solid var(--el-ai-border-color);
  background: var(--el-ai-bg-color);
  color: var(--el-ai-text-color-regular);
  border-radius: 999px;
  padding: 4px 10px;
  font-size: 12px;
  cursor: pointer;
}

.chat-workflow-demo__sender-wrap {
  padding: 6px;
  border-top: 1px solid var(--el-ai-border-color-light);
}

.chat-workflow-demo__sender-action {
  border: 1px solid var(--el-ai-border-color);
  background: var(--el-ai-bg-color);
  color: var(--el-ai-text-color-regular);
  border-radius: 6px;
  padding: 4px 10px;
  cursor: pointer;
}
</style>
