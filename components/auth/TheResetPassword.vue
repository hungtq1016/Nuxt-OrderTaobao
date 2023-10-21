<template>
     <h1 class="sr-only">Reset password</h1>
    <h3 class="text-3xl font-['Noto Sans'] font-bold">Đặt lại mật khẩu {{ query.reset }}</h3>
    <div class="w-full max-w-sm mt-6">
        <div class="mb-6">
            <label for="password" class="block text-sm font-semibold leading-6 text-gray-900">Mật Khẩu</label>
            <input type="password" id="password" placeholder="Mật khẩu" v-model="dataReset.password"
                class="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200" />
        </div>
        <div class="mb-6">
            <label for="repassword" class="block text-sm font-semibold leading-6 text-gray-900">Xác Nhận Mật Khẩu</label>
            <input type="password" id="repassword" placeholder="Xác nhận mật khẩu"  v-model="dataReset.repassword"
                class="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200" />
        </div>
        <button type="submit" @click="submit"
            class="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-slate-900 text-white hover:bg-slate-700 w-full">
            <span>Gửi</span>
        </button>

    </div>
    <div class="relative shrink-0 pt-4 space-y-3">
        <NuxtLink to="/" class="flex items-center gap-x-2 justify-center text-sm text-gray-500 font-light hover:text-gray-900 duration-300 ease-in-out">
            <ArrowLongLeftIcon class="w-4 h-4"/>
            <span>Trở về trang chủ</span>
        </NuxtLink>
    </div>
</template>

<script setup lang="ts">
import { ArrowLongLeftIcon } from '@heroicons/vue/24/solid'
import { ResetLogic } from '~/logic/pages/auth';
const {query} = useRoute();
const runtimeConfig = useRuntimeConfig()

const {dataReset,ResetPasswordAsync} = ResetLogic();
dataReset.value.idResetPassword = String(query.reset);
dataReset.value.email = String(query.email);
const submit = async () => {
    await ResetPasswordAsync(dataReset.value,`${runtimeConfig.public.apiBase}/authenticate/reset-password`)
}

</script>
