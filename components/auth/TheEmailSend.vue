<template>
    <h1 class="sr-only">Reset password</h1>
   <h3 class="text-3xl font-['Noto Sans'] font-bold">Xác Nhận Email</h3>
   <div class="w-full max-w-sm mt-6">

       <div class="mb-6">
           <label for="user" class="block text-sm font-semibold leading-6 text-gray-900">Email đã đăng ký</label>
           <input type="text" id="user" placeholder="Email"
               class="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200" />
       </div>
       <button type="submit"
           class="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-slate-900 text-white hover:bg-slate-700 w-full">
           <span>Gửi</span>
       </button>

   </div>
   <div class="relative shrink-0 pt-4 space-y-3">
       <NuxtLink to="/auth/login" class="flex items-center gap-x-2 justify-center text-sm text-gray-500 font-light hover:text-gray-900 duration-300 ease-in-out">
           <ArrowLongLeftIcon class="w-4 h-4"/>
           <span>Trở về đăng nhập</span>
       </NuxtLink>
   </div>
</template>

<script setup lang="ts">
import { ArrowLongLeftIcon } from '@heroicons/vue/24/solid'

</script>
