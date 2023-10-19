<template>
    <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          <!-- Sidebar component, swap this element with another sidebar if you like -->
          <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4">
            <div class="flex h-16 shrink-0 items-center">
              <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" />
            </div>
            <nav class="flex flex-1 flex-col">
              <ul role="list" class="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" class="-mx-2 space-y-1">
                    <li v-for="navigation in navigations" :key="navigation.title">
                      <NavigatorDropDown v-if="navigation.sub" :navigation="navigation"
                      class="text-gray-400 hover:text-white hover:bg-gray-800 rounded-md p-2 text-sm leading-6 font-semibold"/>
                      <NuxtLink :to="navigation.slug" v-else
                      class="text-gray-400 hover:text-white hover:bg-gray-800 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold">
                        <component :is="navigation.icon" class="h-6 w-6 shrink-0" aria-hidden="true" />
                        {{ navigation.title }}
                      </NuxtLink>
                      
                    </li>
                  </ul>
                </li>
              
                <li class="mt-auto">
                  <a href="#" class="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white">
                    <Cog6ToothIcon class="h-6 w-6 shrink-0" aria-hidden="true" />
                    Settings
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
    
</template>

<script setup lang="ts">
import { Navigation } from '~/type';
import { Cog6ToothIcon } from '@heroicons/vue/24/outline'
import NavigatorDropDown from './NavigatorDropDown.vue';

const props = defineProps({
    'navigations': Array<Navigation>
})

</script>

<style scoped lang="scss">
.router-link-active.router-link-exact-active{
  @apply bg-gray-800 text-white;
}
</style>
