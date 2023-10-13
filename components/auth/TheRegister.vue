<template>
    <h1 class="sr-only">Register to your app account</h1>
    <h3 class="text-3xl font-bold">Đăng Ký</h3>
    <div class="w-full max-w-sm mt-6">

        <div class="mb-6">
            <label for="user" class="block text-sm font-semibold leading-6 text-gray-900">Tài Khoản</label>
            <input type="text" id="user" placeholder="Tài khoản" v-model="register.username" @change="validateUserName(register.username)" autocomplete="username"
                class="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200" 
                :class="{'border border-red-600':unameValidate.isError}"/>
                <div v-if="unameValidate.isError" class="text-xs font-light text-red-600 mt-1">{{ unameValidate.message }}</div>

        </div>
        <div class="mb-6">
            <label for="email" class="block text-sm font-semibold leading-6 text-gray-900">Email</label>
            <input type="email" id="email" placeholder="Email" v-model="register.email" @change="validateEmail(register.email)" autocomplete="email"
                class="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200" 
                :class="{'border border-red-600':emailValidate.isError}"/>
            <div v-if="emailValidate.isError" class="text-xs font-light text-red-600 mt-1">{{ emailValidate.message }}</div>
        </div>
        <div class="mb-6">
            <label for="password" class="text-sm font-semibold leading-6 text-gray-900 flex gap-x-2 items-center">Mật Khẩu <TheToolTip v-bind="request"/></label>
            <div class="relative">
                <input type="password" id="password" placeholder="Mật khẩu" v-model="register.password" @change="validatePassword(register.password)" ref="input1" autocomplete="password"
                class="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200" 
                :class="{'border border-red-600':pwValidate.isError}"/>
                <button class="absolute right-2 top-1/2 -translate-y-1/2" @click="togglePassword">
                    <EyeIcon class="w-4 h-4 text-gray-600"/>
                </button>
            </div>
            <div v-if="pwValidate.isError" class="text-xs font-light text-red-600 mt-1">{{ pwValidate.message }}</div>
        </div>
        <div class="mb-6">
            <label for="repassword" class="text-sm font-semibold leading-6 text-gray-900 flex gap-x-2 items-center">Xác Nhận Mật Khẩu</label>
            <div class="relative">
                <input type="password" id="repassword" placeholder="Mật khẩu" v-model="register.repassword" @change="validateRePassword(register.password,register.repassword)" ref="input2" autocomplete="re-password"
                class="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200" 
                :class="{'border border-red-600':rpwValidate.isError}"/>
                <button class="absolute right-2 top-1/2 -translate-y-1/2" @click="toggleRePassword">
                    <EyeIcon class="w-4 h-4 text-gray-600"/>
                </button>
            </div>
            <div v-if="rpwValidate.isError" class="text-xs font-light text-red-600 mt-1">{{ rpwValidate.message }}</div>
        </div>
        <div class="mb-6">
            <label for="fname" class="block text-sm font-semibold leading-6 text-gray-900">Họ và Tên</label>
            <div class="grid grid-cols-2 gap-x-2">
                <div>
                    <input type="text" id="fname" placeholder="Họ" v-model="register.fname" @change="validateFirstName(register.fname)" autocomplete="first-name"
                    class="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200" 
                    :class="{'border border-red-600':fnameValidate.isError}"/>
                    <div v-if="fnameValidate.isError" class="text-xs font-light text-red-600 mt-1">{{ fnameValidate.message }}</div>
                </div>
                <div>
                    <input type="text" id="lname" placeholder="Tên" v-model="register.lname" @change="validateLastName(register.lname)" autocomplete="last-name"
                    class="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200" 
                    :class="{'border border-red-600':lnameValidate.isError}"/>
                    <div v-if="lnameValidate.isError" class="text-xs font-light text-red-600 mt-1">{{ lnameValidate.message }}</div>
                </div>
                
            </div>
        </div>
        <div class="mb-6">
            <label for="phone" class="flex gap-x-2 items-center text-sm font-semibold leading-6 text-gray-900">Số Điện Thoại <TheToolTip v-bind="requestPhone"/></label>
            <input type="text" id="phone" placeholder="Số điện thoại"  v-model="register.phone" @change="validatePhone(register.phone)" autocomplete="phone"
                class="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200" 
                :class="{'border border-red-600':phoneValidate.isError}"/>
            <div v-if="phoneValidate.isError" class="text-xs font-light text-red-600 mt-1">{{ phoneValidate.message }}</div>
        </div>
        <button type="button" @click="submit"
            class="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-slate-900 text-white hover:bg-slate-700 w-full">
            <span>Đăng Ký</span>
        </button>
    </div>
    <div class="relative shrink-0 pt-4 space-y-3">
        <div class="space-y-4 text-sm text-gray-900 sm:flex sm:items-center sm:justify-center sm:space-x-4 sm:space-y-0">
            <p class="text-center sm:text-left">Bạn đã có tài khoản!</p>
            <NuxtLink
                class="flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 text-slate-500 ring-0 border border-slate-500 hover:border-slate-700 hover:text-gray-100 hover:bg-slate-700 duration-300 ease-out"
                to="/auth/login"><span>Đăng Nhập</span></NuxtLink>
        </div>
        <NuxtLink to="/" class="flex items-center gap-x-2 justify-center text-sm text-gray-500 font-light hover:text-gray-900 duration-300 ease-in-out">
            <ArrowLongLeftIcon class="w-4 h-4"/>
            <span>Trở về trang chủ</span>
        </NuxtLink>
    </div>
</template>

<script lang="ts" setup>
import TheToolTip from './TheToolTip.vue';
import { ArrowLongLeftIcon, EyeIcon } from '@heroicons/vue/24/solid'
import {AuthLogic, RegisterLogic} from "~/logic/pages/auth";

const runtimeConfig = useRuntimeConfig()

const {register,RegisterAsync} = RegisterLogic();
const {unameValidate,pwValidate, rpwValidate,emailValidate,fnameValidate,lnameValidate,phoneValidate,
    input1,input2,
    validatePassword,validateUserName,validateEmail,validatePhone,validateRePassword,validateFirstName,validateLastName,
    togglePassword,toggleRePassword} = AuthLogic();

const request = {
    title:'Yêu cầu',
    message:'Phải có ít nhất 1 chữ hoa <br/> Phải có ít nhất 1 ký tự đặc biệt (!,@,#,...)<br/>Phải có ít nhất 1 số<br/>Phải dài trên 8 ký tự',
}
const requestPhone = {
    title:'Yêu cầu',
    message:'(123) 456 7899 <br/> (123).456.7899<br/>(123)-456-7899<br/>123-456-7899<br/>123-456-7899<br/>123 456 7899<br/>1234567899',
}

const submit = async () => {
    await RegisterAsync(register.value,`${runtimeConfig.public.apiBase}/authenticate/register`)
}
</script>