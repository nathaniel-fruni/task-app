import {defineStore} from 'pinia'
import {ref} from 'vue'
import type {ToDoItem} from '../types/to-do-item'

export const useTaskStore = defineStore('task', () => {
    const tasks = ref<ToDoItem[]>([])
    const selectedTask = ref<ToDoItem | null>(null)
    const displayTaskForm = ref<boolean>(false)

    const addTask = (newTask: ToDoItem) => {
        tasks.value.push(newTask)
    }

    const deleteTask = (deletedTask: ToDoItem) => {
        tasks.value = tasks.value.filter(t => t.id !== deletedTask.id)
    }

    const updateTask = (updatedTask: ToDoItem) => {
        const index = tasks.value.findIndex((t) => t.id === updatedTask.id)

        if (index !== -1) {
            tasks.value[index] = updatedTask
        } else {
            console.error(`Úloha s id ${updatedTask.id} nenájdená.`)
        }
    }

    const markTaskAsComplete = (task: ToDoItem, completed: boolean) => {
        const taskInStore = tasks.value.find(t => t.id === task.id)

        if (taskInStore) {
            taskInStore.completed = completed
        } else {
            console.error(`Úloha s id ${task.id} nenájdená.`)
        }
    }

    const setSelectedTask = (task: ToDoItem) => {
        selectedTask.value = task
        displayTaskForm.value = true
    }

    const resetSelectedTask = () => {
        selectedTask.value = null
    }

    const toggleForm = () => {
        displayTaskForm.value = !displayTaskForm.value
        if (!displayTaskForm.value) {
            resetSelectedTask()
        }
    }

    return {
        tasks,
        selectedTask,
        displayTaskForm,
        addTask,
        deleteTask,
        updateTask,
        markTaskAsComplete,
        setSelectedTask,
        toggleForm
    }
})
