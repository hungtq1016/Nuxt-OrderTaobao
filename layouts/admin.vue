
<template>
  <div>
    <NavigatorMobile :navigations="navigations" :sidebar-open="sidebarOpen" @close="() => sidebarOpen = false" />
    <!-- Static sidebar for desktop -->
    <Navigator :navigations="navigations" />

    <div class="lg:pl-72">
      <div
        class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
        <button type="button" class="-m-2.5 p-2.5 text-gray-700 lg:hidden" @click="sidebarOpen = true">
          <span class="sr-only">Open sidebar</span>
          <Bars3Icon class="h-6 w-6" aria-hidden="true" />
        </button>
        <TheHeader />


      </div>
      <main class="py-10">
        <div class="px-4 sm:px-6 lg:px-8">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue'
import { CalendarIcon, ChartPieIcon, DocumentDuplicateIcon, FolderIcon, HomeIcon, UsersIcon,Bars3Icon } from '@heroicons/vue/24/outline'
import Navigator from '~/components/include/header/Admin/Navigator.vue';
import NavigatorMobile from '~/components/include/header/Admin/NavigatorMobile.vue';
import { Navigation } from '~/type';
import { BookOpenIcon, ListBulletIcon, PhotoIcon, PlusIcon } from '@heroicons/vue/24/solid';
import TheHeader from '~/components/admin/include/TheHeader.vue';

const navigations: Array<Navigation> = [
  { title: 'Trang Chủ', slug: '/admin', icon: HomeIcon, enable: true },
  {
    title: 'Người Dùng', slug: '/admin/user', icon: UsersIcon, enable: false,
    sub: [
      { title: 'Danh Sách', slug: '/admin/user', icon: BookOpenIcon, enable: false },
      { title: 'Thêm', slug: '/admin/user/add', icon: PlusIcon, enable: false }
    ]
  },

  { title: 'Thể Loại', slug: '/admin/category', icon: ListBulletIcon, enable: false },
  { title: 'Images', slug: '/admin/image', icon: PhotoIcon, enable: false },
  { title: 'Projects', slug: '#', icon: FolderIcon, enable: false },
  { title: 'Calendar', slug: '#', icon: CalendarIcon, enable: false },
  { title: 'Documents', slug: '#', icon: DocumentDuplicateIcon, enable: false },
  { title: 'Reports', slug: '#', icon: ChartPieIcon, enable: false },

]
const sidebarOpen = ref(false)
</script>