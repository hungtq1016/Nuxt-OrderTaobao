<template>
    <span class="relative group">
        <QuestionMarkCircleIcon class="w-4 h-4 text-gray-600"/>
        <div class="absolute right-0 hidden group-hover:inline-block translate-x-full top-0 z-10">
            <div class="bg-white shadow w-40 rounded-md px-2 py-1">
                <div class="text-sm font-medium text-gray-700">{{ title }}</div>
            <div class="text-xs font-light text-gray-600 " v-html="message"></div>
            </div>
        </div>
    </span>
</template>

<script setup lang="ts">
import { QuestionMarkCircleIcon } from '@heroicons/vue/24/solid';

    const props = defineProps(['message','title'])
</script>
