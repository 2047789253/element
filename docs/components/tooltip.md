---
title: Tooltip | Element AI
description: Tooltip 组件文档
---

# Tooltip 文字提示

用于在 hover / click 场景显示浮层，支持延迟控制、手动模式与自定义内容。

## 基础用法

<preview path="../demo/Tooltip/Basic.vue" title="触发方式与手动控制" description="hover、click、manual 三种模式"></preview>

## Props

| 名称          | 说明                                      | 类型                 | 默认值     |
| ------------- | ----------------------------------------- | -------------------- | ---------- |
| content       | 浮层文本内容（未使用 content 插槽时生效） | `string`             | `''`       |
| trigger       | 触发方式                                  | `'hover' \| 'click'` | `'hover'`  |
| placement     | 浮层位置（Popper Placement）              | `Placement`          | `'bottom'` |
| manual        | 是否手动控制显示                          | `boolean`            | `false`    |
| popperOptions | 透传给 Popper 的配置                      | `Partial<Options>`   | `{}`       |
| transition    | 浮层过渡动画名                            | `string`             | `'fade'`   |
| openDelay     | 展开延迟（ms）                            | `number`             | `0`        |
| closeDelay    | 收起延迟（ms）                            | `number`             | `200`      |

## Events

| 事件名         | 说明               | 参数                 |
| -------------- | ------------------ | -------------------- |
| visible-change | 显示状态变化时触发 | `(visible: boolean)` |

## Slots

| 插槽名  | 说明         |
| ------- | ------------ |
| default | 触发器区域   |
| content | 浮层内容区域 |

## Expose

| 方法名 | 说明         |
| ------ | ------------ |
| show   | 手动显示浮层 |
| hide   | 手动隐藏浮层 |
