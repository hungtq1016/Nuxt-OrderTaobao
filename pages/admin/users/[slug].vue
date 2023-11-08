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
import TheAuthen from '~/components/admin/users/TheAuthen.vue';
import TheDetail from '~/components/admin/users/TheDetail.vue';
import TheRoles from '~/components/admin/users/TheRoles.vue';

import { getById,dataDetail } from '~/logic/pages/admin/users';
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
  slug: "/admin/users",
  slug_title: "Danh Sách"
}
getById(String(route.params.slug))
</script>
