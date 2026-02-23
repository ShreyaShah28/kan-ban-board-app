<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isDark = ref(false)

const toggleTheme = () => {
  console.log('123')
  const html = document.documentElement
  const currentlyDark = html.classList.contains('dark')

  if (currentlyDark) {
    html.classList.remove('dark')
    localStorage.theme = 'light'
    isDark.value = false
  } else {
    html.classList.add('dark')
    localStorage.theme = 'dark'
    isDark.value = true
  }
}

onMounted(() => {
  isDark.value = document.documentElement.classList.contains('dark')
})
</script>

<template>
  <button
    @click="toggleTheme"
    class="relative inline-flex items-center h-10 w-20 rounded-full transition-colors duration-300 bg-gray-300 dark:bg-gray-700"
  >
    <span
      class="absolute left-1 top-1 h-8 w-8 rounded-full bg-white shadow-md transition-transform duration-300"
      :class="isDark ? 'translate-x-10' : 'translate-x-0'"
    />
  </button>
</template>
