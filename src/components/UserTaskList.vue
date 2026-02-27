<script lang="ts" setup>
import { useTaskStore } from '../taskStore/taskStore'

const taskStore = useTaskStore()
const shadowColors = [
  'shadow-blue-200',
  'shadow-sky-200',
  'shadow-yellow-200',
  'shadow-green-200',
  'shadow-red-200',
]

function loadUserTasks(username: string) {
  return taskStore.columns
    .flatMap((column) => column.tasks)
    .filter((task) => task.username === username)
}

function taskDate(dateId: string) {
  return new Date(parseInt(dateId)).toLocaleDateString()
}

function nameOfUser(usersname: string) {
  return usersname.substring(0, 2).toUpperCase()
}

function randomColor() {
  return taskStore.shadowColors[Math.floor(Math.random() * 4)]
}
</script>
<template>
  <div class="w-full flex flex-col items-center p-5">
    <div
      class="w-3/4 ring-2 ring-blue-400 flex flex-row bg-white dark:bg-gray-700 rounded-2xl p-3 group-hover:ring-2 group-hover:ring-gray-700 dark:group-hover:ring-gray-400 transition-all duration-200 shadow-md shadow-purple-500 dark:shadow-purple-200"
    >
      <p class="text-2xl italic">{{ taskStore.filterValue }}</p>
    </div>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-3/4 gap-5"
    >
      <div
        v-for="(element, index) in loadUserTasks(taskStore.filterValue)"
        :key="element.id"
        class="flex flex-col justify-between bg-white dark:bg-gray-700 shadow-gray-500 dark:shadow-gray-300 mt-5 rounded-lg w-full transition-all duration-200 shadow-md"
        :class="[shadowColors[index % shadowColors.length]]"
      >
        <div class="flex flex-row justify-between p-5">
          <p class="text-black/70 dark:text-white/70 text-sm">
            {{ taskDate(element.id) }}
          </p>
        </div>

        <p class="text-xl font-semibold pl-5 pr-5 wrap-break-word">
          {{ element.text }}
        </p>

        <p class="italic p-5">{{ element.status }}</p>

        <!-- <div class="flex justify-between p-5">
          <div class="flex gap-5">
            <button
              @click="taskStore.updateSetData(element.id, props.column)"
              class="cursor-pointer"
            >
              <i class="fa fa-pencil text-sm"></i>
            </button>

            <button
              @click="taskStore.deleteTask(element.id, props.column)"
              class="cursor-pointer"
            >
              <i class="fa fa-trash text-sm"></i>
            </button>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>
