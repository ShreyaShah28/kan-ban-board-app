<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useTaskStore } from './taskStore/taskStore'
// import DarkModeButton from './components/DarkModeButton.vue'
import TasksMainScreen from './components/TasksMainScreen.vue'
import FilterTaskModal from './components/FilterTaskModal.vue'
import UserTaskList from './components/UserTaskList.vue'

const taskStore = useTaskStore()
const isDark = ref(false)

const applyTheme = (theme: string) => {
  if (theme === 'dark') {
    document.documentElement.classList.remove('light')
    document.documentElement.classList.add('dark')
    document.documentElement.style.setProperty('color-scheme', 'dark')
    isDark.value = true
  } else {
    document.documentElement.classList.remove('dark')
    document.documentElement.classList.add('light')
    document.documentElement.style.setProperty('color-scheme', 'light')
    isDark.value = false
  }

  localStorage.setItem('theme', theme)
  console.log(theme)
}

const toggleTheme = () => {
  applyTheme(isDark.value ? 'light' : 'dark')
}

onMounted(() => {
  taskStore.loadAllData()
})

function toggleFilterModal() {
  taskStore.displayFilterModal = !taskStore.displayFilterModal
}
</script>

<template>
  <div
    class="h-30 w-30 bg-green-100 dark:bg-amber-300 dark:text-orange-800 light:text-purple-400"
  >
    Anyong
  </div>
  <div class="min-h-screen min-w-screen bg-gray-100 dark:bg-gray-700 dark:text-white">
    <div
      class="flex flex-row justify-between items-center p-3 bg-gray-300 dark:bg-gray-700"
    >
      <button
        class="flex flex-row justify-between items-center w-32 p-3 py-1 border border-gray-100/50 rounded-md"
        @click="toggleFilterModal"
      >
        <i class="fa-solid fa-sliders"></i><span>Filter</span
        ><i class="fa-solid fa-angle-down"></i>
      </button>
      <div class="p-3">
        <label class="inline-flex items-center cursor-pointer">
          <span class="select-none ms-3 text-sm font-medium"> Light </span>

          <input
            type="checkbox"
            class="sr-only peer"
            @change="toggleTheme"
            :checked="isDark"
          />

          <div
            class="relative w-9 h-5 bg-gray-300 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-400 rounded-full peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-500"
          ></div>

          <span class="select-none ms-3 text-sm font-medium"> Dark </span>
        </label>
      </div>
    </div>
    <FilterTaskModal v-if="taskStore.displayFilterModal" />
    <!-- <DarkModeButton /> -->
    <UserTaskList v-if="taskStore.filterValue !== ''" />
    <TasksMainScreen v-else class="min-w-screen lg:w-full min-h-screen" />
  </div>
</template>
