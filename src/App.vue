<script setup lang="ts">
import { onMounted } from 'vue'
import { useTaskStore } from './taskStore/taskStore'
// import DarkModeButton from './components/DarkModeButton.vue'
import TasksMainScreen from './components/TasksMainScreen.vue'

const taskStore = useTaskStore()

onMounted(() => {
  taskStore.loadAllData()
})
</script>

<template>
  <div class="min-h-screen min-w-screen bg-gray-100 dark:bg-gray-800 dark:text-white">
    <!-- <DarkModeButton /> -->
    <TasksMainScreen class="min-w-screen lg:w-full min-h-screen" />
  </div>
</template>
