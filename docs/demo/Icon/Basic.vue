<script setup lang="ts">
import Icon from '@/components/Icon/Icon.vue'

const semanticIcons = [
  { label: 'Primary', type: 'primary' as const, icon: 'bolt' },
  { label: 'Success', type: 'success' as const, icon: 'circle-check' },
  { label: 'Warning', type: 'warning' as const, icon: 'triangle-exclamation' },
  { label: 'Danger', type: 'danger' as const, icon: 'circle-xmark' },
  { label: 'Info', type: 'info' as const, icon: 'circle-info' },
]

const sizeIcons = ['xs', 'sm', 'lg', '2x', '3x'] as const
</script>

<template>
  <div class="icon-demo">
    <section>
      <h4>语义色</h4>
      <div class="icon-demo__grid">
        <div v-for="item in semanticIcons" :key="item.label" class="icon-demo__item">
          <Icon :icon="item.icon" :type="item.type" />
          <span>{{ item.label }}</span>
        </div>
      </div>
    </section>

    <section>
      <h4>尺寸</h4>
      <div class="icon-demo__grid">
        <div v-for="size in sizeIcons" :key="size" class="icon-demo__item">
          <Icon icon="star" :size="size" />
          <span>{{ size }}</span>
        </div>
      </div>
    </section>

    <section>
      <h4>动画</h4>
      <div class="icon-demo__grid">
        <div class="icon-demo__item"><Icon icon="spinner" spin /><span>spin</span></div>
        <div class="icon-demo__item"><Icon icon="spinner" pulse /><span>pulse</span></div>
        <div class="icon-demo__item"><Icon icon="bell" shake /><span>shake</span></div>
        <div class="icon-demo__item"><Icon icon="heart" beat /><span>beat</span></div>
        <div class="icon-demo__item"><Icon icon="star" bounce /><span>bounce</span></div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.icon-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.icon-demo h4 {
  margin: 0 0 8px;
  font-size: 13px;
  color: var(--el-ai-text-color-secondary);
}

.icon-demo__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(90px, 1fr));
  gap: 10px;
}

.icon-demo__item {
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 32px;
  border: 1px solid var(--el-ai-border-color-lighter);
  border-radius: 8px;
  padding: 6px 8px;
  font-size: 12px;
}
</style>
