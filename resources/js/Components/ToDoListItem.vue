<script setup lang="ts">
import type {ToDoItem} from '../types/to-do-item'
import {router} from '@inertiajs/vue3'
import {useTaskStore} from '../stores/taskStore'
import {ref} from 'vue'

const taskStore = useTaskStore()
const {markTaskAsComplete, setSelectedTask, deleteTask} = taskStore

const props = defineProps<{
    task: ToDoItem
}>()

const displayErrorMessage = ref<boolean>(false)

const handleCheck = (task: ToDoItem): void => {
    const completed = !task.completed
    router.patch(
        `/tasks/${task.id}`,
        {completed},
        {
            onSuccess: () => markTaskAsComplete(task, completed)
        }
    )
}

const handleEditToggle = (): void => setSelectedTask(props.task)

const handleDelete = (task: ToDoItem): void => {
    router.delete(
        `/tasks/${task.id}`,
        {
            onSuccess: () => deleteTask(task),
            onError: () => {
                displayErrorMessage.value = true
                setTimeout(() => {
                    displayErrorMessage.value = false
                }, 3000)
            }
        }
    )
}
</script>

<template>
    <li class="py-3 sm:py-4 cursor-pointer"
    >
        <div class="flex items-center space-x-4 rtl:space-x-reverse">
            <div class="inline-flex items-center">
                <label class="flex items-center cursor-pointer relative">
                    <input type="checkbox"
                           :checked="task.completed"
                           @change="handleCheck(task)"
                           class="peer h-6 w-6 cursor-pointer transition-all
                           appearance-none rounded-full bg-slate-100 shadow hover:shadow-md border border-slate-300
                           checked:bg-[#2F2E41] checked:border-[#2F2E41] "
                    />
                    <span
                        class="absolute text-white opacity-0 peer-checked:opacity-100
                        top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <i class="fa-solid fa-check fa-xs"
                        ></i>
                    </span>
                </label>
            </div>
            <div class="flex-1 min-w-0" @click="handleCheck(task)">
                <p class="text-lg font-medium truncate"
                   :class="task.completed ? 'line-through text-[#BAA0DD]' : 'text-white'"
                >
                    {{ task.name }}
                </p>
                <p class="text-sm text-[#3F3D56] break-words"
                   :class="task.completed ? 'line-through' : ''"
                >
                    {{ task.description }}
                </p>
            </div>
            <i class="fa-solid fa-pen cursor-pointer
                      text-white hover:shadow-[0_6px_20px_rgba(255,255,255,23%)]"
               @click="handleEditToggle"
            ></i>
            <i class="fa-solid fa-trash-can cursor-pointer
                      text-white hover:shadow-[0_6px_20px_rgba(255,255,255,23%)]"
               @click="handleDelete(task)"
            ></i>
        </div>
        <div v-if="displayErrorMessage" class="text-red-400 text-sm">Nepodarilo sa vymazať</div>
    </li>
</template>
