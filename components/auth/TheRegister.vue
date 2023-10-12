<template>
    <h1 class="sr-only">Register to your app account</h1>
    <h3 class="text-3xl font-['Noto Sans'] font-bold">Đăng Ký</h3>
    <div class="w-full max-w-sm mt-6">

        <div class="mb-6">
            <label for="user" class="block text-sm font-semibold leading-6 text-gray-900">Tài Khoản</label>
            <input type="text" id="user" placeholder="Tài khoản"
                class="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200" />
        </div>
        <div class="mb-6">
            <label for="email" class="block text-sm font-semibold leading-6 text-gray-900">Email</label>
            <input type="email" id="email" placeholder="Email"
                class="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200" />
        </div>
        <div class="mb-6">
            <label for="password" class="block text-sm font-semibold leading-6 text-gray-900">Mật Khẩu</label>
            <input type="password" id="password" placeholder="Mật khẩu"
                class="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200" />
        </div>
        <div class="mb-6">
            <label for="repassword" class="block text-sm font-semibold leading-6 text-gray-900">Xác Nhận Mật Khẩu</label>
            <input type="password" id="repassword" placeholder="Xác nhận mật khẩu"
                class="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200" />
        </div>
        <div class="mb-6">
            <label for="name" class="block text-sm font-semibold leading-6 text-gray-900">Họ và Tên</label>
            <div class="grid grid-cols-2 gap-x-2">
                <input type="text" id="name" placeholder="Họ"
                class="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200" />
                <input type="text" id="name" placeholder="Tên"
                class="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200" />
            </div>
        </div>
        <div class="mb-6">
            <label for="phone" class="block text-sm font-semibold leading-6 text-gray-900">Số Điện Thoại</label>
            <input type="text" id="phone" placeholder="Số điện thoại"
                class="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200" />
        </div>
        <button type="submit"
            class="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-slate-900 text-white hover:bg-slate-700 w-full">
            <span>Đăng Ký</span>
        </button>
    </div>
    <div class="relative shrink-0 pt-4 space-y-3">
        <div class="space-y-4 text-sm text-gray-900 sm:flex sm:items-center sm:justify-center sm:space-x-4 sm:space-y-0">
            <p class="text-center sm:text-left">Bạn đã có tài khoản!</p>
            <NuxtLink
                class="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 text-slate-500 ring-0 border border-slate-500 hover:border-slate-700 hover:text-gray-100 hover:bg-slate-700 duration-300 ease-out"
                to="/auth/login"><span>Đăng Nhập</span></NuxtLink>
        </div>
        <NuxtLink to="/" class="flex items-center gap-x-2 justify-center text-sm text-gray-500 font-light hover:text-gray-900 duration-300 ease-in-out">
            <ArrowLongLeftIcon class="w-4 h-4"/>
            <span>Trở về trang chủ</span>
        </NuxtLink>
    </div>
</template>

<script lang="ts" setup>
import { ArrowLongLeftIcon } from '@heroicons/vue/24/solid'

</script>