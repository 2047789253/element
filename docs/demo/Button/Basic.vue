<script setup lang="ts">
import Button from '@/components/Button/Button.vue'
</script>
<template>
  <div class="button-demo">
    <div class="button-demo__row">
      <Button type="primary">Primary</Button>
      <Button type="success">Success</Button>
      <Button type="warning">Warning</Button>
      <Button type="danger">Danger</Button>
      <Button type="info">Info</Button>
    </div>

    <div class="button-demo__row">
      <Button plain>Plain</Button>
      <Button round>Round</Button>
      <Button circle icon="plus" aria-label="add" />
      <Button icon="wand-magic-sparkles">Icon</Button>
      <Button loading>Loading</Button>
      <Button disabled>Disabled</Button>
    </div>

    <div class="button-demo__row">
      <Button size="small">Small</Button>
      <Button size="medium">Medium</Button>
      <Button size="large">Large</Button>
    </div>
  </div>
</template>

<style scoped>
.button-demo {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.button-demo__row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
</style>
