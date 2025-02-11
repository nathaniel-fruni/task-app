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
        <h1 class="text-white text-center text-2xl font-semibold p-2">
            <i class="fa-solid fa-bars mr-2"></i>
            Zoznam úloh
        </h1>
        <div class="text-lg text-white w-100 flex justify-between p-3">
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
        class="max-w-md h-320 pr-6 divide-y divide-gray-200 dark:divide-gray-700
               overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:w-2
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
    <h1 v-else class="text-white text-xl font-semibold p-3">Nemáte žiadne úlohy</h1>
</template>
