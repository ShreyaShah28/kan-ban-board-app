<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useTaskStore } from '../taskStore/taskStore'

const taskStore = useTaskStore()
const props = defineProps({
  status: {
    type: String,
    required: true,
  },
})
const tasksArray = computed(() =>
  taskStore.tasks.filter((task) => task.status === props.status)
)
const isDraggingOver = ref(false)

function taskDate(dateId: string) {
  console.log(new Date(parseInt(dateId)))
  return new Date(parseInt(dateId)).toLocaleDateString()
}

function dragEnter() {
  isDraggingOver.value = true
}

function dragLeave() {
  isDraggingOver.value = false
}
function dropTask(e: DragEvent, newStatus: String) {
  console.log(newStatus)
  isDraggingOver.value = false
  const taskData = e.dataTransfer?.getData('task')
  if (!taskData) return

  const task: object = JSON.parse(taskData)

  const updatedTask: object = {
    ...task,
    status: newStatus,
  }

  taskStore.updateTask(updatedTask)
}
function dragStart(e: DragEvent, task: object) {
  console.log(1, task)
  e.dataTransfer?.setData('task', JSON.stringify(task))
}
</script>
<template>
  <div
    class="w-full min-h-11/12"
    :class="[
      'column',
      isDraggingOver
        ? 'border-gray-400 border-2'
        : 'border-gray-100 dark:border-gray-800 border-none',
    ]"
    @dragover.prevent
    @dragenter="dragEnter"
    @dragleave="dragLeave"
    @drop="dropTask($event, props.status)"
  >
    {{ console.log(tasksArray) }}
    <div class="w-full min-h-full" v-for="task in tasksArray" :key="task.id">
      <div
        class="bg-white dark:bg-gray-700 shadow-gray-300 shadow mt-5 rounded-lg w-full"
        draggable="true"
        @dragstart="dragStart($event, task)"
      >
        <p class="text-xl font-semibold p-5">{{ task.text }}</p>
        <div class="flex justify-end p-5">
          <p>{{ taskDate(task.id) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
