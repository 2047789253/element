# 🎨 Element AI Vue - CSS 架构完全指南

## 📖 核心概念

**简单来说：**

- ✋ **不要再写死前缀** `class="el-ai-button"`
- 🎯 **改用两层组合**：
  1. **Vue 层**：`useNamespace` Hook 在 Template 中生成类名
  2. **SCSS 层**：BEM Mixin 在样式中定义类名

---

## 🌟 架构对比

### ❌ 老方式（千万别这样做）

```vue
<!-- 写死了！维护起来很累 -->
<template>
  <div class="el-ai-button el-ai-button--primary is-loading">点击</div>
</template>

<style scoped>
.el-ai-button {
  background: blue;
}
.el-ai-button--primary {
  color: white;
}
.el-ai-button.is-loading {
  opacity: 0.6;
}
</style>
```

**问题：**

- 📝 类名重复写多遍
- 🐛 前缀容易写错
- 🚀 扩展新状态需要改多处

---

### ✅ 新方式（推荐）

```vue
<script setup lang="ts">
import { useNamespace } from '@/hooks/useNamespace'

const ns = useNamespace('button')
// ns.b() 自动生成 'el-ai-button'
// ns.m('primary') 自动生成 'el-ai-button--primary'
// ns.is('loading') 自动生成 'is-loading'
</script>

<template>
  <button :class="[ns.b(), ns.m('primary'), ns.is(loading)]">点击</button>
</template>

<style scoped lang="scss">
@use '@/styles/mixins.scss' as *;

@include b('button') {
  // 自动生成: .el-ai-button { ... }
  background: blue;

  @include m('primary') {
    // 自动生成: .el-ai-button--primary { ... }
    color: white;
  }

  @include when('loading') {
    // 自动生成: .el-ai-button.is-loading { ... }
    opacity: 0.6;
  }
}
</style>
```

**优势：**

- ✨ 零重复！类名全部生成
- 🎯 前缀自动管理（改一个地方生效）
- 📦 支持嵌套，代码结构清晰
- 🔄 修改命名空间只需改配置

---

## 🔧 完整使用示例

### 1️⃣ 基础组件（Button 按钮）

```vue
<script setup lang="ts">
import { computed } from 'vue'
import { useNamespace } from '@/hooks/useNamespace'

interface Props {
  type?: 'primary' | 'success' | 'warning' | 'danger'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  loading?: boolean
  icon?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'primary',
  size: 'medium',
  disabled: false,
  loading: false,
})

const ns = useNamespace('button')
</script>

<template>
  <button
    :class="[
      ns.b(), // el-ai-button
      ns.m(type), // el-ai-button--primary
      ns.m(size), // el-ai-button--medium
      ns.is('disabled', disabled), // is-disabled (当 disabled=true 时)
      ns.is('loading', loading), // is-loading (当 loading=true 时)
    ]"
    :disabled="disabled || loading"
  >
    <span v-if="icon" :class="ns.e('icon')">{{ icon }}</span>
    <slot />
  </button>
</template>

<style scoped lang="scss">
@use '@/styles/mixins.scss' as *;

// 主块
@include b('button') {
  // 基础样式
  padding: 8px 16px;
  border: 1px solid var(--el-ai-border-color);
  border-radius: var(--el-ai-border-radius-base);
  font-size: var(--el-ai-font-size-base);
  font-weight: var(--el-ai-font-weight-primary);
  cursor: pointer;

  // 过渡效果
  @include transition(background-color, border-color);

  // 默认状态
  background-color: var(--el-ai-button-bg-color);
  color: var(--el-ai-button-text-color);

  // 元素：图标
  @include e('icon') {
    margin-right: 6px;
    font-size: 1em;
  }

  // ==================== 类型修饰符 ====================

  @include m('primary') {
    background-color: var(--el-ai-color-primary);
    border-color: var(--el-ai-color-primary);
    color: white;

    @include hover {
      background-color: var(--el-ai-color-primary-light-5);
      border-color: var(--el-ai-color-primary-light-5);
    }
  }

  @include m('success') {
    background-color: var(--el-ai-color-success);
    border-color: var(--el-ai-color-success);
    color: white;

    @include hover {
      opacity: 0.8;
    }
  }

  @include m('warning') {
    background-color: var(--el-ai-color-warning);
    border-color: var(--el-ai-color-warning);
    color: white;
  }

  @include m('danger') {
    background-color: var(--el-ai-color-danger);
    border-color: var(--el-ai-color-danger);
    color: white;
  }

  // ==================== 尺寸修饰符 ====================

  @include m('small') {
    padding: 4px 12px;
    font-size: var(--el-ai-font-size-small);
  }

  @include m('medium') {
    padding: 8px 16px;
    font-size: var(--el-ai-font-size-base);
  }

  @include m('large') {
    padding: 12px 24px;
    font-size: var(--el-ai-font-size-large);
  }

  // ==================== 状态 ====================

  @include when('disabled') {
    background-color: var(--el-ai-button-disabled-bg-color);
    border-color: var(--el-ai-button-disabled-border-color);
    color: var(--el-ai-button-disabled-text-color);
    cursor: not-allowed;
    opacity: 0.6;
  }

  @include when('loading') {
    pointer-events: none;
    opacity: 0.7;
  }

  @include active {
    transform: scale(0.98);
  }
}
</style>
```

