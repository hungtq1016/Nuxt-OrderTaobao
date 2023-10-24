<template>
     <h1 class="sr-only">Reset password</h1>
    <h3 class="text-3xl font-['Noto Sans'] font-bold">Đặt lại mật khẩu</h3>
    <div class="w-full max-w-sm mt-6">
        <UForm :validate="validate" :state="state" @submit="submit">
            <UFormGroup name="password">
                <template #label>
                    <span class="text-sm font-semibold leading-6 text-gray-900">Password</span>
                </template>
                <UInput v-model="state.password" type="password"
                placeholder="Ex@mple123"/>
            </UFormGroup>
            <UFormGroup name="repassword" class="mt-6">
                <template #label>
                    <span class="text-sm font-semibold leading-6 text-gray-900">Re-Password</span>
                </template>
                <UInput v-model="state.repassword"  type="password" 
                placeholder="Ex@mple123"/>
            </UFormGroup>
            <UButton type="submit" block color="black" variant="solid"
            class="mt-4">
                Gửi
            </UButton>
        </UForm>
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
import type { FormSubmitEvent } from '@nuxt/ui/dist/runtime/types'
import { ResetLogic } from '~/logic/pages/auth';
import { ResetPasswordRequest } from '~/type';

const runtimeConfig = useRuntimeConfig()

const {state,validate,ResetPasswordAsync} = ResetLogic();

async function submit(event: FormSubmitEvent<ResetPasswordRequest>) {
    await ResetPasswordAsync(event.data,`${runtimeConfig.public.apiBase}/authenticate/reset-password`)
}

</script>
