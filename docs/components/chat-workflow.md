---
title: Chat Workflow | Element AI
description: 完整聊天工作流综合示例
---

# 完整聊天工作流

这个示例把 `Conversations + BubbleList + Bubble + Sender` 串成一个可运行链路，覆盖：

1. 发送消息（Sender）。
2. 渲染对话气泡（Bubble）。
3. 管理消息流与触顶加载（BubbleList）。
4. 承载会话结构（Conversations）。

## 综合示例

<preview path="../demo/ChatWorkflow/Basic.vue" title="完整聊天工作流" description="发送、回复、触顶加载历史、回到底部"></preview>

## 示例里包含的行为

1. 用户发送消息后，立即插入 user 气泡。
2. 模拟 AI 响应期间显示 `BubbleList` 的 loading 气泡。
3. AI 响应返回后插入 assistant 气泡（支持 Markdown 文本）。
4. 上滑触顶触发 `load-more`，自动补充历史消息。
