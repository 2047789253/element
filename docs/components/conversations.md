---
title: Conversations | Element AI
description: Conversations 组件文档
---

# Conversations 会话容器

用于承载会话列表、顶部和底部区域，支持滚动监听与按需加载更多。

## 基础用法

<preview path="../demo/Conversations/Basic.vue" title="基础示例" description="header / scroll / footer 插槽 + onNext"></preview>

## Props

| 名称    | 说明                 | 类型                          | 默认值      |
| ------- | -------------------- | ----------------------------- | ----------- |
| theme   | 主题模式             | `'light' \| 'dark'`           | `undefined` |
| hasMore | 是否显示加载更多入口 | `boolean`                     | `false`     |
| onNext  | 加载下一页回调       | `() => Promise<void> \| void` | `-`         |

## Slots

| 插槽名  | 说明         |
| ------- | ------------ |
| header  | 顶部区域     |
| scroll  | 主滚动区域   |
| footer  | 底部区域     |
| loading | 自定义加载态 |

## Expose

| 方法名         | 说明           |
| -------------- | -------------- |
| scrollToBottom | 强制滚动到底部 |
