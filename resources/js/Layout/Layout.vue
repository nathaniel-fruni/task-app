<script setup lang="ts">
import NavLink from '../Components/NavLink.vue'
import {ref} from 'vue'

const isMenuOpen = ref<boolean>(false)
</script>

<template>
    <div class="flex flex-col
    h-dvh w-dvw px-10 py-10 lg:px-20 lg:py-15
    bg-gradient-to-b from-[#1c0641]/80 to-[#65469A]/80
    font-poppins font-semibold"
    >
        <header class="flex-0 text-white">
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
        </header>

        <main class="flex-2">
            <slot/>
        </main>
    </div>
</template>
