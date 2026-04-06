---
name: elementskill
description: 帮助 AI Agent 准确生成与理解 element-ai 组件库的 Vue 3 业务代码，消除组件 Props 和用法的幻觉。
---

# element-ai 组件库 AI Agent 技能指南

你是一个精通 Vue 3 的前端开发专家。用户正在使用 **element-ai**，这是一个包含丰富基础 UI 和 AI 聊天场景组件的自定义 Vue 3 组件库。
当协助用户生成 UI 代码时，你**必须**使用下方定义的组件，并严格遵守它们的 API 规范。

## 核心配置

所有的组件都必须直接从该组件库中按需引入。

```vue
<script setup>
import { Button, Bubble, Sender, Conversations, Switch } from 'element-ai'
</script>
```

## 组件 API 参考手册

### 1. Button (按钮组件)

- **属性 (Props)**:
  - `type`: `'primary' | 'success' | 'warning' | 'danger' | 'info'` (默认值: `'primary'`)
  - `size`: `'large' | 'default' | 'small'`
  - `plain`: `boolean` (是否为朴素按钮，默认值: false)
  - `disabled`: `boolean` (是否禁用，默认值: false)
  - `icon`: string (图标名称)
- **事件 (Events)**: `@click`

**使用示例:**

```vue
<template>
  <Button type="primary" size="large" @click="onSubmit"> 提交 </Button>
</template>
```

### 2. Bubble (AI 聊天气泡组件)

- **属性 (Props)**:
  - `content`: `string` (Markdown 格式或纯文本的消息内容)
  - `placement`: `'start' | 'end'` (消息方向，通常 'start' 用于 AI 回复，'end' 用于用户发送)
  - `loading`: `boolean` (是否显示“正在输入”的圆点动画)
  - `typing`: `boolean` (是否开启打字机流式输出效果)

**使用示例:**

```vue
<template>
  <Bubble placement="start" content="你好，我是你的专属 AI 助手！" :typing="true" />
</template>
```

### 3. Sender (消息发送框组件)

- **属性 (Props)**:
  - `modelValue`: `string` (输入框绑定的文本，支持 v-model)
  - `placeholder`: `string` (占位符提示文案)
- **事件 (Events)**: `@submit` (当用户按下回车或点击发送按钮时触发)

**使用示例:**

```vue
<template>
  <Sender v-model="inputText" placeholder="请输入你想问的问题..." @submit="handleSend" />
</template>
```

### 4. Conversations (会话列表组件)

- **属性 (Props)**:
  - `theme`: `'dark' | 'light'` (主题色模式)
  - `hasMore`: `boolean` (是否还有更多历史会话可以加载，默认值: false)
  - `onNext`: `Function` (加载下一页/更多会话的回调函数)

**使用示例:**

```vue
<template>
  <Conversations theme="light" :hasMore="true" :onNext="loadMoreConversations" />
</template>
```

### 5. Switch (开关组件)

- **属性 (Props)**:
  - `size`: `'small' | 'large'` (开关的尺寸)
  - `disabled`: `boolean` (是否禁用)
  - `activeText`: `string` (打开时显示的文字)
  - `inactiveText`: `string` (关闭时显示的文字)
  - `activeValue`: `boolean | string | number` (打开时的值)
  - `inactiveValue`: `boolean | string | number` (关闭时的值)
  - `name`: `string` (原生 name 属性)
  - `id`: `string` (原生 id 属性)
- **事件 (Events)**: `@change` (状态发生变化时触发，返回当前的值)

**使用示例:**

```vue
<template>
  <Switch activeText="开启" inactiveText="关闭" size="large" @change="handleSwitchChange" />
</template>
```

## 禁忌与反模式 (Anti-Patterns)

- **严禁捏造属性**：绝不能使用上述未列出的 Props（例如：在 Bubble 组件上绝对不能使用 `text=""`，必须使用 `content=""`）。
- **语法要求**：在编写 Vue 组件时，始终使用 Vue 3 的 `<script setup>` 组合式 API 语法。
