<script lang="ts" setup>
import { useTaskStore } from '../taskStore/taskStore'
import { computed, reactive } from 'vue'
import useVuelidate from '@vuelidate/core'
import { helpers, required, maxLength } from '@vuelidate/validators'

const initialData = {
  name: '',
  status: '',
}
const taskStore = useTaskStore()
const formData = reactive({ ...initialData })

const rules = computed(() => ({
  name: {
    required: helpers.withMessage('* Please enter some text', required),
    maxLength: helpers.withMessage('* Character limit is 25', maxLength(50)),
  },
}))

const v$ = useVuelidate(rules, formData)

function addTask() {
  v$.value.$touch()

  if (v$.value.$invalid) return

  if (taskStore.addTaskModal !== '') {
    formData.status = taskStore.addTaskModal
    taskStore.addTask(formData)
    taskStore.addTaskModal = ''
  } else {
    // formData.date = new Date(formData.date).toISOString()
    // taskStore.updateTask(taskStore.editCurrentTask, formData)
    // taskStore.editCurrentTask = 0
  }

  v$.value.$reset()
  formData.name = ''
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    addTask()
  } else if (e.key === 'Escape') {
    taskStore.closeModal()
  }
})
</script>
<template>
  <div
    @click="taskStore.closeModal"
    class="flex flex-col items-center fixed z-10 left-0 top-0 w-full h-full bg-gray-100/20 dark:bg-gray-800/20 overflow-auto"
  >
    <div
      @click.stop
      class="gap-3 flex flex-col items-center bg-gray-300 dark:bg-gray-900 rounded-xl w-full h-fit mt-[15%] sm:w-2/3 md:w-1/2 lg:w-1/3"
    >
      <div class="flex justify-between w-full p-5 border-b border-gray-500">
        <p class="text-2xl font-medium text-gray-700 dark:text-gray-300 italic">
          Add New Task
        </p>
        <button type="button" @click="taskStore.closeModal" class="">
          <span class="text-2xl">&times;</span>
        </button>
      </div>
      <div class="flex flex-col w-full h-fit p-5 gap-1">
        <p class="text-xl mb-1">Task</p>
        <span class="w-full bg-gray-300 dark:bg-gray-700 overflow-hidden rounded-xl">
          <textarea
            placeholder="Enter New Task"
            @blur="v$.name.$touch()"
            v-model="formData.name"
            class="text-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-4 w-full border-none outline-none focus:outline-none rounded-md"
          />
          <p v-if="v$.name.$error" class="text-red-600 text-lg">
            <span v-for="err in v$.name.$errors" :key="err.$uid">
              {{ err.$message }}
            </span>
          </p>
          <br />
        </span>
      </div>
      <div class="flex justify-end w-full pr-5 pb-2 py-2 border-t border-gray-500">
        <button
          type="button"
          @click="addTask"
          class="text-2xl bg-gray-500 text-white p-3 rounded-md hover:bg-gray-600 h-min"
        >
          Add
        </button>
      </div>
    </div>
  </div>
</template>
