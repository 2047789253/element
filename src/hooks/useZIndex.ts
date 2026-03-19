import { computed, ref } from 'vue'

const zIndex = ref(0) // 写在函数外部的全局闭包变量
const useZIndex = (initialvalue = 2000) => {
  const initialZIndex = ref(initialvalue)
  const currentZIndex = computed(() => zIndex.value + initialZIndex.value)
  const nextZIndex = () => {
    zIndex.value++
    return currentZIndex.value
  }
  return {
    currentZIndex,
    nextZIndex,
    initialZIndex,
  }
}

export default useZIndex
