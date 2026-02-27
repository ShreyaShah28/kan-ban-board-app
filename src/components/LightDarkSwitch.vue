<script lang="ts" setup>
import { onMounted, ref } from 'vue'

const isDark = ref(false)

function applyTheme(theme: string) {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark')
    document.documentElement.style.setProperty('color-scheme', 'dark')
    isDark.value = true
  } else {
    document.documentElement.classList.remove('dark')
    document.documentElement.style.setProperty('color-scheme', 'light')
    isDark.value = false
  }

  localStorage.setItem('theme', theme)
  console.log(theme)
}

function toggleTheme() {
  applyTheme(isDark.value ? 'light' : 'dark')
}

onMounted(() => {
  toggleTheme()
})
</script>
<template>
  <div class="p-3">
    <label class="inline-flex items-center cursor-pointer">
      <span class="select-none ms-3 text-sm font-medium"> Light </span>

      <span class="p-3">
        <input
          type="checkbox"
          class="sr-only peer"
          @change="toggleTheme"
          :checked="isDark"
        />

        <div
          class="relative w-9 h-5 bg-gray-300 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-400 rounded-full peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-500"
        ></div>
      </span>

      <!-- <label class="relative inline-flex items-center cursor-pointer">
            <input class="sr-only peer" value="" type="checkbox" />
            <div
              class="w-24 h-12 rounded-full ring-0 peer duration-500 outline-none bg-gray-200 overflow-hidden before:flex before:items-center before:justify-center after:flex after:items-center after:justify-center before:content-['☀️'] before:absolute before:h-10 before:w-10 before:top-1/2 before:bg-white before:rounded-full before:left-1 before:-translate-y-1/2 before:transition-all before:duration-700 peer-checked:before:opacity-0 peer-checked:before:rotate-90 peer-checked:before:-translate-y-full shadow-lg shadow-gray-400 peer-checked:shadow-lg peer-checked:shadow-gray-700 peer-checked:bg-[#383838] after:content-['🌑'] after:absolute after:bg-[#1d1d1d] after:rounded-full after:top-[4px] after:right-1 after:translate-y-full after:w-10 after:h-10 after:opacity-0 after:transition-all after:duration-700 peer-checked:after:opacity-100 peer-checked:after:rotate-180 peer-checked:after:translate-y-0"
            ></div>
          </label> -->

      <span class="select-none text-sm font-medium"> Dark </span>
    </label>
  </div>
</template>
