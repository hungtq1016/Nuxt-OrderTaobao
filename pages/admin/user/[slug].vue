<template>
    
    <div class="space-y-5 lg:mx-0 lg:max-w-none">
        <ThePageHeader v-bind="header_props" />
        <TheRoles :roles="dataDetail.roles"/>
        <TheDetail :user="dataDetail.user"/>
        <TheAuthen :user="dataDetail.user"/>
      </div>
</template>

<script setup lang="ts">
import ThePageHeader from '~/components/admin/include/ThePageHeader.vue';
import TheAuthen from '~/components/admin/user/TheAuthen.vue';
import TheDetail from '~/components/admin/user/TheDetail.vue';
import TheRoles from '~/components/admin/user/TheRoles.vue';

import { readUserAsync,dataDetail } from '~/logic/pages/admin/user';
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
readUserAsync(runtimeConfig.public.apiBase+'/users/'+route.params.slug)
</script>
