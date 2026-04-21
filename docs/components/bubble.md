---
title: Bubble | Element AI
description: Bubble 组件文档
---

# Bubble 气泡

用于 AI 对话消息渲染，支持左右布局、形状、颜色、Markdown 内容与插槽扩展。

## 基础用法

<preview path="../demo/Bubble/Basic.vue" title="基础气泡" description="start / end 双方向展示"></preview>

## 自定义样式

<preview path="../demo/Bubble/CustomStyle.vue" title="样式定制" description="shape + background + textColor"></preview>

## 插槽扩展

<preview path="../demo/Bubble/Slots.vue" title="插槽扩展" description="avatar / header / default / footer / actions"></preview>

## Props

| 名称       | 说明                                             | 类型                         | 默认值  |
| ---------- | ------------------------------------------------ | ---------------------------- | ------- |
| placement  | 气泡方向                                         | 'start' \| 'end'             | 'start' |
| content    | 消息内容（未传默认插槽时，内部走 Markdown 渲染） | string                       | ''      |
| avatar     | 头像，可传 URL 或组件                            | string \| VNode \| Component | ''      |
| header     | 头部文本                                         | string                       | ''      |
| footer     | 底部文本                                         | string                       | ''      |
| loading    | 是否显示加载动画                                 | boolean                      | false   |
| shape      | 形状风格                                         | 'round' \| 'square'          | 'round' |
| background | 自定义背景色                                     | string                       | ''      |
| textColor  | 自定义文字色                                     | string                       | ''      |

## Slots

| 插槽名  | 说明                                      |
| ------- | ----------------------------------------- |
| avatar  | 自定义头像区域                            |
| header  | 自定义头部                                |
| default | 自定义内容区（传入后会覆盖 content 渲染） |
| footer  | 自定义底部                                |
| actions | 自定义操作区                              |
