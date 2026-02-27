import { defineStore } from 'pinia'
import { api } from '../services/api'

export const useTaskStore = defineStore('task', {

  state: () => ({
    columns: [],
    displayFilterModal:false,
    filterValue:'',
    addTaskModal: '',
    updateTaskModal: '',
    taskToUpdate: {
      id: '',
      text: '',
      status: '',
      username: ''
    },
    users: [],
    shadowColors: [
      'bg-indigo-200 dark:bg-indigo-800',
      'bg-purple-200 dark:bg-purple-800',
      'bg-teal-200 dark:bg-teal-800',
      'bg-orange-200 dark:bg-orange-800',
      'bg-pink-200 dark:bg-pink-800',
    ]
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
    getUsers() {
      return api.get('/users')
        .then((res) => {
          this.users = res.data
        })
        .catch((error) => {
          console.error('Error fetching users:', error)
        })
    },

    loadAllData() {
      this.getColumns()
      this.getUsers()
    },

    addTask(task: any) {
      const column = this.columns.find(
        col => col.name === task.status
      )
      if (!column) return Promise.resolve()
      const newTask = {
        id: Date.now().toString(),
        text: task.text,
        username: task.username,
        status:task.status,
        priority: 'low',
        order: column.tasks.length
      }
      column.tasks.push(newTask)
      return api.put(`/columns/${column.id}`, column)
        .catch((error) => {
          console.error('Error adding task:', error)
        })
    },

    updateSetData(taskId: string, column: any) {
      const taskIndex = column.tasks.findIndex(
        (task: any) => task.id === taskId
      )

      if (taskIndex === -1) return

      const task = column.tasks[taskIndex]

      this.taskToUpdate.id = task.id
      this.taskToUpdate.text = task.text
      this.taskToUpdate.username = task.username
      this.taskToUpdate.status = column.name
      this.updateTaskModal = column.name
    },

    async updateTask(taskUpdated: any) {

      // 1️⃣ Find old column (where task currently exists)
      let oldColumn = null
      let taskIndex = -1

      for (const col of this.columns) {
        const index = col.tasks.findIndex((t: any) => t.id === taskUpdated.id)
        if (index !== -1) {
          oldColumn = col
          taskIndex = index
          break
        }
      }

      if (!oldColumn || taskIndex === -1) return

      const task = oldColumn.tasks[taskIndex]

      // 2️⃣ If column changed
      if (oldColumn.name !== taskUpdated.status) {

        // Remove from old column
        oldColumn.tasks.splice(taskIndex, 1)

        // Find new column
        const newColumn = this.columns.find(
          col => col.name === taskUpdated.status
        )

        if (!newColumn) return

        // Add to new column
        task.text = taskUpdated.text
        task.username = taskUpdated.username
        task.order = newColumn.tasks.length
        newColumn.tasks.push(task)

        // Save both columns
        await Promise.all([
          api.put(`/columns/${oldColumn.id}`, oldColumn),
          api.put(`/columns/${newColumn.id}`, newColumn)
        ])
      } else {
        // 3️⃣ If column same → just update text
        task.text = taskUpdated.text
        task.username = taskUpdated.username
        await api.put(`/columns/${oldColumn.id}`, oldColumn)
      }
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
      this.updateTaskModal = ''
    }
  }
})