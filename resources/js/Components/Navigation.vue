<script setup lang="ts">
import NavLink from '../Components/NavLink.vue'
import {ref} from 'vue'

const isMenuOpen = ref<boolean>(false)
</script>

<template>
    <nav class="flex items-center justify-between">

        <div class="text-lg lg:text-2xl uppercase">
            <Link href="/">Task App</Link>
        </div>

        <button @click="isMenuOpen = !isMenuOpen" class="md:hidden">
            <i v-if="!isMenuOpen" class="fa-solid fa-bars"></i>
        </button>

        <div class="hidden md:flex items-center gap-20 text-lg">
            <NavLink href="/" component="Home" name="Domov"/>
            <NavLink href="/tasks" component="Tasks" name="Úlohy"/>
        </div>

        <div v-if="isMenuOpen"
             class="md:hidden flex flex-col items-center gap-5 text-md md:text-lg">
            <NavLink href="/" component="Home" name="Domov" @click="isMenuOpen = false"/>
            <NavLink href="/tasks" component="Tasks" name="Úlohy" @click="isMenuOpen = false"/>
        </div>
    </nav>
</template>
