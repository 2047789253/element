---
outline: deep
---

# 快速开始

本文档站已经在主题入口完成组件库注册，你可以直接在 Markdown 页面中使用组件。

## 安装

```bash
pnpm add element-ai vue @popperjs/core lodash-es
```

## 在 Vue 项目中注册

```ts
import { createApp } from 'vue'
import ElementAI from 'element-ai'
import 'element-ai/style.css'
import App from './App.vue'

createApp(App).use(ElementAI).mount('#app')
```

## 按需引入

```ts
import { Button, Bubble, Sender, BubbleList, Conversations, Markdown } from 'element-ai'
```

## 基础示例

```vue
<script setup lang="ts">
import { ref } from 'vue'

const text = ref('')
</script>

<template>
  <Sender v-model="text" placeholder="请输入问题" />
</template>
```

## VitePress 文档内直接使用

如果你沿用本仓库配置，组件已在 [docs/.vitepress/theme/index.ts](.vitepress/theme/index.ts) 中通过 `app.use(ElementAI)` 全局注册。

你也可以在具体页面里局部引入 `.vue` demo 后再通过 `<preview />` 展示。

## 下一步

1. 查看 [docs/components/button.md](components/button.md) 了解基础组件。
2. 查看 [docs/components/sender.md](components/sender.md) 与 [docs/components/bubble-list.md](components/bubble-list.md) 体验 AI 对话链路。
3. 查看 [docs/components/markdown.md](components/markdown.md) 了解 Markdown 渲染扩展。

### Theme Data

<pre>{{ theme }}</pre>

### Page Data

<pre>{{ page }}</pre>

### Page Frontmatter

<pre>{{ frontmatter }}</pre>

## More

Check out the documentation for the [full list of runtime APIs](https://vitepress.dev/reference/runtime-api#usedata).
