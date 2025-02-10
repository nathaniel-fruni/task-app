<script setup lang="ts">
import {useTaskStore} from '../stores/taskStore'
import {useForm} from '@inertiajs/vue3'
import {watch} from 'vue'
import {storeToRefs} from 'pinia';

const taskStore = useTaskStore()
const {selectedTask, displayTaskForm} = storeToRefs(taskStore)
const {toggleForm, updateTask, addTask} = taskStore

const form = useForm({
    name: selectedTask.value?.name || "",
    description: selectedTask.value?.description || "",
})

watch(() => selectedTask.value, (newTask) => {
    if (newTask) {
        form.name = newTask.name;
        form.description = newTask.description;
    } else {
        form.name = "";
        form.description = "";
    }
})

const submit = (): void => {
    if (validateForm()) {
        if (selectedTask.value) {
            form.put(
                `/tasks/${selectedTask.value.id}`, {
                    onSuccess: (response) => handleSuccess("edit", response.props.updatedTask),
                    onError: (error) => console.log(error),
                })
        } else {
            form.post(
                '/tasks', {
                    onSuccess: (response) => handleSuccess("add", response.props.newTask),
                    onError: (error) => console.log(error),
                })
        }
    } else {
        form.setError({
            name: '',
            description: 'Popis je príliš dlhý.',
        })
    }
}

const validateForm = (): boolean => {
    return form.description.length < 255
}

const handleSuccess = (action: string, task: any): void => {
    if (action === "edit") {
        updateTask(task)
    } else {
        addTask(task)
    }
    toggleForm()
    form.reset()
}
</script>

<template>
    <form v-if="displayTaskForm"
          class="w-1/4 p-10 space-y-2 bg-[#7F7BAC]/50 rounded-2xl text-white text-lg h-fit"
          @submit.prevent="submit"
    >
        <h1 class="font-bold text-xl">Nová úloha</h1>
        <div class="space-y-3">
            <div class="relative">
                <input type="text" name="name" v-model="form.name" required
                       class="peer py-3 pe-0 block w-full
                              bg-transparent border-t-transparent border-b-2 border-x-transparent border-b-gray-200
                              text-sm focus:border-t-transparent focus:border-x-transparent focus:border-b-gray-400 focus:ring-0
                              disabled:opacity-50 disabled:pointer-events-none outline-none"
                       placeholder="Názov úlohy"
                >
                <div class="text-red-400 text-xs mt-2" v-if="form.errors.name">{{ form.errors.name }}</div>
            </div>
            <div class="relative">
                <textarea name="description" v-model="form.description" rows="3"
                          class="peer py-3 pe-0 block w-full
                                 bg-transparent border-t-transparent border-b-2 border-x-transparent border-b-gray-200
                                 text-sm focus:border-t-transparent focus:border-x-transparent focus:border-b-gray-400 focus:ring-0
                                 disabled:opacity-50 disabled:pointer-events-none outline-none"
                          placeholder="Popis">
                </textarea>
                <div class="text-red-400 text-xs mt-2" v-if="form.errors.description">{{
                        form.errors.description
                    }}
                </div>
            </div>
        </div>
        <button type="submit"
                class="hover:shadow-[0_6px_20px_rgba(255,255,255,23%)] w-fit px-8 py-1 rounded-2xl mt-3 cursor-pointer
                       bg-[#BAA0DD] shadow-[0_4px_14px_0_rgb(0,0,0,39%)] text-white text-center lg:text-md font-semibold
                       transition duration-200 ease-linear1 hover:scale-105">
            <i class="fa-solid fa-check"></i>
        </button>
    </form>
</template>
