<template>
    <Head title=" | Domov" />
    <div
        class="flex flex-col gap-30 md:gap-50
    lg:flex-row lg:justify-between">
        <div
            class="flex flex-col space-y-4">
            <h1
                class="text-white uppercase lg:text-6xl/20 lg:w-2xl">
                Manažment vašich úloh
            </h1>
            <p
                class="text-[#E6E7E8] lg:text-2xl/10 lg:w-md">
                Jednoduchý spôsob, ako mať svoje úlohy pod kontrolou.
            </p>
            <Link
                href="/tasks"
                type="button"
                class="hover:shadow-[0_6px_20px_rgba(255,255,255,23%)] hover:bg-[rgba(255,255,255,0.9)]
                w-fit px-8 py-3 rounded-2xl mt-4
                bg-[#BAA0DD] shadow-[0_4px_14px_0_rgb(0,0,0,39%)]
                text-[#2F2E41] text-center lg:text-lg font-semibold
                transition duration-200 ease-linear">
                Plánovať úlohy
            </Link>
        </div>

        <img
            class="w-sm md:w-md lg:w-lg"
             src="../assets/home-picture.svg"
             alt="checklist"
        >
    </div>
</template>
