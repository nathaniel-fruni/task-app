<script setup lang="ts">
import { usePage } from '@inertiajs/vue3';

defineProps<{
    href: string;
    component: string;
    name: string;
}>();

const page = usePage<{component: string}>();
</script>

<template>
    <Link
        :href="href"
          class="hover:text-[#BAA0DD]"
          :class="{'text-[#BAA0DD]' : page.component === component}"
    >
        {{name}}
    </Link>
</template>
