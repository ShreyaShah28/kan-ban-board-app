<script setup lang="ts">
import { onMounted } from 'vue'
import { useTaskStore } from './taskStore/taskStore'
import LightDarkSwitch from './components/LightDarkSwitch.vue'
import TasksMainScreen from './components/TasksMainScreen.vue'
import FilterTaskModal from './components/FilterTaskModal.vue'
import UserTaskList from './components/UserTaskList.vue'

const taskStore = useTaskStore()

onMounted(() => {
  taskStore.loadAllData()
})

function toggleFilterModal() {
  taskStore.displayFilterModal = !taskStore.displayFilterModal
}
</script>

<template>
  <div class="min-h-screen min-w-screen bg-gray-100 dark:bg-gray-600 dark:text-white">
    <div
      class="flex flex-row justify-between items-center p-3 bg-gray-200 dark:bg-gray-700"
    >
      <button
        class="flex flex-row justify-between items-center w-32 p-3 py-1 border border-gray-400 dark:border-gray-100/50 rounded-md"
        @click="toggleFilterModal"
      >
        <i class="fa-solid fa-sliders"></i><span>Filter</span
        ><i class="fa-solid fa-angle-down"></i>
      </button>
      <LightDarkSwitch />
    </div>
    <FilterTaskModal v-if="taskStore.displayFilterModal" />
    <UserTaskList v-if="taskStore.filterValue !== ''" />
    <TasksMainScreen v-else class="min-w-screen lg:w-full min-h-screen" />
  </div>
</template>
