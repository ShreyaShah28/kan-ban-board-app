<script lang="ts" setup>
import { useTaskStore } from '../taskStore/taskStore'
import { computed, reactive } from 'vue'
import useVuelidate from '@vuelidate/core'
import { helpers, required, maxLength } from '@vuelidate/validators'
import { watch } from 'vue'

const initialData = {
  username: '',
  text: '',
  status: '',
}
const taskStore = useTaskStore()
const formData = reactive({ ...initialData })

const rules = computed(() => ({
  text: {
    required: helpers.withMessage('* Please enter some text', required),
    maxLength: helpers.withMessage('* Character limit is 50', maxLength(50)),
  },
  username: {
    required: helpers.withMessage('* Please enter some text', required),
  },
}))

const v$ = useVuelidate(rules, formData)

async function addTask() {
  v$.value.$touch()
  console.log('addtaskmodal: ', taskStore.addTaskModal)
  console.log('updatetaskmodal: ', taskStore.updateTaskModal)

  if (v$.value.$invalid) return

  if (taskStore.addTaskModal !== '') {
    formData.status = taskStore.addTaskModal
    taskStore.addTask(formData)
    taskStore.addTaskModal = ''
  } else if (taskStore.updateTaskModal !== '') {
    formData.status = taskStore.updateTaskModal
    await taskStore.updateTask({
      id: taskStore.taskToUpdate.id,
      username: formData.username,
      text: formData.text,
      status: formData.status,
    })
    taskStore.updateTaskModal = ''
    console.log('from updatetask section end')
  }

  v$.value.$reset()
  formData.text = ''
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    addTask()
  } else if (e.key === 'Escape') {
    taskStore.closeModal()
  }
})

watch(
  () => taskStore.updateTaskModal,
  (newVal) => {
    if (newVal !== '') {
      formData.username = taskStore.taskToUpdate.username
      formData.text = taskStore.taskToUpdate.text
      formData.status = taskStore.taskToUpdate.status
    }
  },
  { immediate: true }
)
</script>
<template>
  <div
    @click="taskStore.closeModal"
    class="flex flex-col items-center fixed z-10 left-0 top-0 w-full h-full bg-gray-500/25 dark:bg-gray-800/20 overflow-auto"
  >
    <div
      @click.stop
      class="gap-3 flex flex-col items-center bg-blue-50 border border-white dark:bg-gray-900 rounded-xl w-full h-fit mt-[10%] sm:w-2/3 md:w-1/2 lg:w-1/3"
    >
      <div class="flex justify-between w-full p-5 border-b border-gray-500/50">
        <p class="text-2xl font-medium text-gray-700 dark:text-gray-300 italic">
          {{ taskStore.updateTaskModal ? 'Update Task' : 'Add New Task' }}
        </p>
        <button type="button" @click="taskStore.closeModal" class="">
          <span class="text-2xl">&times;</span>
        </button>
      </div>
      <div class="flex flex-col w-full h-fit p-5 pb-0 gap-1">
        <span class="w-full overflow-hidden rounded-xl">
          <fieldset>
            <legend class="pb-3 text-xl italic">Select user to assign task</legend>
            <div class="grid grid-cols-3 gap-3">
              <div v-for="username in taskStore.users" :key="username">
                <input
                  type="radio"
                  id="username1"
                  name="user"
                  value="username.name"
                  @change="formData.username = username.name"
                  :checked="formData.username === username.name"
                />
                <label for="username1">{{ username.name }}</label>
              </div>
            </div>
          </fieldset>
          <p v-if="v$.username.$error" class="text-red-600 text-lg">
            <span v-for="err in v$.username.$errors" :key="err.$uid">
              {{ err.$message }}
            </span>
          </p>
          <br />
        </span>
      </div>
      <div class="flex flex-col w-full h-fit p-5 gap-1">
        <p class="text-xl mb-1 italic">Task</p>
        <span class="w-full">
          <textarea
            placeholder="Enter New Task"
            @blur="v$.text.$touch()"
            v-model="formData.text"
            class="text-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-4 w-full overflow-clip border border-blue-400 outline-none focus:outline-none rounded-xl"
          />
          <p v-if="v$.text.$error" class="text-red-600 text-lg">
            <span v-for="err in v$.text.$errors" :key="err.$uid">
              {{ err.$message }}
            </span>
          </p>
          <br />
        </span>
      </div>
      <div class="flex justify-end w-full pr-5 pb-2 py-2 border-t border-gray-500/50">
        <button
          type="button"
          @click="addTask"
          class="text-xl bg-sky-700 text-white p-2 px-4 rounded-md hover:bg-sky-600 h-min"
        >
          {{ taskStore.updateTaskModal ? 'Update' : 'Add' }}
        </button>
      </div>
    </div>
  </div>
</template>
