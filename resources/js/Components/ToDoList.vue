<script setup lang="ts">
import {computed, ref} from 'vue'
import {ToDoItem} from '../types/to-do-item'
import ToDoListItem from './ToDoListItem.vue'

const props = defineProps<{
    tasks: ToDoItem[]
}>()

enum TaskFilter {
    All = 'all',
    Todo = 'todo',
    Done = 'done'
}

const filters: { name: TaskFilter; label: string }[] = [
    {name: TaskFilter.All, label: 'Všetky'},
    {name: TaskFilter.Todo, label: 'Nespravené'},
    {name: TaskFilter.Done, label: 'Spravené'}
]
const filterFunctions: Record<TaskFilter, (task: ToDoItem) => boolean> = {
    [TaskFilter.All]: () => true,
    [TaskFilter.Todo]: (task) => !task.completed,
    [TaskFilter.Done]: (task) => task.completed
}

const taskFilter = ref<TaskFilter>(TaskFilter.All)
const filteredTasks = computed(() => props.tasks.filter(filterFunctions[taskFilter.value]))
</script>

<template>
    <div>
        <h1 class="p-2 font-semibold text-white text-center text-xl  md:text-2xl">
            <i class="fa-solid fa-bars mr-2"></i>
            Zoznam úloh
        </h1>
        <div class="w-xs flex justify-evenly p-3 mb-2
                    text-white text-sm md:text-lg lg:w-md"
        >
            <p
                v-for="filter in filters"
                :key="filter.name"
                class="cursor-pointer"
                :class="{'text-[#3F3D56]' : taskFilter === filter.name}"
                @click="taskFilter = filter.name">
                {{ filter.label }}
            </p>
        </div>
    </div>

    <ul v-if="filteredTasks.length > 0"
        class="w-xs h-320 px-14 lg:w-md lg:px-0
               divide-y divide-gray-200 dark:divide-gray-700
               text-xs lg:text-lg
               overflow-y-auto overflow-x-hidden
               [&::-webkit-scrollbar]:w-2
               [&::-webkit-scrollbar-track]:rounded-full
               [&::-webkit-scrollbar-track]:bg-gray-400
               [&::-webkit-scrollbar-thumb]:rounded-full
               [&::-webkit-scrollbar-thumb]:bg-gray-100"
    >
        <ToDoListItem
            v-for="task in filteredTasks"
            :key="task.id"
            :task="task"
        />
    </ul>
    <h1 v-else class="p-3 font-semibold text-white text-md md:text-xl">Nemáte žiadne úlohy</h1>
</template>
