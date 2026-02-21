import { defineStore } from 'pinia'
import axios from 'axios'

export const useTaskStore = defineStore('task', {

  state: () => ({
    tasks: [],
    status: [],
    priority: [],
    addTaskModal: ''
  }),

  getters: {
    getTaskId: () => Date.now()
  },

  actions: {

    getTasks() {
      return new Promise((resolve, reject) => {
        axios
          .get('http://localhost:3000/tasks')
          .then((response) => {
            this.tasks = response.data
            resolve(response)
          })
          .catch((err) => {
            console.error(err)
            reject(err)
          })
      })
    },

    getStatus(params: any = {}) {
      return new Promise((resolve, reject) => {
        axios
          .get('http://localhost:3000/status', { params })
          .then((response) => {
            this.status = response.data
            resolve(response)
          })
          .catch((err) => {
            console.error(err)
            reject(err)
          })
      })
    },

    getPriority(params: any = {}) {
      return new Promise((resolve, reject) => {
        axios
          .get('http://localhost:3000/priority', { params })
          .then((response) => {
            this.priority = response.data
            resolve(response)
          })
          .catch((err) => {
            console.error(err)
            reject(err)
          })
      })
    },

    loadAllData() {
      return Promise.all([
        this.getTasks(),
        this.getStatus(),
        this.getPriority()
      ])
    },

    addTask(task: any) {
      return new Promise((resolve, reject) => {
        axios
          .post('http://localhost:3000/tasks', {
            id: Date.now().toString(),
            text: task.name,
            status: task.status,
            priority: 'low'
          })
          .then((response) => {
            this.tasks.push(response.data)
            resolve(response)
          })
          .catch((err) => {
            console.error(err)
            reject(err)
          })
      })
    },

    deleteTask(id: number) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`http://localhost:3000/tasks/${id}`)
          .then((response) => {
            this.tasks = this.tasks.filter(task => task.id !== id)
            resolve(response)
          })
          .catch((err) => {
            console.error(err)
            reject(err)
          })
      })
    },

    updateTask(updatedTask: any) {
      return new Promise((resolve, reject) => {

        // Optimistic update
        const index = this.tasks.findIndex(t => t.id === updatedTask.id)

        if (index !== -1) {
          this.tasks[index] = { ...updatedTask }
        }

        axios
          .put(
            `http://localhost:3000/tasks/${updatedTask.id}`,
            updatedTask,
            {
              headers: {
                "Content-Type": "application/json"
              }
            }
          )
          .then((response) => {
            resolve(response)
          })
          .catch((err) => {
            console.error("Error updating task:", err)
            reject(err)
          })
      })
    },

    closeModal() {
      this.addTaskModal = ''
    }
  }
})