---

### 2️⃣ 嵌套组件（Card 卡片）

```vue
<script setup lang="ts">
import { useNamespace } from '@/hooks/useNamespace'

interface Props {
  title?: string
  footer?: boolean
  shadow?: 'always' | 'hover' | 'never'
}

const props = withDefaults(defineProps<Props>(), {
  shadow: 'always',
})

const ns = useNamespace('card')
</script>

<template>
  <div :class="[ns.b(), ns.m(shadow)]">
    <!-- 卡片头 -->
    <div v-if="title" :class="ns.e('header')">
      <h3 :class="ns.e('title')">{{ title }}</h3>
    </div>

    <!-- 卡片内容 -->
    <div :class="ns.e('content')">
      <slot />
    </div>

    <!-- 卡片底部 -->
    <div v-if="footer" :class="ns.e('footer')">
      <slot name="footer" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/styles/mixins.scss' as *;

@include b('card') {
  // 块级样式
  background-color: var(--el-ai-bg-color);
  border: 1px solid var(--el-ai-border-color);
  border-radius: var(--el-ai-border-radius-base);
  padding: 16px;

  // 默认阴影
  @include box-shadow(0, 1px, 4px, rgba(0, 0, 0, 0.08));
  @include transition(box-shadow, border-color);

  // ==================== 元素 ====================

  @include e('header') {
    padding-bottom: 12px;
    border-bottom: 1px solid var(--el-ai-border-color-light);
    margin-bottom: 12px;
  }

  @include e('title') {
    margin: 0;
    font-size: var(--el-ai-font-size-large);
    font-weight: 600;
    color: var(--el-ai-text-color);
  }

  @include e('content') {
    color: var(--el-ai-text-color);
    line-height: 1.6;
  }

  @include e('footer') {
    padding-top: 12px;
    border-top: 1px solid var(--el-ai-border-color-light);
    margin-top: 12px;
    @include flex(flex-end, center, row);
    gap: 8px;
  }

  // ==================== 修饰符：阴影类型 ====================

  @include m('always') {
    @include box-shadow(0, 2px, 8px, rgba(0, 0, 0, 0.12));
  }

  @include m('hover') {
    box-shadow: none;

    @include hover {
      @include box-shadow(0, 4px, 12px, rgba(0, 0, 0, 0.15));
    }
  }

  @include m('never') {
    box-shadow: none;
  }

  // ==================== 状态 ====================

  @include hover {
    border-color: var(--el-ai-border-color-hover);
  }
}
</style>
```

---

### 3️⃣ 复杂组件（Dialog 对话框）

