---
title: Markdown | Element AI
description: Markdown 组件文档
---

# Markdown 渲染

用于渲染 AI 文本内容，支持 GFM、数学公式与代码块插槽扩展。

## 基础用法

<preview path="../demo/Markdown/Basic.vue" title="基础示例" description="GFM + KaTeX + 自定义 code 插槽"></preview>

## Props

| 名称               | 说明                        | 类型                          | 默认值      |
| ------------------ | --------------------------- | ----------------------------- | ----------- |
| theme              | 主题模式                    | `'light' \| 'dark'`           | `undefined` |
| content            | Markdown 原文               | `string`                      | `''`        |
| remarkPlugins      | 额外 remark 插件            | `MiddlewarePluginItem[]`      | `[]`        |
| codeHighlightProps | 传递给 CodeHighlight 的属性 | `Partial<CodeHighlightProps>` | `{}`        |

## Slots

| 插槽名                | 说明               |
| --------------------- | ------------------ |
| code                  | 自定义代码块渲染   |
| code-highlight-header | 自定义默认代码头部 |
