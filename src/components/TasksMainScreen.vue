<script lang="ts" setup>
import { useTaskStore } from '../taskStore/taskStore'
import StatusTask from './StatusTask.vue'
import AddTaskModal from './AddTaskModal.vue'

const taskStore = useTaskStore()
const shadowColors = [
  'shadow-blue-200',
  'shadow-sky-200',
  'shadow-yellow-200',
  'shadow-green-200',
  'shadow-red-200',
]
</script>
<template>
  <div class="flex flex-row min-h-full">
    <div
      class="w-1/5 p-5 min-h-full group"
      v-for="(value, index) in taskStore.status"
      :key="value.name"
      :class="{
        'active-column': taskStore.addTaskModal === value.name,
      }"
    >
      <div
        class="flex flex-row justify-between bg-white dark:bg-gray-700 rounded-2xl p-3 group-hover:ring-2 group-hover:ring-gray-400 transition-all duration-200 shadow-md"
        :class="[
          shadowColors[index % shadowColors.length],
          {
            'ring-2 ring-blue-400 shadow-xl': taskStore.addTaskModal === value.name,
          },
        ]"
      >
        <p class="text-2xl italic">{{ value.name }}</p>
        <button
          class="outline-none focus:outline-none focus:ring-0"
          @click="taskStore.addTaskModal = value.name"
        >
          <i class="fa-solid fa-plus text-xl"></i>
        </button>
      </div>
      <AddTaskModal
        v-if="taskStore.addTaskModal !== ''"
        @close="taskStore.addTaskModal = ''"
      />
      <StatusTask class="w-full min-h-11/12" :status="value.name" />
    </div>
  </div>
</template>
