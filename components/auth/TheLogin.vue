<template>
    <h1 class="sr-only">Log in to your app account</h1>
    <h3 class="text-3xl font-bold">LogIn</h3>
    <div class="w-full max-w-sm mt-6">
        <div class="mb-2">
            <button
                class="flex items-center justify-center gap-x-2 appearance-none text-slate-900 bg-white rounded-md w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 border border-slate-400 hover:bg-slate-50/80 hover:border-slate-600 duration-300 ease-in">
                <GoogleIcon class="w-6 h-6" />
                <span>Login via Google</span>
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
        <UForm :validate="validate" :state="state" @submit="submit">
            <UFormGroup name="username">
                <template #label>
                    <span class="text-sm font-semibold leading-6 text-gray-900">Username</span>
                </template>
                <UInput v-model="state.username" 
                placeholder="example"/>
            </UFormGroup>
            <UFormGroup name="password" class="mt-6">
                <template #label>
                    <span class="text-sm font-semibold leading-6 text-gray-900">Password</span>
                </template>
                <UInput v-model="state.password" type="password"
                placeholder="Ex@mple123"/>
            </UFormGroup>
            <UButton type="submit" block color="black" variant="solid"
            class="mt-4">
                Submit
            </UButton>
        </UForm>
        <p class="mt-8 text-center">
            <NuxtLink to="/auth/forgot-password" class="text-sm hover:underline font-semibold text-gray-900 underline">Forgot Password?</NuxtLink>
        </p>
    </div>
    <div class="relative shrink-0 pt-4 space-y-3">
        <div class="space-y-4 text-sm text-gray-900 sm:flex sm:items-center sm:justify-center sm:space-x-4 sm:space-y-0">
            <p class="text-center sm:text-left">You do not have an account yet.</p>
            <NuxtLink
                class="flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 text-slate-500 ring-0 border border-slate-500 hover:border-slate-700 hover:text-gray-100 hover:bg-slate-700 duration-300 ease-out"
                to="/auth/register"><span>Register</span></NuxtLink>
        </div>
        <NuxtLink to="/"
            class="flex items-center gap-x-2 justify-center text-sm text-gray-500 font-light hover:text-gray-900 duration-300 ease-in-out">
            <ArrowLongLeftIcon class="w-4 h-4" />
            <span>Back to Homepage</span>
        </NuxtLink>
    </div>
</template>

<script setup lang="ts">
import {GoogleIcon,FacebookIcon,TwitterIcon} from '~/components/svg';
import { ArrowLongLeftIcon } from '@heroicons/vue/24/solid'
import {LoginLogic} from "~/logic/pages/auth";
import type { FormSubmitEvent } from '@nuxt/ui/dist/runtime/types'
import { LoginRequest } from '~/type';

const runtimeConfig = useRuntimeConfig()

const {state,validate,LoginAsync} = LoginLogic();

async function submit(event: FormSubmitEvent<LoginRequest>) {
    await LoginAsync(event.data,`${runtimeConfig.public.apiBase}/authenticate/login`)
}

</script>
