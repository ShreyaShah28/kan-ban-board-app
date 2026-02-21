<script setup lang="ts">
import { onMounted } from 'vue'
import { useTaskStore } from './taskStore/taskStore'
import TasksMainScreen from './components/TasksMainScreen.vue'

const taskStore = useTaskStore()

onMounted(() => {
  taskStore.loadAllData()
})
</script>

<template>
  <div class="min-h-screen w-screen bg-gray-100 dark:bg-gray-800 dark:text-white">
    <TasksMainScreen class="w-full min-h-screen" />
  </div>
</template>
