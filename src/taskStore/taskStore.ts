import { defineStore } from 'pinia'
import { api } from '../services/api'

export const useTaskStore = defineStore('task', {

  state: () => ({
    columns: [],
    addTaskModal: ''
  }),

  getters: {
    getTaskId: () => Date.now().toString()
  },

  actions: {

    getColumns() {
      return api.get('/columns')
        .then((res) => {
          this.columns = res.data
        })
        .catch((error) => {
          console.error('Error fetching columns:', error)
        })
    },

    loadAllData() {
      return this.getColumns()
    },

    addTask(task: any) {
      const column = this.columns.find(
        col => col.name === task.status
      )

      if (!column) return Promise.resolve()

      const newTask = {
        id: Date.now().toString(),
        text: task.name,
        priority: 'low',
        order: column.tasks.length
      }

      column.tasks.push(newTask)

      return api.put(`/columns/${column.id}`, column)
        .catch((error) => {
          console.error('Error adding task:', error)
        })
    },

    deleteTask(taskId: string, column: any) {

      column.tasks = column.tasks.filter(t => t.id !== taskId)

      // Recalculate order
      column.tasks.forEach((task, index) => {
        task.order = index
      })

      return api.put(`/columns/${column.id}`, column)
        .catch((error) => {
          console.error('Error deleting task:', error)
        })
    },
    async saveAllColumns() {
      try {
        await Promise.all(
          this.columns.map(column =>
            api.put(`/columns/${column.id}`, column)
          )
        )
      } catch (error) {
        console.error("Error saving columns:", error)
      }
    },

    closeModal() {
      this.addTaskModal = ''
    }
  }
})