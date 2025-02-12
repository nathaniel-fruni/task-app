<script setup lang="ts">
import Navigation from '../Components/Navigation.vue';
</script>

<template>
    <div class="flex flex-col
    h-dvh w-dvw px-10 py-10 lg:px-20 lg:py-15
    bg-gradient-to-b from-[#1c0641]/80 to-[#65469A]/80
    font-poppins font-semibold"
    >
        <header class="flex-0 text-white">
            <Navigation/>
        </header>

        <main class="flex-2">
            <slot/>
        </main>
    </div>
</template>
