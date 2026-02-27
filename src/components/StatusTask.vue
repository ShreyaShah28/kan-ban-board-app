<script lang="ts" setup>
import { useTaskStore } from '../taskStore/taskStore'
import draggable from 'vuedraggable'

const taskStore = useTaskStore()
const props = defineProps({
  column: {
    type: Object,
    required: true,
  },
})

function taskDate(dateId: string) {
  return new Date(parseInt(dateId)).toLocaleDateString()
}

function nameOfUser(usersname: string) {
  return usersname.substring(0, 2).toUpperCase()
}

function handleChange() {
  taskStore.saveAllColumns()
}

function randomColor() {
  return taskStore.shadowColors[Math.floor(Math.random() * 4)]
}
</script>
<template>
  <div class="w-full">
    <draggable
      v-model="props.column.tasks"
      group="tasks"
      item-key="id"
      @change="handleChange"
      class="w-full"
    >
      <template #item="{ element }">
        <div
          class="bg-white dark:bg-gray-700 shadow-gray-700 dark:shadow-gray-300 shadow mt-5 rounded-lg w-full"
        >
          <div class="flex flex-row justify-between p-5">
            <p class="dark:text-white/70 text-sm">{{ taskDate(element.id) }}</p>
            <span class="rounded-full text-sm p-1 dark:text-white" :class="randomColor()"
              ><p>{{ nameOfUser(element.username) }}</p></span
            >
          </div>
          <p class="text-xl font-semibold pl-5 pr-5 wrap-break-word">
            {{ element.text }}
          </p>

          <div class="flex justify-between p-5">
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
          </div>
        </div>
      </template>
    </draggable>
  </div>
</template>
