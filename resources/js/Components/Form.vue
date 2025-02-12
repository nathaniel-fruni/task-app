<script setup lang="ts">
import {useStore} from '../stores/store'
import {useForm} from '@inertiajs/vue3'
import {watch} from 'vue'
import {storeToRefs} from 'pinia'
import {ToDoItem} from '../types/to-do-item'

const store = useStore()
const {selectedTask, displayTaskForm} = storeToRefs(store)
const {toggleForm} = store

const form = useForm({
    name: selectedTask.value?.name || "",
    description: selectedTask.value?.description || "",
})

watch(() => selectedTask.value, (newTask) => {
    if (newTask) {
        updateFormWithTask(newTask)
    } else {
        resetForm()
    }
})

const updateFormWithTask = (task: ToDoItem): void => {
    form.name = task.name
    form.description = task.description
}

const resetForm = (): void => {
    form.reset()
}

const submit = (): void => {
    if (isFormValid()) {
        handleTaskRequest()
    } else {
        setDescriptionError()
    }
}

const isFormValid = (): boolean => {
    return form.description.length < 255
}

const handleTaskRequest = (): void => {
    if (selectedTask.value) {
        updateTask()
    } else {
        createTask()
    }
}

const updateTask = (): void => {
    form.put(`/tasks/${selectedTask.value?.id}`, {
        onSuccess: () => handleSuccess()
    })
}

const createTask = (): void => {
    form.post('/tasks', {
        onSuccess: () => handleSuccess()
    })
}

const setDescriptionError = (): void => {
    form.setError('description', 'Popis je príliš dlhý.')
}

const handleSuccess = (): void => {
    toggleForm()
    resetForm()
}
</script>

<template>
    <form v-if="displayTaskForm"
          class="h-fit w-full lg:w-1/4 p-10 space-y-2
          bg-[#7F7BAC]/50 rounded-2xl text-white text-lg"
          @submit.prevent="submit"
    >
        <h1 class="font-bold text-xl">Nová úloha</h1>
        <div class="space-y-3">
            <div class="relative">
                <input type="text" id="name" name="name" v-model="form.name" required
                       class="peer py-3 pe-0 block w-full
                              bg-transparent border-t-transparent border-b-2 border-x-transparent border-b-gray-200
                              text-sm focus:border-t-transparent focus:border-x-transparent focus:border-b-gray-400 focus:ring-0
                              disabled:opacity-50 disabled:pointer-events-none outline-none"
                       placeholder="Názov úlohy"
                >
                <div class="text-red-400 text-xs mt-2" v-if="form.errors.name">{{ form.errors.name }}</div>
            </div>
            <div class="relative">
                <textarea id="description" name="description" v-model="form.description" rows="3"
                          class="peer py-3 pe-0 block w-full
                                 bg-transparent border-t-transparent border-b-2 border-x-transparent border-b-gray-200
                                 text-sm text-gray-200 focus:border-t-transparent focus:border-x-transparent focus:border-b-gray-400 focus:ring-0
                                 disabled:opacity-50 disabled:pointer-events-none outline-none"
                          placeholder="Popis">
                </textarea>
                <div class="mt-2 text-red-400 text-xs" v-if="form.errors.description">{{
                        form.errors.description
                    }}
                </div>
            </div>
        </div>
        <button type="submit"
                class="w-fit px-8 py-1 mt-3 cursor-pointer
                       hover:shadow-[0_6px_20px_rgba(255,255,255,23%)] rounded-2xl
                       bg-[#BAA0DD] shadow-[0_4px_14px_0_rgb(0,0,0,39%)]
                       font-semibold text-white text-center lg:text-md
                       transition duration-200 ease-linear1 hover:scale-105">
            <i class="fa-solid fa-check"></i>
        </button>
    </form>
</template>