```vue
<script setup lang="ts">
import { useNamespace } from '@/hooks/useNamespace'

interface Props {
  title?: string
  visible: boolean
  width?: string | number
  centered?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  visible: false,
  width: '500px',
  centered: true,
})

const emit = defineEmits<{
  'update:visible': [boolean]
}>()

const ns = useNamespace('dialog')
</script>

<template>
  <!-- 背景遮罩 -->
  <transition name="fade">
    <div v-if="visible" :class="ns.e('mask')" @click="emit('update:visible', false)" />
  </transition>

  <!-- 对话框容器 -->
  <transition name="slide">
    <div
      v-if="visible"
      :class="[ns.b(), ns.is('centered', centered)]"
      :style="{ width: typeof width === 'number' ? `${width}px` : width }"
    >
      <!-- 对话框头 -->
      <div :class="ns.e('header')">
        <h2 :class="ns.e('title')">{{ title }}</h2>
        <button :class="ns.e('close')" @click="emit('update:visible', false)">✕</button>
      </div>

      <!-- 对话框内容 -->
      <div :class="ns.e('body')">
        <slot />
      </div>

      <!-- 对话框底部 -->
      <div :class="ns.e('footer')">
        <slot name="footer" />
      </div>
    </div>
  </transition>
</template>

<style scoped lang="scss">
@use '@/styles/mixins.scss' as *;

@include b('dialog') {
  // 对话框容器
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;

  background-color: var(--el-ai-bg-color);
  border: 1px solid var(--el-ai-border-color);
  border-radius: var(--el-ai-border-radius-base);
  @include box-shadow(0, 10px, 40px, rgba(0, 0, 0, 0.16));

  @include flex(flex-start, stretch, column);

  // 修改头部位置
  @include when('centered') {
    top: 40%;
  }

  // ==================== 遮罩层 ====================

  @include e('mask') {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    background-color: transparent;
    // 背景可选
    // background-color: rgba(0, 0, 0, 0.5);
  }

  // ==================== 头部 ====================

  @include e('header') {
    padding: 16px 20px;
    border-bottom: 1px solid var(--el-ai-border-color-light);
    @include flex(space-between, center, row);
    gap: 16px;
  }

  @include e('title') {
    margin: 0;
    font-size: var(--el-ai-font-size-large);
    font-weight: 600;
    color: var(--el-ai-text-color);
    flex: 1;
  }

  @include e('close') {
    width: 32px;
    height: 32px;
    border: none;
    background: transparent;
    cursor: pointer;
    font-size: 18px;
    color: var(--el-ai-text-color-secondary);

    @include transition(color);
    @include hover {
      color: var(--el-ai-color-danger);
    }
  }

  // ==================== 内容 ====================

  @include e('body') {
    padding: 16px 20px;
    flex: 1;
    color: var(--el-ai-text-color);
    line-height: 1.6;
    max-height: 60vh;
    overflow-y: auto;
  }

  // ==================== 底部 ====================

  @include e('footer') {
    padding: 12px 20px;
    border-top: 1px solid var(--el-ai-border-color-light);
    @include flex(flex-end, center, row);
    gap: 8px;
  }
}

// ==================== 过渡动画 ====================

.fade-enter-active,
.fade-leave-active {
  transition: opacity var(--el-ai-transition-duration);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: all var(--el-ai-transition-duration);
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translate(-50%, -48%);
}
</style>
```

---

## 📚 useNamespace Hook 完整 API

### 基础方法

```typescript
import { useNamespace } from '@/hooks/useNamespace'

const ns = useNamespace('button')

// ✅ 块 - Block
ns.b() // 'el-ai-button'
ns.b('size') // 'el-ai-button-size'

// ✅ 元素 - Element
ns.e('icon') // 'el-ai-button__icon'
ns.e('label') // 'el-ai-button__label'

// ✅ 修饰符 - Modifier
ns.m('primary') // 'el-ai-button--primary'
ns.m('disabled') // 'el-ai-button--disabled'

// ✅ 状态 - State
ns.is('loading') // 'is-loading'
ns.is('active', true) // 当第二参数为 true 时返回 'is-active'
ns.is('active', false) // 当第二参数为 false 时返回 ''

// ✅ 组合方法
ns.be('size', 'icon') // 'el-ai-button-size__icon'
ns.em('icon', 'primary') // 'el-ai-button__icon--primary'
ns.bm('size', 'large') // 'el-ai-button-size--large'
ns.bem('size', 'icon', 'primary') // 'el-ai-button-size__icon--primary'

// ✅ CSS 变量
ns.cssVar({
  background: 'var(--el-ai-color-primary)',
  color: 'var(--el-ai-text-color)',
})
// 返回 { '--el-ai-background': 'var(--el-ai-color-primary)', ... }
```

### 在 Template 中使用

```vue
<script setup>
import { ref } from 'vue'
import { useNamespace } from '@/hooks/useNamespace'

const isLoading = ref(false)
const isDisabled = ref(false)
const ns = useNamespace('button')
</script>

<template>
  <!-- 单个类名 -->
  <button :class="ns.b()">Button</button>

  <!-- 组合多个类名 -->
  <button :class="[
    ns.b(),
    ns.m('primary'),
    ns.is('loading', isLoading),
    ns.is('disabled', isDisabled),
  ]">
    Submit
  </button>

  <!-- 条件添加 -->
  <div :class="[
    ns.b('wrapper'),
    { [ns.m('center')]: 'isCentered' },
  ]">
    Content
  </div>

  <!-- 动态修饰符 -->
  <div :class="[
    ns.b(),
    ns.m(buttonType),    // type="primary" → 'el-ai-button--primary'
    ns.m(buttonSize),    // size="large"  → 'el-ai-button--large'
  ]">
    Flexible Button
  </div>
</template>
```

