<script setup lang="ts">
import {useTaskStore} from '../stores/taskStore'
import {storeToRefs} from 'pinia'
import {onMounted} from "vue";
import type {ToDoItem} from '../types/to-do-item'
import ToDoList from '@/Components/ToDoList.vue'
import Form from '@/Components/Form.vue'

const taskStore = useTaskStore()
const {tasks, displayTaskForm} = storeToRefs(taskStore)
const {toggleForm} = taskStore

const props = defineProps<{
    tasks: ToDoItem[]
}>()

onMounted(() => {
    tasks.value = props.tasks
})
</script>

<template>
    <Head title=" | Úlohy"/>

    <div class="h-130 flex justify-evenly mt-10">
        <div
            class="w-1/2 h-full p-10 bg-[#7F7BAC]/50
            flex flex-col items-center justify-between rounded-2xl shadow-lg"
        >
            <ToDoList/>
            <button
                type="button"
                class="hover:shadow-[0_6px_20px_rgba(255,255,255,23%)]
                w-fit px-8 py-3 rounded-2xl mt-4 cursor-pointer
                bg-[#BAA0DD] shadow-[0_4px_14px_0_rgb(0,0,0,39%)]
                text-white text-center lg:text-md font-semibold
                transition duration-200 ease-linear1 hover:scale-105"
                @click="toggleForm"
            ><i :class="displayTaskForm ? 'fa-solid fa-minus' : 'fa-solid fa-plus'"
                class="mr-2">
            </i>
                {{ displayTaskForm ? 'Zrušiť' : 'Pridať' }}
            </button>
        </div>

        <Form/>
    </div>
</template>
