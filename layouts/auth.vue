<template>
    <div class="absolute inset-0 text-slate-900/[0.07] [mask-image:linear-gradient(to_bottom_left,white,transparent,transparent)]">
        <SquareGridIcon class="absolute inset-0 h-full w-full"/>
    </div>
    <main class="relative flex flex-1 flex-col overflow-hidden px-4 py-8 sm:px-6 lg:px-8 min-h-screen">
        <div class="relative flex flex-1 flex-col items-center justify-center pb-16 pt-12">
            <slot/>
        </div>
    </main>
</template>

<script setup lang="ts">
import {SquareGridIcon} from '~/components/svg';

</script>

