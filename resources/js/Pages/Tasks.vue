<script setup lang="ts">
import {useStore} from '../stores/store'
import {storeToRefs} from 'pinia'
import type {ToDoItem} from '../types/to-do-item'
import ToDoList from '@/Components/ToDoList.vue'
import Form from '@/Components/Form.vue'

const store = useStore()
const {displayTaskForm} = storeToRefs(store)
const {toggleForm} = store

const props = defineProps<{
    tasks: ToDoItem[]
}>()
</script>

<template>
    <Head title=" | Úlohy"/>

    <div class="h-130 mt-10 flex flex-col lg:flex-row justify-evenly">
        <div
            class="w-full lg:w-1/2 h-full py-5 lg:py-10 mb-3
            flex flex-col items-center justify-between
            bg-[#7F7BAC]/50 rounded-2xl shadow-lg
            overflow-auto max-h-[80vh]"
        >
            <ToDoList :tasks="props.tasks"/>
            <button
                type="button"
                class="hover:shadow-[0_6px_20px_rgba(255,255,255,23%)]
                w-fit px-8 py-3 rounded-2xl mt-4 cursor-pointer
                bg-[#BAA0DD] shadow-[0_4px_14px_0_rgb(0,0,0,39%)]
                font-semibold text-white text-center text-sm lg:text-md
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
