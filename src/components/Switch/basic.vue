<script setup lang="ts">
import { ref } from 'vue'
import Switch from './Switch.vue'
const test = ref(true)
</script>

<template>
  <Switch v-model="test" />
</template>
