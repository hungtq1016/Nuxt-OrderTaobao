<template>
    <header class="bg-white">
      <nav class="mx-auto flex max-w-screen-xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div class="flex">
          <a href="#" class="-m-1.5 p-1.5">
            <span class="sr-only">Your Company</span>
            <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
          </a>
        </div>
        <div class="flex lg:hidden">
          <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = true">
            <span class="sr-only">Open main menu</span>
            <Bars3Icon class="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <PopoverGroup class="hidden lg:flex lg:gap-x-12">
          <TheDropDown :navigations="navigations"/>
          <NuxtLink to="/admin" class="text-sm font-semibold leading-6 text-gray-900">Admin</NuxtLink>
          <NuxtLink to="/auth/register" class="text-sm font-semibold leading-6 text-gray-900">Đăng Ký</NuxtLink>
          <NuxtLink to="/auth" class="text-sm font-semibold leading-6 text-gray-900">Marketplace</NuxtLink>
          <a href="#" class="text-sm font-semibold leading-6 text-gray-900">Company</a>
        </PopoverGroup>
        <TheUser/>
      </nav>
      
      <!-- <TheNavigationMobile :mobileMenuOpen="mobileMenuOpen" :products="products" :callsToAction="callsToAction" @close="()=>mobileMenuOpen = false"/> -->
    </header>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { Navigation } from '~/type';
  import { PopoverGroup } from '@headlessui/vue'
  import { ArrowPathIcon, Bars3Icon, ChartPieIcon, CursorArrowRaysIcon, FingerPrintIcon, SquaresPlusIcon, } from '@heroicons/vue/24/outline'
  import TheUser from './TheUser.vue';
  import TheDropDown from './TheDropDown.vue';
  import {userPermisson} from '~/composables/usePermission';

   userPermisson()
  const navigations : Array<Navigation> = [
    { title: 'Analytics', description: 'Get a better understanding of your traffic', slug: '#', icon: ChartPieIcon },
    { title: 'Engagement', description: 'Speak directly to your customers', slug: '#', icon: CursorArrowRaysIcon },
    { title: 'Security', description: 'Your customers’ data will be safe and secure', slug: '#', icon: FingerPrintIcon },
    { title: 'Integrations', description: 'Connect with third-party tools', slug: '#', icon: SquaresPlusIcon },
    { title: 'Automations', description: 'Build strategic funnels that will convert', slug: '#', icon: ArrowPathIcon },
  ]


  const mobileMenuOpen = ref(false)
  </script>