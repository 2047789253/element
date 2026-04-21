<script setup lang="ts">
import Markdown from '@/components/Markdown/index.vue'

const content = [
  '# Markdown Demo',
  '',
  '支持 **GFM** 与 KaTeX 公式。',
  '',
  '行内公式：$E=mc^2$',
  '',
  '$$',
  '\\int_0^1 x^2\\,dx = \\frac{1}{3}',
  '$$',
  '',
  '| 能力 | 状态 |',
  '| --- | --- |',
  '| GFM | ✅ |',
  '| KaTeX | ✅ |',
  '',
  '```ts',
  'type Role = "user" | "assistant"',
  '```',
].join('\n')
</script>

<template>
  <Markdown :content="content">
    <template #code="{ content: code, language }">
      <div class="markdown-demo__code">
        <div class="markdown-demo__code-title">自定义代码渲染 · {{ language || 'text' }}</div>
        <pre><code>{{ code }}</code></pre>
      </div>
    </template>
  </Markdown>
</template>

<style scoped>
.markdown-demo__code {
  border: 1px solid var(--el-ai-border-color-light);
  border-radius: 8px;
  overflow: hidden;
}

.markdown-demo__code-title {
  padding: 6px 10px;
  font-size: 12px;
  color: var(--el-ai-text-color-secondary);
  background: var(--el-ai-fill-color);
}

.markdown-demo__code pre {
  margin: 0;
  padding: 10px;
  overflow: auto;
}
</style>
