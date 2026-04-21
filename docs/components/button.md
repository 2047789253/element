---
title: Button | Element AI
description: Button 组件文档
---

# Button 按钮

常用的操作按钮，支持类型、尺寸、圆角、图标与加载态。

## 基础用法

通过 `type`、`size`、`plain`、`round`、`circle`、`icon`、`loading` 与 `disabled` 组合出不同按钮状态。

<preview path="../demo/Button/Basic.vue" title="基础与状态组合" description="类型、尺寸、图标、加载态与禁用态"></preview>

## Props

| 名称       | 说明             | 类型                                                        | 默认值      |
| ---------- | ---------------- | ----------------------------------------------------------- | ----------- |
| type       | 按钮类型         | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'primary'` |
| size       | 按钮尺寸         | `'small' \| 'medium' \| 'large'`                            | `-`         |
| plain      | 是否朴素按钮     | `boolean`                                                   | `false`     |
| round      | 是否圆角按钮     | `boolean`                                                   | `false`     |
| circle     | 是否圆形按钮     | `boolean`                                                   | `false`     |
| disabled   | 是否禁用         | `boolean`                                                   | `false`     |
| loading    | 是否加载中       | `boolean`                                                   | `false`     |
| icon       | 图标名称         | `string`                                                    | `-`         |
| nativeType | 原生按钮 type    | `'button' \| 'submit' \| 'reset'`                           | `'button'`  |
| autoFocus  | 原生自动聚焦属性 | `boolean`                                                   | `false`     |

## Events

| 事件名 | 说明           | 参数                  |
| ------ | -------------- | --------------------- |
| click  | 点击按钮时触发 | `(event: MouseEvent)` |

## Slots

| 插槽名  | 说明     |
| ------- | -------- |
| default | 按钮内容 |

## Expose

| 字段名 | 说明                    |
| ------ | ----------------------- |
| sonref | 内部 button 的 DOM 引用 |
