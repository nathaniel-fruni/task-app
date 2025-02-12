<template>
    <Head title=" | Domov"/>

    <div
        class="flex flex-col items-center justify-between mt-15
        md:flex-row
        lg:justify-between lg:mt-25"
    >
        <div class="flex flex-col space-y-4">
            <h1 class="text-white text-lg lg:text-6xl/20 lg:w-2xl uppercase">
                Manažment vašich úloh
            </h1>
            <p class="text-[#E6E7E8] text-sm lg:text-2xl/10 lg:w-md">
                Jednoduchý spôsob, ako mať svoje úlohy pod kontrolou.
            </p>
            <Link
                href="/tasks"
                type="button"
                class="hover:shadow-[0_6px_20px_rgba(255,255,255,23%)] hover:bg-[rgba(255,255,255,0.9)]
                w-fit px-8 py-3 rounded-2xl mt-4 mb-25 md:mb-10
                bg-[#BAA0DD] shadow-[0_4px_14px_0_rgb(0,0,0,39%)]
                font-semibold text-[#2F2E41] text-center text-sm md:text-lg
                transition duration-200 ease-linear hover:scale-105">
                Plánovať úlohy
            </Link>
        </div>

        <img
            class="w-xs md:w-md lg:w-lg"
            src="../assets/home-picture.svg"
            alt="person-and-task-list-illustration"
        >
    </div>
</template>
