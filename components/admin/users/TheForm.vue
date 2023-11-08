<template>
  <div class="flex justify-center">
    <UForm :state="state" :validate="edit?validateEdit:validate" @submit="submit"
      class="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl w-full max-w-2xl">
      <div class="px-4 py-6 sm:p-8">
        <h2 class="text-base font-semibold leading-7 text-gray-900">User Form</h2>
        <div class="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

          <div class="sm:col-span-4">
            <UFormGroup name="username">
                <template #label>
                    <span class="text-sm font-semibold leading-6 text-gray-900">Username</span>
                </template>
                <UInput v-model="state.userName" 
                placeholder="example"/>
            </UFormGroup>
          </div>

          <div class="sm:col-span-4">
            <UFormGroup name="email" class="mt-2">
                <template #label>
                    <span class="text-sm font-semibold leading-6 text-gray-900">Email</span>
                </template>
                <UInput v-model="state.email" type="email"
                placeholder="example@email.com"/>
            </UFormGroup>
          </div>

          <div class="sm:col-span-3">
            <UFormGroup name="firstname" class="mt-2">
                <template #label>
                    <span class="text-sm font-semibold leading-6 text-gray-900">First Name</span>
                </template>
                <UInput v-model="state.firstName" 
                placeholder="Henry"/>
            </UFormGroup>
          </div>

          <div class="sm:col-span-3">
            <UFormGroup name="lastname" class="mt-2">
                <template #label>
                    <span class="text-sm font-semibold leading-6 text-gray-900">Last Name</span>
                </template>
                <UInput v-model="state.lastName" 
                placeholder="Cavill"/>
            </UFormGroup>
          </div>

          <div class="sm:col-span-5">
            <UFormGroup name="phone" class="mt-2">
                <template #label>
                    <span class="text-sm font-semibold leading-6 text-gray-900">Phone Number</span>
                </template>
                <UInput v-model="state.phone" 
                placeholder="0980.XXX.123"/>
            </UFormGroup>
          </div>
          
          <div class="sm:col-span-5" v-if="!edit">
            <UFormGroup name="password" class="mt-2">
                <template #label>
                    <span class="text-sm font-semibold leading-6 text-gray-900">Password</span>
                </template>
                <UInput v-model="state.password" type="password"
                placeholder="Ex@mple123"/>
            </UFormGroup>
          </div>

        </div>
      </div>
      <div class="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
        <button @click="back" type="button" class="text-sm font-semibold leading-6 text-gray-900">Back</button>
        <UButton type="submit" color="black">
          Submit
        </UButton>
      </div>
    </UForm>
  </div>
</template>

<script setup lang="ts">
import { RegisterRequest } from '~/type';
import type { FormSubmitEvent } from '@nuxt/ui/dist/runtime/types'
import { state,validate,validateEdit } from '~/logic/pages/admin/users';
import { update,post } from '~/logic/pages/RESTapi';

const { back } = useRouter()
const props = defineProps(['user', 'edit'])

async function submit(event: FormSubmitEvent<RegisterRequest>) {
  if (props.edit) {
    update('users',event.data.id,event.data)
  }else{
    post('users',event.data)
  }
  
}
</script>
~/logic/pages/admin/users