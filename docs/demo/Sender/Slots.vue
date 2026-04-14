<script setup lang="ts">
import { ref } from 'vue'
import Sender from '@/components/Sender/index.vue'

const content = ref('')
const showTag = ref(true)
const loading = ref(false)

const onSend = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 500)
}
</script>

<template>
  <Sender
    v-model="content"
    v-model:loading="loading"
    v-model:show-input-tag-prefix="showTag"
    input-tag-prefix-value="技能：翻译"
    :input-tag-variant="'updown'"
    :variant="'updown'"
    @send="onSend"
  >
    <template #prefix>
      <span style="font-size: 12px; color: #666">Assistant</span>
    </template>

    <template #action-list>
      <button @click="content = '<p>请总结今天会议内容</p>'">插入模板</button>
    </template>

    <template #send-btn="{ disabled }">
      <button :disabled="disabled" @click="onSend">Send</button>
    </template>

    <template #send-btn-loading>
      <button @click="loading = false">Stop</button>
    </template>
  </Sender>
</template>
