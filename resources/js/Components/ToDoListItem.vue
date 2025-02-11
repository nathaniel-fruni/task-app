<script setup lang="ts">
import type {ToDoItem} from '../types/to-do-item'
import {router} from '@inertiajs/vue3'
import {useStore} from '../stores/store'

const store = useStore()
const {setSelectedTask} = store

const props = defineProps<{
    task: ToDoItem
}>()

const markTaskAsCompleted = (id: number, completed: boolean): void => {
    router.patch(`/tasks/${id}`, {completed})
}

const handleEditToggle = (): void => setSelectedTask(props.task)

const deleteTask = (id: number) => router.delete(`/tasks/${id}`)
</script>

<template>
    <li class="py-3 sm:py-4 cursor-pointer"
    >
        <div class="flex items-center space-x-4 rtl:space-x-reverse">
            <div class="inline-flex items-center">
                <label class="flex items-center cursor-pointer relative">
                    <input type="checkbox"
                           :checked="task.completed"
                           @change="markTaskAsCompleted(task.id, !task.completed)"
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
            <div class="flex-1 min-w-0" @click="markTaskAsCompleted(task.id, !task.completed)">
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
               @click="deleteTask(task.id)"
            ></i>
        </div>
    </li>
</template>
