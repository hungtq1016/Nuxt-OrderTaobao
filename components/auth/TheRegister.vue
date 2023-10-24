<template>
    <h1 class="sr-only">Register to your app account</h1>
    <h3 class="text-3xl font-bold">Register</h3>
    <div class="w-full max-w-sm mt-6">
        <UForm :validate="validate" :state="state" @submit="submit">
            <UFormGroup name="username">
                <template #label>
                    <span class="text-sm font-semibold leading-6 text-gray-900">Username</span>
                </template>
                <UInput v-model="state.userName" placeholder="example" />
            </UFormGroup>
            <UFormGroup name="email" class="mt-6">
                <template #label>
                    <span class="text-sm font-semibold leading-6 text-gray-900">Email</span>
                </template>
                <UInput v-model="state.email" placeholder="example@email.com" />
            </UFormGroup>
            <UFormGroup name="password" class="mt-6">
                <template #label>
                    <span class="text-sm font-semibold leading-6 text-gray-900">Password</span>
                </template>
                <UInput v-model="state.password" type="password" placeholder="Ex@mple123" />
            </UFormGroup>
            <UFormGroup name="repassword" class="mt-6">
                <template #label>
                    <span class="text-sm font-semibold leading-6 text-gray-900">Re-Password</span>
                </template>
                <UInput v-model="state.repassword" type="password" placeholder="Ex@mple123" />
            </UFormGroup>
            <div class="mt-6">
                <div class="grid grid-cols-2 gap-2">
                    <UFormGroup name="firstname">
                        <template #label>
                            <span class="text-sm font-semibold leading-6 text-gray-900">First Name</span>
                        </template>
                        <UInput v-model="state.firstName" placeholder="Henry" />
                    </UFormGroup>
                    <UFormGroup name="lastname">
                        <template #label>
                            <span class="text-sm font-semibold leading-6 text-gray-900">Last Name</span>
                        </template>
                        <UInput v-model="state.lastName" placeholder="Cavill" />
                    </UFormGroup>
                </div>
            </div>
            <UFormGroup name="phone" class="mt-6">
                        <template #label>
                            <span class="text-sm font-semibold leading-6 text-gray-900">Phone Number</span>
                        </template>
                        <UInput v-model="state.phone" placeholder="0980.XXX.123" />
                    </UFormGroup>
            <UButton type="submit" block color="black" variant="solid" class="mt-4">
                Submit
            </UButton>
        </UForm>
    </div>
    <div class="relative shrink-0 pt-4 space-y-3">
        <div class="space-y-4 text-sm text-gray-900 sm:flex sm:items-center sm:justify-center sm:space-x-4 sm:space-y-0">
            <p class="text-center sm:text-left">You already have an account!</p>
            <NuxtLink
                class="flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 text-slate-500 ring-0 border border-slate-500 hover:border-slate-700 hover:text-gray-100 hover:bg-slate-700 duration-300 ease-out"
                to="/auth/login"><span>LogIn</span></NuxtLink>
        </div>
        <NuxtLink to="/"
            class="flex items-center gap-x-2 justify-center text-sm text-gray-500 font-light hover:text-gray-900 duration-300 ease-in-out">
            <ArrowLongLeftIcon class="w-4 h-4" />
            <span>Back to Homepage</span>
        </NuxtLink>
    </div>
</template>

<script lang="ts" setup>
import { ArrowLongLeftIcon } from '@heroicons/vue/24/solid'
import { RegisterLogic } from "~/logic/pages/auth";
import type { FormSubmitEvent } from '@nuxt/ui/dist/runtime/types'
import { RegisterRequest } from '~/type';

const runtimeConfig = useRuntimeConfig()

const { state, validate, RegisterAsync } = RegisterLogic();

async function submit(event: FormSubmitEvent<RegisterRequest>) {
    await RegisterAsync(event.data, `${runtimeConfig.public.apiBase}/authenticate/register`)
}
</script>