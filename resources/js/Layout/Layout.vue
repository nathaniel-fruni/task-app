<script setup lang="ts">
import NavLink from '../Components/NavLink.vue'
</script>

<template>
    <div class="flex flex-col
    min-h-screen  px-20 pt-15 pb-25
    bg-gradient-to-b from-[#1c0641]/80 to-[#65469A]/80
    font-poppins font-semibold">
        <header class="flex-0 text-white">
            <nav class="flex items-center justify-between mb-10">
                <div class="text-2xl uppercase">
                    <Link href="/">Task App</Link>
                </div>
                <div class="items-center space-x-20 text-lg text-[#E6E7E8]">
                    <NavLink href="/" component="Home" name="Domov"/>
                    <NavLink href="/tasks" component="Tasks" name="Úlohy"/>
                </div>
            </nav>
        </header>

        <main class="flex-1">
            <slot/>
        </main>
    </div>
</template>
