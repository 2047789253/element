<script setup lang="ts">
import { ref } from 'vue'
import Sender from '@/components/Sender/index.vue'

const content = ref('')
const loading = ref(false)
const variant = ref<'default' | 'updown'>('default')
const lastSend = ref('')

const handleSend = (text: string) => {
  lastSend.value = text
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 600)
}

const insertPrompt = () => {
  content.value = '<p>请把这段需求拆分成 3 个步骤。</p>'
}
</script>

<template>
  <div style="display: flex; gap: 8px; margin-bottom: 12px; flex-wrap: wrap">
    <button @click="variant = 'default'">default</button>
    <button @click="variant = 'updown'">updown</button>
    <button @click="insertPrompt">插入提示词</button>
  </div>

  <Sender
    v-model="content"
    v-model:loading="loading"
    :variant="variant"
    placeholder="输入内容，Enter 发送，Shift+Enter 换行"
    @send="handleSend"
  />

  <p style="margin-top: 10px">send text: {{ lastSend || '-' }}</p>
  <p style="margin-top: 4px">v-model html: {{ content || '-' }}</p>
</template>
