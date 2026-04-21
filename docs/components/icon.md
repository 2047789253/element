---
title: Icon | Element AI
description: Icon 组件文档
---

# Icon 图标

对 Font Awesome Vue 组件的二次封装，支持语义色、尺寸、旋转、动画与自定义颜色。

> 当前 `Icon` 主要作为库内基础组件使用，默认不从 `element-ai` 顶层导出。

## 基础用法

<preview path="../demo/Icon/Basic.vue" title="语义色、尺寸与动画" description="支持 type、size、spin、pulse 等常用能力"></preview>

## Props

> Icon 继承 `@fortawesome/vue-fontawesome` 的大部分属性，下表列出常用项与组件扩展项。

| 名称                                    | 说明                   | 类型                                                               | 默认值  |
| --------------------------------------- | ---------------------- | ------------------------------------------------------------------ | ------- |
| icon                                    | 图标定义或图标名称     | `IconDefinition \| string \| string[]`                             | `-`     |
| type                                    | 语义类型（组件扩展）   | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'`        | `-`     |
| color                                   | 自定义颜色（组件扩展） | `string`                                                           | `-`     |
| size                                    | 图标尺寸               | `'2xs' \| 'xs' \| 'sm' \| 'lg' \| 'xl' \| '2xl' \| '1x' ... '10x'` | `-`     |
| spin                                    | 是否旋转               | `boolean`                                                          | `false` |
| pulse                                   | 是否脉冲旋转           | `boolean`                                                          | `false` |
| rotation                                | 固定旋转角度           | `90 \| 180 \| 270 \| '90' \| '180' \| '270'`                       | `-`     |
| flip                                    | 翻转方向               | `'horizontal' \| 'vertical' \| 'both' \| boolean`                  | `-`     |
| fixedWidth                              | 固定宽度               | `boolean`                                                          | `false` |
| border                                  | 边框模式               | `boolean`                                                          | `false` |
| pull                                    | 浮动方向               | `'left' \| 'right'`                                                | `-`     |
| listItem                                | 列表图标模式           | `boolean`                                                          | `false` |
| bounce / shake / beat / fade / beatFade | 动画效果               | `boolean`                                                          | `false` |

## Events

| 事件名 | 说明           | 参数                  |
| ------ | -------------- | --------------------- |
| click  | 点击图标时触发 | `(event: MouseEvent)` |
