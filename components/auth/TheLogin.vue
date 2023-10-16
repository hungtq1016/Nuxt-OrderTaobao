// tạo ra một mẫu có thể được sử dụng để tạo ra một nhóm.
<template>
    <h1 class="sr-only">Log in to your app account</h1>
    <h3 class="text-3xl font-bold">Đăng Nhập</h3>
    <div class="w-full max-w-sm mt-6">
        <div class="mb-2">
            <button
                class="flex items-center justify-center gap-x-2 appearance-none text-slate-900 bg-white rounded-md w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 border border-slate-400 hover:bg-slate-50/80 hover:border-slate-600 duration-300 ease-in">
                <GoogleIcon class="w-6 h-6" />
                <span>Đăng Nhập Bằng Google</span>
            </button>
        </div>
        <div class="mb-6 grid grid-cols-2 gap-x-2">
            <button
                class="flex items-center justify-center gap-x-2 appearance-none text-slate-900 bg-white rounded-md w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 border border-slate-400 hover:bg-slate-50/80 hover:border-slate-600 duration-300 ease-in">
                <FacebookIcon class="w-6 h-6" />
                <span>Facebook</span>
            </button>
            <button
                class="flex items-center justify-center gap-x-2 appearance-none text-slate-900 bg-white rounded-md w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 border border-slate-400 hover:bg-slate-50/80 hover:border-slate-600 duration-300 ease-in">
                <TwitterIcon class="w-6 h-6" />
                <span>X (Twitter)</span>
            </button>
        </div>
        <div class="relative">
            <div class="flex justify-center"><span class="bg-white px-2">or</span></div>
            <div class="absolute top-1/2 inset-x-0 border -z-10 border-gray-300"></div>
        </div>
        <div class="mb-6">
            <label for="user" class="block text-sm font-semibold leading-6 text-gray-900">Tài Khoản</label>
            <input type="text" id="user" placeholder="Tài khoản" v-model="login.username" @change="validateUserName(login.username)"
                class="mt-2 appearance-none text-slate-900 border bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200"
                :class="{'border border-red-600':unameValidate.isError}"/>
                <div v-if="unameValidate.isError" class="text-xs font-light text-red-600 mt-1">{{ unameValidate.message }}</div>
        </div>
        <div class="mb-6">
            <label for="password" class="text-sm font-semibold leading-6 text-gray-900 flex gap-x-2 items-center">Mật Khẩu <TheToolTip v-bind="request"/></label>
            <div class="relative">
                <input type="password" id="password" placeholder="Mật khẩu" v-model="login.password" @change="validatePassword(login.password)" ref="input1"
                class="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200" 
                :class="{'border border-red-600':pwValidate.isError}"/>
                <button class="absolute right-2 top-1/2 -translate-y-1/2" @click="togglePassword">
                    <EyeIcon class="w-4 h-4 text-gray-600"/>
                </button>
            </div>
            <div v-if="pwValidate.isError" class="text-xs font-light text-red-600 mt-1">{{ pwValidate.message }}</div>
        </div>
        <button type="submit" @click="submit"
            class="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-slate-900 text-white hover:bg-slate-700 w-full">
            <span>Đăng Nhập</span>
        </button>
        <p class="mt-8 text-center">
            <NuxtLink to="/auth/forgot-password" class="text-sm hover:underline font-semibold text-gray-900 underline">Quên
                Mật Khẩu?</NuxtLink>
        </p>
    </div>
    <div class="relative shrink-0 pt-4 space-y-3">
        <div class="space-y-4 text-sm text-gray-900 sm:flex sm:items-center sm:justify-center sm:space-x-4 sm:space-y-0">
            <p class="text-center sm:text-left">Bạn chưa có tài khoản?</p>
            <NuxtLink
                class="flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 text-slate-500 ring-0 border border-slate-500 hover:border-slate-700 hover:text-gray-100 hover:bg-slate-700 duration-300 ease-out"
                to="/auth/register"><span>Đăng Ký</span></NuxtLink>
        </div>
        <NuxtLink to="/"
            class="flex items-center gap-x-2 justify-center text-sm text-gray-500 font-light hover:text-gray-900 duration-300 ease-in-out">
            <ArrowLongLeftIcon class="w-4 h-4" />
            <span>Trở về trang chủ</span>
        </NuxtLink>
    </div>
</template>

<script setup lang="ts">
import {GoogleIcon,FacebookIcon,TwitterIcon} from '~/components/svg';
import TheToolTip from './TheToolTip.vue';
import { ArrowLongLeftIcon, EyeIcon } from '@heroicons/vue/24/solid'
import {LoginLogic,AuthLogic} from "~/logic/pages/auth";

const runtimeConfig = useRuntimeConfig()

const {login,LoginAsync} = LoginLogic();
const {unameValidate,input1,pwValidate,togglePassword,validatePassword,validateUserName} = AuthLogic();

const request = {
    title:'Yêu cầu',
    message:'Phải có ít nhất 1 chữ hoa <br/> Phải có ít nhất 1 ký tự đặc biệt (!,@,#,...)<br/>Phải có ít nhất 1 số<br/>Phải dài trên 8 ký tự',
}

const submit = async () => {
    await LoginAsync(login.value,`${runtimeConfig.public.apiBase}/authenticate/login`)
}

</script>