---

## 🎯 完整的 SCSS Mixin 快速参考

```scss
@use '@/styles/mixins.scss' as *;

// ==================== BEM ====================
@include b('button') {
} // 块
@include e('icon') {
} // 元素 (需在 b 内)
@include m('primary') {
} // 修饰符 (需在 b 内)
@include when('disabled') {
} // 状态 (需在 b 内)
@include bem('button', 'icon', 'primary') {
} // 完整组合

// ==================== 常用工具 ====================
@include flex($justify, $align, $direction, $wrap) // Flexbox
  @include absolute($top, $right, $bottom, $left) // 绝对定位
  @include fixed($top, $right, $bottom, $left) // 固定定位
  @include size($width, $height) // 宽高
  @include center() // 居中
  @include text-overflow($lines) // 文本溢出 (1 为单行)
  // ==================== 状态 Mixin ====================
  @include hover {
} // Hover 状态
@include active {
} // 激活状态
@include focus {
} // 焦点状态
@include disabled {
} // 禁用状态
@include focus-visible-ring() // 焦点环
  // ==================== 样式 Mixin ====================
  @include border($width, $style, $color) // 边框
  @include transition($properties...) // 过渡
  @include gradient($direction, $c1, $c2) // 渐变
  @include box-shadow($x, $y, $blur, $color) // 阴影
  @include clearfix // 清除浮动
  @include sr-only // 无障碍
  // ==================== 响应式 ====================
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

## 💡 最佳实践

### ✅ DO

```vue
<!-- 使用 Hook 生成类名 -->
<template>
  <div :class="[ns.b(), ns.m(type), ns.is('active', active)]">Content</div>
</template>

<!-- 使用 Mixin 定义样式 -->
<style lang="scss">
@include b('component') {
  @include e('child') {
    color: blue;
  }
  @include m('variant') {
    color: red;
  }
}
</style>
```

### ❌ DON'T

```vue
<!-- ❌ 硬编码类名 -->
<div class="el-ai-button el-ai-button--primary is-loading">

<!-- ❌ 重复定义前缀 -->
<style>
.el-ai-component { }
.el-ai-component__element { }
.el-ai-component--modifier { }
</style>

<!-- ❌ 混用不同命名方式 -->
:class="[ns.b(), 'vk-button', 'my-button']"
```

---

## 📝 创建新组件的完整流程

### 第 1 步：创建组件文件

```
src/components/YourComponent/
├── YourComponent.vue      # 组件文件
├── index.ts              # 导出文件
├── types.ts              # 类型定义
└── style.scss            # 样式文件
```

### 第 2 步：编写核心代码

```vue
<!-- YourComponent.vue -->
<script setup lang="ts">
import { useNamespace } from '@/hooks/useNamespace'

const ns = useNamespace('your-component')
// ...
</script>

<template>
  <div :class="ns.b()">
    <!-- 使用 ns.e(), ns.m(), ns.is() -->
  </div>
</template>

<style scoped lang="scss">
@use '@/styles/mixins.scss' as *;

@include b('your-component') {
  // 所有样式都在这里
}
</style>
```

### 第 3 步：添加到导出清单

```typescript
// src/index.ts
import { withInstall } from './utils'
import YourComponent from './components/YourComponent/YourComponent.vue'

export const ElAYourComponent = withInstall(YourComponent)
```

---

## 🎓 为什么用这个架构？

| 优势         | 说明                          |
| ------------ | ----------------------------- |
| **DRY 原则** | 类名生成一次，使用无数次      |
| **一致性**   | 全项目命名统一，无前缀错误    |
| **可维护性** | 改命名空间只需改一个地方      |
| **可扩展性** | 添加新状态只需在 Mixin 中添加 |
| **可读性**   | 代码结构清晰，嵌套表示关系    |
| **无障碍**   | 支持 `is-` 前缀状态约定       |
| **主题切换** | CSS 变量配合自动响应主题      |
| **性能**     | SCSS 编译时优化，零运行时开销 |

---

**恭喜！你已经掌握了 Element AI Vue 的核心 CSS 架构！** 🎉
