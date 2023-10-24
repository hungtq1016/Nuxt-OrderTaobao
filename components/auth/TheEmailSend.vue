<template>
    <h1 class="sr-only">Reset password</h1>
    <h3 class="text-3xl font-['Noto Sans'] font-bold">Xác Nhận Email</h3>
    <div class="w-full max-w-sm mt-6">
        <UForm :validate="validate" :state="state" @submit="submit">
            <UFormGroup name="email" >
                <template #label>
                    <span class="text-sm font-semibold leading-6 text-gray-900">Email</span>
                </template>
                <UInput v-model="state.email" 
                placeholder="email@example.com"/>
            </UFormGroup>
            <UButton type="submit" block color="black" variant="solid"
            class="mt-4">
                Gửi
            </UButton>
        </UForm>
    </div>
    <div class="relative shrink-0 pt-4 space-y-3">
        <NuxtLink to="/auth/login"
            class="flex items-center gap-x-2 justify-center text-sm text-gray-500 font-light hover:text-gray-900 duration-300 ease-in-out">
            <ArrowLongLeftIcon class="w-4 h-4" />
            <span>Trở về đăng nhập</span>
        </NuxtLink>
    </div>
</template>

<script setup lang="ts">
import { ArrowLongLeftIcon } from '@heroicons/vue/24/solid'
import type { FormSubmitEvent } from '@nuxt/ui/dist/runtime/types'
import { EmailLogic} from '~/logic/pages/auth';
import { SendEmailRequest } from '~/type';

const {state, validate ,SendEmailAsync} = EmailLogic()
const runtimeConfig = useRuntimeConfig()

async function submit(event: FormSubmitEvent<SendEmailRequest>) {
    await SendEmailAsync(event.data,`${runtimeConfig.public.apiBase}/mail/reset-password`)
}

</script>
