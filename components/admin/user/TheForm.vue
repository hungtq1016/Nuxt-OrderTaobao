<template>
  <div class="flex justify-center">
    <UForm :state="dataUser" @submit="submit"
      class="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl w-full max-w-2xl">
      <div class="px-4 py-6 sm:p-8">
        <h2 class="text-base font-semibold leading-7 text-gray-900">Thông Tin</h2>
        <div class="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div class="sm:col-span-4">
            <UFormGroup label="Tài Khoản" required name="group-required" class="mt-2"
              :error="!dataUser.userName && 'Vui lòng nhập đúng tài khoản'">
              <UInput placeholder="username" icon="i-heroicons-user" v-model="dataUser.userName" />
            </UFormGroup>
          </div>
          <div class="sm:col-span-4">
            <UFormGroup label="Email" required name="group-required" class="mt-2"
              :error="!emailRegex.test(dataUser.email) && 'Vui lòng nhập đúng email'">
              <UInput placeholder="you@example.com" icon="i-heroicons-envelope" v-model="dataUser.email" />
            </UFormGroup>
          </div>
          <div class="sm:col-span-3">
            <UFormGroup label="Họ" required name="group-required" class="mt-2"
              :error="!dataUser.firstName && 'Vui lòng nhập đúng họ'">
              <UInput placeholder="Nguyễn" v-model="dataUser.firstName" />
            </UFormGroup>
          </div>

          <div class="sm:col-span-3">
            <UFormGroup label="Tên" required name="group-required" class="mt-2"
              :error="!dataUser.lastName && 'Vui lòng nhập đúng tên'">
              <UInput placeholder="Văn A" v-model="dataUser.lastName" />
            </UFormGroup>
          </div>

          <div class="sm:col-span-5">
            <UFormGroup label="Số Điện Thoại" required name="group-required" class="mt-2"
              :error="!phoneRegex.test(dataUser.phone) && 'Vui lòng nhập đúng số điện thoại'">
              <UInput placeholder="098-XXX-XXXX" icon="i-heroicons-phone" v-model="dataUser.phone" />
            </UFormGroup>
          </div>
          <div class="sm:col-span-5" v-if="!edit">
            <UFormGroup label="Mật Khẩu" required name="group-required" class="mt-2"
              :error="!passwordRegex.test(dataUser.password) && 'Vui lòng nhập đúng mật khẩu'">
              <UInput placeholder="!@#123Abcdef" type="password" icon="i-heroicons-lock-closed"
                :ui="{ icon: { trailing: { pointer: '' } } }" v-model="dataUser.password">
                <template #trailing>
                  <UButton color="gray" variant="link" icon="i-heroicons-eye-20-solid" :padded="false" @click="" />
                </template>
              </UInput>
            </UFormGroup>
          </div>

        </div>
      </div>
      <div class="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
        <button @click="back" type="button" class="text-sm font-semibold leading-6 text-gray-900">Trở về</button>
        <UButton type="submit"
          class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Lưu
        </UButton>
      </div>
    </UForm>
  </div>
</template>

<script setup lang="ts">
import { RegisterRequest } from '~/type';
import type { FormSubmitEvent } from '@nuxt/ui/dist/runtime/types'
import { createUserAsync,updateUserAsync } from '~/logic/pages/admin/user';
import { dataUser } from '~/logic/pages/admin/user';
const runtimeConfig = useRuntimeConfig()
const { back } = useRouter()
const props = defineProps(['user', 'edit'])
const { emailRegex, phoneRegex, passwordRegex } = useRegex();

async function submit(event: FormSubmitEvent<RegisterRequest>) {
  if (props.edit) {
    updateUserAsync(`${runtimeConfig.public.apiBase}/users/${event.data.id}`,event.data)
  }else{
    createUserAsync(`${runtimeConfig.public.apiBase}/users`,event.data)
  }
  
}
</script>
