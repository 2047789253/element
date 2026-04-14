<script setup lang="ts">
import { ref } from 'vue'
import Sender from '@/components/Sender/index.vue'

const options = [
  { label: '前端开发', value: '1' },
  { label: '视觉设计', value: '2' },
  { label: '产品经理', value: '3' },
]

const content = ref(
  `<p>我是<input-slot placeholder="[职业]"></input-slot>，岗位偏向<select-slot value="2" options='${JSON.stringify(options)}'></select-slot></p>`,
)
</script>

<template>
  <Sender v-model="content" placeholder="支持 input-slot / select-slot 标签" />
  <p style="margin-top: 10px">html: {{ content }}</p>
</template>
