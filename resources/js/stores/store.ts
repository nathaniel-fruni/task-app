import {defineStore} from 'pinia'
import {ref} from 'vue'
import type {ToDoItem} from '../types/to-do-item'

export const useStore = defineStore('task', () => {
    const selectedTask = ref<ToDoItem | null>(null)
    const displayTaskForm = ref<boolean>(false)

    const setSelectedTask = (task: ToDoItem): void => {
        selectedTask.value = task
        displayTaskForm.value = true
    }

    const toggleForm = (): void => {
        displayTaskForm.value = !displayTaskForm.value
        if (!displayTaskForm.value) {
            resetSelectedTask()
        }
    }

    const resetSelectedTask = (): void => {
        selectedTask.value = null
    }

    return {
        selectedTask,
        displayTaskForm,
        setSelectedTask,
        toggleForm
    }
})
