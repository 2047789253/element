---
title: Dropdown | Element AI
description: Dropdown 组件文档
---

# Dropdown 下拉菜单

基于 Tooltip 的菜单组件，支持禁用项、分割线、点击后自动收起与手动控制。

## 基础用法

<preview path="../demo/Dropdown/Basic.vue" title="菜单选择与收起策略" description="支持 disabled、divided、hideAfterClick"></preview>

## Props

| 名称           | 说明                        | 类型                 | 默认值     |
| -------------- | --------------------------- | -------------------- | ---------- |
| menuOptions    | 菜单项数组                  | `MenuOption[]`       | `[]`       |
| hideAfterClick | 选中后是否自动收起          | `boolean`            | `true`     |
| trigger        | 触发方式（继承 Tooltip）    | `'hover' \| 'click'` | `'hover'`  |
| placement      | 浮层位置（继承 Tooltip）    | `Placement`          | `'bottom'` |
| popperOptions  | Popper 配置（继承 Tooltip） | `Partial<Options>`   | `{}`       |
| openDelay      | 展开延迟（继承 Tooltip）    | `number`             | `0`        |
| closeDelay     | 收起延迟（继承 Tooltip）    | `number`             | `200`      |

## MenuOption

| 字段     | 说明                       | 类型               |
| -------- | -------------------------- | ------------------ |
| label    | 菜单文案，支持文本与 VNode | `string \| VNode`  |
| key      | 菜单唯一标识               | `string \| number` |
| disabled | 是否禁用                   | `boolean`          |
| divided  | 是否在该项前插入分割线     | `boolean`          |

## Events

| 事件名         | 说明                   | 参数                 |
| -------------- | ---------------------- | -------------------- |
| visible-change | 面板显示状态变化时触发 | `(visible: boolean)` |
| select         | 选中有效菜单项时触发   | `(item: MenuOption)` |

## Slots

| 插槽名  | 说明           |
| ------- | -------------- |
| default | 下拉触发器区域 |

## Expose

| 方法名 | 说明             |
| ------ | ---------------- |
| show   | 手动展开下拉菜单 |
| hide   | 手动收起下拉菜单 |
