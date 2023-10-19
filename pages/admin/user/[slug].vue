<template>
    
    <div class="space-y-5 lg:mx-0 lg:max-w-none">
        <ThePageHeader v-bind="header_props" />
        <TheRoles :roles="data.roles"/>

        <div>
          <h2 class="text-base font-semibold leading-7 text-gray-900">Integrations</h2>
          <p class="mt-1 text-sm leading-6 text-gray-500">Connect applications to your account.</p>

          <ul role="list" class="mt-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
            <li class="flex justify-between gap-x-6 py-6">
              <div class="font-medium text-gray-900">QuickBooks</div>
              <button type="button" class="font-semibold text-indigo-600 hover:text-indigo-500">Update</button>
            </li>
          </ul>

          <div class="flex border-t border-gray-100 pt-6">
            <button type="button" class="text-sm font-semibold leading-6 text-indigo-600 hover:text-indigo-500"><span aria-hidden="true">+</span> Add another application</button>
          </div>
        </div>

        <div>
          <h2 class="text-base font-semibold leading-7 text-gray-900">Language and dates</h2>
          <p class="mt-1 text-sm leading-6 text-gray-500">Choose what language and date format to use throughout your account.</p>

          <dl class="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
            <div class="pt-6 sm:flex">
              <dt class="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Language</dt>
              <dd class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                <div class="text-gray-900">English</div>
                <button type="button" class="font-semibold text-indigo-600 hover:text-indigo-500">Update</button>
              </dd>
            </div>
            <div class="pt-6 sm:flex">
              <dt class="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Date format</dt>
              <dd class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                <div class="text-gray-900">DD-MM-YYYY</div>
                <button type="button" class="font-semibold text-indigo-600 hover:text-indigo-500">Update</button>
              </dd>
            </div>

          </dl>
        </div>
      </div>
</template>

<script setup lang="ts">
import ThePageHeader from '~/components/admin/include/ThePageHeader.vue';
import TheRoles from '~/components/admin/user/TheRoles.vue';
import { TokenResponse } from '~/type';

const route = useRoute();

definePageMeta({
  layout: "admin",
  middleware: ['admin']
})
useHead({
  title: `Hồ Sơ Người Dùng | Order Taobao`,
  meta: [
    { name: 'information', content: 'login' }
  ],
})
const header_props = {
  title: "Hồ Sơ",
  desc: "Thông tin được hiển thị mặc định",
  slug: "/admin/user",
  slug_title: "Danh Sách"
}
const runtimeConfig = useRuntimeConfig()
const url = ref<string>(runtimeConfig.public.apiBase+'/users/'+route.params.slug)
const indexedDb = useAuthInfo();
const token: TokenResponse | undefined = await indexedDb.readAuthAsync();
const {data} = await useAsyncData<any>(
    'user',
    async() => {
      const data = await $fetch(url.value, {
        headers: { Accept: 'application/json', Authorization: `Bearer ${token?.accessToken ?? ''}`, },
      })
        return data
    }
  )

</script>

<style scoped>

</style>