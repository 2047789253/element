<template>
  <Button type="primary" disabled plain ref="buttonRef"> Click Me </Button>
</template>

<script setup lang="ts">
import Button from './components/Button/Button.vue'
import { ref, onMounted } from 'vue'
import type { ButtonInstance } from './components/Button/types'
const buttonRef = ref<ButtonInstance | null>(null)
onMounted(() => {
  if (buttonRef.value) console.log(buttonRef.value.sonref)
})
</script>

<style scoped></style>
