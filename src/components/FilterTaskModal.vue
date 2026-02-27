<script lang="ts" setup>
import { useTaskStore } from '../taskStore/taskStore'
const taskStore = useTaskStore()
</script>
<template>
  <div
    class="fixed inset-0 z-50 flex items-start"
    @click="taskStore.displayFilterModal = false"
  >
    <div
      class="gap-3 flex flex-col items-center bg-gray-300 dark:bg-gray-800 border border-gray-100 dark:border-gray-600 rounded-xl w-fit h-fit ml-2 mt-16"
      @click.stop
    >
      <div class="flex flex-col w-full p-5">
        <div class="flex flex-row">
          <input
            type="radio"
            id="username0"
            name="user"
            value="All"
            @change="taskStore.filterValue = ''"
            :checked="taskStore.filterValue === ''"
          />
          <label for="username0" class="pl-2">All</label>
        </div>
        <div v-for="username in taskStore.users" :key="username">
          <input
            type="radio"
            id="username1"
            name="user"
            value="username.name"
            @change="taskStore.filterValue = username.name"
            :checked="taskStore.filterValue === username.name"
          />
          <label for="username1" class="pl-2">{{ username.name }}</label>
        </div>
      </div>
    </div>
  </div>
</template>
