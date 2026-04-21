---
title: Message | Element AI
description: Message 组件文档
---

# Message 消息提示

用于全局轻提示反馈，支持类型、自动关闭、手动关闭与堆叠偏移。

## 基础用法

<preview path="../demo/Message/Basic.vue" title="函数调用方式" description="createMessage 支持多类型与自定义 VNode"></preview>

## API

```ts
import { createMessage } from 'element-ai'

createMessage({
  message: '保存成功',
  type: 'success',
  duration: 2000,
  showClose: true,
})
```

## CreateMessageProps

| 名称           | 说明                                  | 类型                                           | 默认值      |
| -------------- | ------------------------------------- | ---------------------------------------------- | ----------- |
| message        | 消息内容，支持字符串与 VNode          | `string \| VNode`                              | `''`        |
| type           | 消息类型                              | `'success' \| 'warning' \| 'info' \| 'danger'` | `'info'`    |
| showClose      | 是否显示关闭按钮                      | `boolean`                                      | `false`     |
| duration       | 自动关闭时长（ms），传 `0` 不自动关闭 | `number`                                       | `3000`      |
| offset         | 顶部偏移（用于堆叠）                  | `number`                                       | `20`        |
| transitionName | 过渡动画名                            | `string`                                       | `'fade-up'` |

## 返回值

`createMessage` 返回 `MessageContext`，可用于手动销毁实例：

```ts
const instance = createMessage({ message: '这条消息会被手动关闭', duration: 0 })
instance.destroy()
```

## 说明

1. Message 内部会自动管理 z-index 与多条消息的垂直堆叠。
2. 支持鼠标移入暂停计时、按 `Esc` 关闭当前消息。
