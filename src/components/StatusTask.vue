<script lang="ts" setup>
import { ref } from 'vue'
import { useTaskStore } from '../taskStore/taskStore'
import draggable from 'vuedraggable'

const taskStore = useTaskStore()
const props = defineProps({
  column: {
    type: Object,
    required: true,
  },
})
const isDraggingOver = ref(false)

function taskDate(dateId: string) {
  return new Date(parseInt(dateId)).toLocaleDateString()
}
function handleChange() {
  taskStore.saveAllColumns()
}
</script>
<template>
  <div
    class="w-full"
    :class="[
      isDraggingOver
        ? 'border-gray-400 border-2'
        : 'border-gray-100 dark:border-gray-800 border-none',
    ]"
  >
    <draggable
      v-model="props.column.tasks"
      group="tasks"
      item-key="id"
      @change="handleChange"
      class="w-full"
    >
      <template #item="{ element }">
        <div
          class="bg-white dark:bg-gray-700 shadow-gray-300 shadow mt-5 rounded-lg w-full"
        >
          <p class="text-xl font-semibold p-5">
            {{ element.text }}
          </p>

          <div class="flex justify-between p-5">
            <p>{{ taskDate(element.id) }}</p>
            <button
              @click="taskStore.deleteTask(element.id, props.column)"
              class="cursor-pointer"
            >
              <i class="fa fa-trash text-sm"></i>
            </button>
          </div>
        </div>
      </template>
    </draggable>
  </div>
</template>
