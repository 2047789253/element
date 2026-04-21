<script setup lang="ts">
import { ref } from 'vue'
import Sender from '@/components/Sender/index.vue'

const value = ref('')
const loading = ref(false)
const lastSend = ref('')

const onSend = (content: string) => {
  lastSend.value = content
  loading.value = true
  setTimeout(() => {
    loading.value = false
    value.value = ''
  }, 600)
}

const insertTemplate = () => {
  const line = '请把这段内容整理成 3 条结论。'
  value.value = value.value ? `${value.value}\n${line}` : line
}
</script>

<template>
  <div class="sender-demo">
    <Sender
      v-model="value"
      :loading="loading"
      show-input-tag-prefix
      input-tag-prefix-value="DeepSeek-R1"
      placeholder="请输入问题，按 Enter 发送，Shift+Enter 换行"
      @send="onSend"
    >
      <template #action-list>
        <button class="sender-demo__action" type="button" @click="insertTemplate">插入模板</button>
      </template>
    </Sender>

    <p class="sender-demo__meta">最近发送：{{ lastSend || '暂无' }}</p>
  </div>
</template>

<style scoped>
.sender-demo {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.sender-demo__action {
  border: 1px solid var(--el-ai-border-color);
  background: var(--el-ai-bg-color);
  color: var(--el-ai-text-color-regular);
  border-radius: 6px;
  padding: 4px 10px;
  cursor: pointer;
}

.sender-demo__meta {
  margin: 0;
  color: var(--el-ai-text-color-secondary);
  font-size: 12px;
}
</style>
