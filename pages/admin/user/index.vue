<template>
  <section>
    <ThePageHeader v-bind="header_props" />
    <TheTable :columns="columns" v-bind="dataTable" :items="items" @update-page="(e: number) => dataTable.pageNumber = e"
      @update-size="(e: number) => dataTable.pageSize = e" />
  </section>
</template>
  
<script setup lang="ts">
import ThePageHeader from '~/components/admin/include/ThePageHeader.vue';
import TheTable from '~/components/admin/table/TheTable.vue';
import { Column } from '~/type';
import { items, readUsersAsync, dataTable } from '~/logic/pages/admin/user';
definePageMeta({
  layout: "admin",
  middleware: ['admin']
})
useHead({
  title: 'Danh Sách Người Dùng | Order Taobao',
  meta: [
    { name: 'description', content: 'user' }
  ],
})
const header_props = {
  title: "Danh sách người dùng",
  desc: "Hiển thị danh sách người dùng",
  slug: "/admin/user/add",
  slug_title: "Thêm mới"
}
const columns: Array<Column> = [{
  key: 'id',
  label: 'ID'
}, {
  key: 'userName',
  label: 'Tài Khoản',
  sortable: true
},
{
  key: 'email',
  label: 'Email',
  sortable: true
}, {
  key: 'firstName',
  label: 'Họ'
}, {
  key: 'lastName',
  label: 'Tên'
},
{
  key: 'phone',
  label: 'Số Điện Thoại'
},
{ key: 'actions', label: 'Tùy Chỉnh' }
]
const runtimeConfig = useRuntimeConfig()

await readUsersAsync(`${runtimeConfig.public.apiBase}/users`)

</script>