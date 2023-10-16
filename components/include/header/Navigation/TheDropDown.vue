<template>
    <Popover class="relative">
        <PopoverButton class="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
            Product
            <ChevronDownIcon class="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
        </PopoverButton>

        <transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 translate-y-1"
            enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-150"
            leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-1">
            <PopoverPanel
                class="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                <div class="p-4">
                    <div v-for="item in navigations" :key="item.title"
                        class="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
                        <div
                            class="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                            <component :is="item.icon" class="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                                aria-hidden="true" />
                        </div>
                        <div class="flex-auto">
                            <a :href="item.slug" class="block font-semibold text-gray-900">
                                {{ item.title }}
                                <span class="absolute inset-0" />
                            </a>
                            <p class="mt-1 text-gray-600">{{ item.description }}</p>
                        </div>
                    </div>
                </div>
                <div class="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                    <a v-for="item in callsToAction" :key="item.name" :href="item.href"
                        class="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100">
                        <component :is="item.icon" class="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                        {{ item.name }}
                    </a>
                </div>
            </PopoverPanel>
        </transition>
    </Popover>
</template>

<script setup lang="ts">

import { Popover, PopoverButton, PopoverPanel, } from '@headlessui/vue'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/vue/20/solid'
import { Navigation } from '~/type';

const props = defineProps({
    navigations: Array<Navigation>
})

const callsToAction = [
    { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
    { name: 'Contact sales', href: '#', icon: PhoneIcon },
]
</script>
