# 🚀 Element AI Vue - 快速参考卡片

## Vue Hook - useNamespace

```typescript
import { useNamespace } from '@/hooks/useNamespace'

const ns = useNamespace('button')

// ✅ 块
ns.b() // 'el-ai-button'

// ✅ 元素
ns.e('icon') // 'el-ai-button__icon'

// ✅ 修饰符
ns.m('primary') // 'el-ai-button--primary'

// ✅ 状态
ns.is('loading') // 'is-loading'
ns.is('disabled', disabled) // 条件返回

// ✅ 组合
ns.bem('btn', 'icon', 'primary') // 'el-ai-button-btn__icon--primary'
```

### Template 中使用

```vue
<template>
  <button :class="[ns.b(), ns.m(type), ns.m(size), ns.is('loading', loading)]">Click Me</button>
</template>
```

---

## SCSS Mixin - 样式定义

### BEM Mixin

```scss
@use '@/styles/mixins.scss' as *;

// 块
@include b('button') {
}

// 元素 (需在 b 内)
@include e('icon') {
}

// 修饰符 (需在 b 内)
@include m('primary') {
}

// 状态 (需在 b 内)
@include when('disabled') {
}

// 完整组合
@include bem('button', 'icon', 'primary') {
}
```

### 使用工具 Mixin

```scss
@include flex($justify, $align) // Flexbox
  @include absolute($top, $right, $bottom, $left) // 绝对定位
  @include size($width, $height) // 宽高
  @include text-overflow($lines) // 文本溢出
  @include transition($properties...) // 过渡
  @include box-shadow($x, $y, $blur) // 阴影
  @include hover {
} // Hover
@include active {
} // 激活
@include disabled {
} // 禁用
```

### 响应式 Mixin

```scss
@include sm {
} // ≥640px
@include md {
} // ≥1024px
@include lg {
} // ≥1440px
@include dark {
} // 深色主题
```

---

## CSS 变量 - 样式取值

### 颜色

```scss
--el-ai-color-primary: #0057ff --el-ai-color-success: #52c41a --el-ai-color-warning: #faad14
  --el-ai-color-danger: #ff4d4f --el-ai-color-info: #1890ff;
```

### 文本

```scss
--el-ai-text-color: rgba(0, 0, 0, 0.85) --el-ai-text-color-secondary: rgba(0, 0, 0, 0.65)
  --el-ai-text-color-light: rgba(0, 0, 0, 0.45) --el-ai-text-color-disabled: rgba(0, 0, 0, 0.25);
```

### 背景

```scss
--el-ai-bg-color: #ffffff --el-ai-bg-color-page: #f5f5f5 --el-ai-fill-color: #f0f2f5;
```

### 其他

```scss
--el-ai-border-radius-base: 6px --el-ai-border-radius-round: 20px --el-ai-font-size-base: 14px
  --el-ai-transition-duration: 0.3s;
```

---

## 完整示例

```vue
<script setup lang="ts">
import { useNamespace } from '@/hooks/useNamespace'

const props = defineProps<{
  type?: 'primary' | 'success'
  loading?: boolean
}>()

const ns = useNamespace('button')
</script>

<template>
  <button :class="[ns.b(), ns.m(type), ns.is('loading', loading)]">
    {{ loading ? 'Loading...' : 'Click' }}
  </button>
</template>

<style scoped lang="scss">
@use '@/styles/mixins.scss' as *;

@include b('button') {
  padding: 8px 16px;
  border: 1px solid var(--el-ai-border-color);
  border-radius: var(--el-ai-border-radius-base);
  cursor: pointer;

  @include transition(background-color, border-color);

  @include m('primary') {
    background: var(--el-ai-color-primary);
    color: white;

    @include hover {
      background: var(--el-ai-color-primary-light-8);
    }
  }

  @include m('success') {
    background: var(--el-ai-color-success);
    color: white;
  }

  @include when('loading') {
    opacity: 0.7;
    pointer-events: none;
  }
}
</style>
```

---

## ⚡ 常用命令

| 任务         | 命令                            |
| ------------ | ------------------------------- |
| 添加新修饰符 | `@include m('name') { }`        |
| 添加元素样式 | `@include e('child') { }`       |
| 添加 Hover   | `@include hover { }`            |
| 添加禁用样式 | `@include when('disabled') { }` |
| Flexbox 布局 | `@include flex(center, center)` |
| 响应式设计   | `@include md { }`               |

---

## 📌 核心原则

1. **不写硬编码类名** ❌ `class="el-ai-button"`
2. **用 Hook 生成类名** ✅ `:class="ns.b()"`
3. **用 Mixin 定义样式** ✅ `@include b('button') { }`
4. **用 CSS 变量取值** ✅ `var(--el-ai-color-primary)`
5. **嵌套反映 BEM 结构** ✅ `@include b() { @include e() { } }`

---

## 🎓 完整文档

- **详细指南**: [CSS_ARCHITECTURE_GUIDE.md](./CSS_ARCHITECTURE_GUIDE.md)
- **对比演示**: [CSS_ARCHITECTURE_DEMO.md](./CSS_ARCHITECTURE_DEMO.md)
