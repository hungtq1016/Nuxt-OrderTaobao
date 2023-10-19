<template>
  <Menu as="div" class="text-left">
    <div>
      <MenuButton class="flex w-full items-center justify-between button">
        <NuxtLink :to="navigation.slug" class="flex gap-x-3 items-center dropdown">
          <component :is="navigation.icon" class="h-6 w-6 shrink-0" aria-hidden="true" />
          {{ navigation.title }}
        </NuxtLink>
        <ChevronDownIcon class="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
      </MenuButton>
    </div>

    <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
      <MenuItems class="mt-3 origin-top-right ring-1 ring-black ring-opacity-5 focus:outline-none sap">
        <div class="py-1">
          <MenuItem v-slot="{ active }" v-for="sub in navigation.sub">
            <NuxtLink :to="sub.slug"
              :class="[active ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-700', 'flex gap-x-3 items-center pl-6  py-2 text-sm rounded mt-1']">
              <component :is="sub.icon" class="h-6 w-6 shrink-0" aria-hidden="true" />
              {{ sub.title }}
            </NuxtLink>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>
  
<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'

const props = defineProps(['navigation'])
</script>

<style scoped lang="scss">
.router-link-active.router-link-exact-active:not(.dropdown) {
  @apply bg-gray-700 text-white;
}

.router-link-active.router-link-exact-active.dropdown {
  @apply text-white;
}
</style>