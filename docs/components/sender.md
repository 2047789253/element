---
<<<<<<< HEAD
title: Sender | V-Element
description: Sender 组件文档
---

# Sender 输入框

面向 AI 对话场景的富文本输入组件，基于 tiptap，支持 Enter 发送、Shift+Enter 换行、文件粘贴、前置标签和可扩展节点。

## 基础用法

<preview path="../demo/Sender/Basic.vue" title="基础用法" description="Sender 基础输入、发送与 loading"></preview>

## 插槽与标签

<preview path="../demo/Sender/Slots.vue" title="插槽与标签" description="prefix、action-list、send-btn、send-btn-loading"></preview>

## 自定义节点

支持在 HTML 中使用 input-slot / select-slot。

<preview path="../demo/Sender/NodeSlot.vue" title="节点扩展" description="input-slot 与 select-slot 节点"></preview>

## Props

| 属性名                        | 说明                                                   | 类型                                     | 默认值    |
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
=======
title: Sender | Element AI
description: Sender 组件文档
---

# Sender 发送框

用于聊天输入与发送动作，支持多行输入、回车行为控制、标签前缀、粘贴文件事件和插槽扩展。

## 基础用法

<preview path="../demo/Sender/Basic.vue" title="基础示例" description="v-model + send + action-list"></preview>

## Props

| 名称                | 说明                  | 类型                           | 默认值              |
| ------------------- | --------------------- | ------------------------------ | ------------------- |
| modelValue          | 输入框内容（v-model） | string                         | ''                  |
| placeholder         | 占位文本              | string                         | 'Type a message...' |
| loading             | 是否加载中            | boolean                        | false               |
| disabled            | 是否禁用              | boolean                        | false               |
| theme               | 主题模式              | 'light' \| 'dark'              | ''                  |
| variant             | 布局模式              | 'default' \| 'updown'          | 'default'           |
| enterBreak          | Enter 是否换行        | boolean                        | false               |
| showInputTagPrefix  | 是否显示输入标签      | boolean                        | false               |
| inputTagPrefixValue | 输入标签文本          | string                         | ''                  |
| inputTagVariant     | 输入标签样式          | 'default' \| 'updown'          | 'default'           |
| maxHeight           | 输入区最大高度        | number                         | 200                 |
| onHandleKeyDown     | 按键拦截钩子          | (event: KeyboardEvent) => void | -                   |

## Events

| 事件名                    | 说明                     | 参数                    |
| ------------------------- | ------------------------ | ----------------------- |
| send                      | 点击发送或回车发送时触发 | (content: string)       |
| enterPressed              | Enter 发送路径触发       | -                       |
| update:modelValue         | v-model 更新             | (value: string)         |
| update:showInputTagPrefix | 更新标签显示状态         | (value: boolean)        |
| update:loading            | 更新 loading 状态        | (loading: boolean)      |
| paste                     | 粘贴触发                 | (event: ClipboardEvent) |
| pasteFile                 | 粘贴文件触发             | (files: File[])         |
| focus                     | 聚焦触发                 | -                       |
| blur                      | 失焦触发                 | -                       |

## Slots

| 插槽名           | 说明                |
| ---------------- | ------------------- |
| prefix           | 输入框前缀区域      |
| input-tag-prefix | 输入标签区域        |
| action-list      | 操作区左侧按钮区    |
| send-btn         | 自定义发送按钮      |
| send-btn-loading | 自定义 loading 按钮 |

## Expose

| 方法名           | 说明             |
| ---------------- | ---------------- |
| focus            | 聚焦输入框       |
| blur             | 失焦输入框       |
| clear            | 清空输入内容     |
| editor().getText | 获取当前输入文本 |
>>>>>>> a35bc07b87a9c8701f05d0a98d435c2492872e4d
