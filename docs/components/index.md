---
title: 组件总览 | Element AI
description: Element AI 全量组件与能力矩阵
---

# 组件总览

本页用于快速定位组件能力与文档入口。

## 基础组件

| 组件          | 说明                          | 文档                                 |
| ------------- | ----------------------------- | ------------------------------------ |
| Button        | 按钮类型、状态与图标组合      | [Button](./button.md)                |
| Switch        | 布尔/字符串/数字值切换        | [Switch](./switch.md)                |
| Icon          | Font Awesome 图标封装（内部） | [Icon](./icon.md)                    |
| Tooltip       | 文本提示与浮层内容承载        | [Tooltip](./tooltip.md)              |
| Dropdown      | 基于 Tooltip 的下拉菜单       | [Dropdown](./dropdown.md)            |
| Message       | 全局消息提示（函数调用）      | [Message](./message.md)              |
| CodeHighlight | 代码高亮、行号、折叠与复制    | [CodeHighlight](./code-highlight.md) |

## AI 场景组件

| 组件          | 说明                                                  | 文档                                 |
| ------------- | ----------------------------------------------------- | ------------------------------------ |
| ChatWorkflow  | Conversations + BubbleList + Bubble + Sender 综合示例 | [完整聊天工作流](./chat-workflow.md) |
| Bubble        | 对话气泡渲染                                          | [Bubble](./bubble.md)                |
| Sender        | 多行输入与发送框                                      | [Sender](./sender.md)                |
| BubbleList    | 消息流渲染与滚动管理                                  | [BubbleList](./bubble-list.md)       |
| Conversations | 会话容器与分页加载                                    | [Conversations](./conversations.md)  |
| Markdown      | GFM / KaTeX / 代码块插槽渲染                          | [Markdown](./markdown.md)            |

## 组合建议

1. 聊天主链路：`Conversations + BubbleList + Bubble + Sender`。
2. 代码问答：`Markdown + CodeHighlight + Bubble`。
3. 操作反馈：`Button + Dropdown + Message + Tooltip`。

## 迁移中

`Input` 与 `Select` 页面已保留迁移说明，待新实现完成后会补齐完整 API 与示例。
