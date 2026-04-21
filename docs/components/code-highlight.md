---
title: CodeHighlight | V-Element
description: CodeHighlight 组件文档
---

# CodeHighlight 代码高亮

用于渲染代码片段，支持语法高亮、复制、折叠、行号、自定义头部与样式变量配置。

## 基础用法

<preview path="../demo/CodeHighlight/Basic.vue" title="基础用法" description="传入 content/language 渲染代码高亮"></preview>

## 行号与自动换行

<preview path="../demo/CodeHighlight/LineNumbers.vue" title="行号与自动换行" description="showLineNumbers + wrapLines + maxHeight"></preview>

## 折叠与受控展开

<preview path="../demo/CodeHighlight/Collapsible.vue" title="折叠与受控展开" description="collapsible + expanded + update:expanded"></preview>

## 自定义头部与主题色

<preview path="../demo/CodeHighlight/CustomHeader.vue" title="自定义头部与主题色" description="header 插槽 + 颜色变量 + 语言标签映射"></preview>

## Props

| 名称               | 说明                   | 类型                     | 默认值     |
| ------------------ | ---------------------- | ------------------------ | ---------- |
| content            | 代码内容（新）         | string                   | -          |
| code               | 代码内容（兼容旧参数） | string                   | ''         |
| language           | 代码语言（新）         | string                   | -          |
| lang               | 代码语言（兼容旧参数） | string                   | 'text'     |
| background         | 代码区背景色           | string                   | ''         |
| headerBackground   | 头部背景色             | string                   | ''         |
| textColor          | 头部文字与按钮颜色     | string                   | ''         |
| codeColor          | 代码正文基础颜色       | string                   | ''         |
| codeFontFamily     | 代码字体族             | string                   | ''         |
| radius             | 外层圆角               | string \| number         | ''         |
| showLineNumbers    | 是否显示行号           | boolean                  | false      |
| lineNumberColor    | 行号颜色               | string                   | ''         |
| showHeader         | 是否显示默认头部       | boolean                  | true       |
| copyable           | 是否显示复制按钮       | boolean                  | true       |
| copyText           | 未复制文案             | string                   | '复制代码' |
| copiedText         | 复制成功文案           | string                   | '已复制'   |
| copyDuration       | 复制态持续时间（ms）   | number                   | 2000       |
| collapsible        | 是否支持折叠           | boolean                  | false      |
| expanded           | 受控展开状态           | boolean                  | undefined  |
| defaultExpanded    | 非受控默认展开状态     | boolean                  | true       |
| autoDetectLanguage | 无 language 时自动识别 | boolean                  | false      |
| wrapLines          | 是否自动换行           | boolean                  | false      |
| maxHeight          | 代码区最大高度         | string \| number         | ''         |
| languageLabelMap   | 自定义语言标签映射     | `Record<string, string>` | {}         |

## Events

| 事件名          | 说明               | 回调参数            |
| --------------- | ------------------ | ------------------- |
| update:expanded | 折叠状态变化时触发 | (expanded: boolean) |
| copied          | 复制成功后触发     | (content: string)   |

## Slots

| 插槽名 | 说明           | 插槽参数                                                                           |
| ------ | -------------- | ---------------------------------------------------------------------------------- |
| header | 自定义头部内容 | { content, language, displayLanguage, isCopied, onCopy, toggleExpanded, expanded } |

## Expose

| 方法名         | 说明             |
| -------------- | ---------------- |
| onCopy         | 手动触发复制     |
| toggleExpanded | 手动切换折叠状态 |
