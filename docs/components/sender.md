---
title: Sender | Element AI
description: Sender 组件文档
---

# Sender 发送框

面向 AI 对话场景的富文本输入组件，支持 Enter 发送、Shift+Enter 换行、前置标签、粘贴文件与自定义发送区。

## 基础用法

<preview path="../demo/Sender/Basic.vue" title="基础示例" description="v-model + send + action-list"></preview>

## 插槽与标签

<preview path="../demo/Sender/Slots.vue" title="插槽与标签" description="prefix、action-list、send-btn、send-btn-loading"></preview>

## 自定义节点

支持在 HTML 中使用 input-slot / select-slot。

<preview path="../demo/Sender/NodeSlot.vue" title="节点扩展" description="input-slot 与 select-slot"></preview>

## Props

| 名称                          | 说明                                                   | 类型                                     | 默认值    |
| ----------------------------- | ------------------------------------------------------ | ---------------------------------------- | --------- |
| v-model                       | 输入框 HTML 内容                                       | string                                   | ''        |
| v-model:show-input-tag-prefix | 是否显示前置标签                                       | boolean                                  | false     |
| v-model:loading               | 发送中状态                                             | boolean                                  | false     |
| theme                         | 主题                                                   | 'light' \| 'dark'                        | 'light'   |
| placeholder                   | 占位文本                                               | string                                   | ''        |
| disabled                      | 是否禁用                                               | boolean                                  | false     |
| extensions                    | tiptap 扩展配置                                        | Extensions                               | []        |
| inputTagPrefixValue           | 前置标签文案                                           | string                                   | ''        |
| inputTagVariant               | 前置标签样式变体                                       | 'default' \| 'updown'                    | 'default' |
| enterBreak                    | 回车是否换行，为 false 时回车触发 enterPressed 与 send | boolean                                  | false     |
| onHandleKeyDown               | 自定义键盘处理，兼容 (event) 与 (view, event) 两种签名 | (event) => void \| (view, event) => void | -         |
| variant                       | 布局变体                                               | 'default' \| 'updown'                    | 'default' |
| maxHeight                     | 编辑器最大高度（px）                                   | number                                   | 200       |

## Events

| 事件名       | 说明                                 | 回调参数                |
| ------------ | ------------------------------------ | ----------------------- |
| send         | 点击发送或回车发送时触发             | (content: string)       |
| enterPressed | 回车键按下触发（enterBreak = false） | -                       |
| paste        | 粘贴时触发                           | (event: ClipboardEvent) |
| pasteFile    | 粘贴文件时触发                       | (files: File[])         |
| focus        | 聚焦时触发                           | -                       |
| blur         | 失焦时触发                           | -                       |

## Slots

| 插槽名              | 说明                       | 作用域参数                                       |
| ------------------- | -------------------------- | ------------------------------------------------ |
| prefix              | 前置内容                   | -                                                |
| input-tag-prefix    | 输入前置标签自定义内容     | -                                                |
| action-list         | 操作区列表                 | -                                                |
| send-btn            | 发送按钮                   | { disabled: boolean }                            |
| send-btn-loading    | loading 状态下按钮         | -                                                |
| select-slot-content | select-slot 下拉内容自定义 | { options, theme, selectValue, onSelect, close } |

## Exposes

| 名称   | 说明               | 类型                      |
| ------ | ------------------ | ------------------------- |
| editor | tiptap editor 实例 | () => Editor \| undefined |
| focus  | 聚焦输入框         | () => void                |
| blur   | 失焦输入框         | () => void                |
| clear  | 清空内容           | () => void                |
