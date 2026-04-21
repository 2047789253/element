---
title: BubbleList | Element AI
description: BubbleList 组件文档
---

# BubbleList 消息列表

用于 AI 对话消息流渲染，内置自动滚动、触顶加载事件和底部快捷操作。

## 基础用法

<preview path="../demo/BubbleList/Basic.vue" title="基础示例" description="消息渲染 + 触顶加载 + 底部操作"></preview>

## Props

| 名称             | 说明               | 类型          | 默认值 |
| ---------------- | ------------------ | ------------- | ------ |
| data             | 消息数组           | MessageItem[] | []     |
| loading          | 底部加载态         | boolean       | false  |
| bottomThreshold  | 判定底部阈值（px） | number        | 30     |
| topLoadThreshold | 触顶加载阈值（px） | number        | 10     |

## MessageItem

| 字段    | 说明         | 类型                  |
| ------- | ------------ | --------------------- |
| id      | 唯一标识     | string \| number      |
| content | 消息内容     | string                |
| role    | 角色         | 'user' \| 'assistant' |
| typing  | 是否打字机中 | boolean               |

## Events

| 事件名    | 说明                     | 参数 |
| --------- | ------------------------ | ---- |
| load-more | 列表滚动到顶部阈值时触发 | -    |

## Slots

| 插槽名        | 说明                 |
| ------------- | -------------------- |
| item          | 自定义消息项渲染     |
| bottom-action | 自定义底部悬浮操作区 |

## Expose

| 方法名         | 说明               |
| -------------- | ------------------ |
| scrollToBottom | 滚动到底部         |
| scrollToTop    | 滚动到顶部         |
| scrollToIndex  | 滚动到指定消息索引 |
