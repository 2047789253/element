<script setup lang="ts">
import Bubble from '@/components/Bubble/index.vue'
</script>

<template>
  <Bubble
    header="系统通知"
    shape="square"
    background="var(--el-ai-color-primary-light-9)"
    text-color="var(--el-ai-color-primary-dark-2)"
    content="通过 background、textColor、shape 可以快速定制视觉风格。"
  />

  <Bubble
    placement="end"
    shape="round"
    background="var(--el-ai-color-primary)"
    text-color="var(--el-ai-color-white)"
    content="这是一条强调样式的右侧气泡。"
  />
</template>
