<template>
  <section>
    <ThePageHeader v-bind="header_props" />
    <TheTable v-bind="data" />
  </section>
</template>
  
<script setup lang="ts">
import ThePageHeader from '~/components/admin/include/ThePageHeader.vue';
import TheTable from '~/components/admin/table/TheTable.vue';

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
const data = {
  columns: [{
    key: 'id',
    label: 'ID',
    sortable: true
  }, {
    key: 'name',
    label: 'Name',
    sortable: true
  }, {
    key: 'title',
    label: 'Title'
  }, {
    key: 'email',
    label: 'Email'
  }, {
    key: 'role',
    label: 'Role'
  },{ key: 'actions',label: 'Edit'}],
  data: [{
    id: 1,
    name: 'Lindsay Walton',
    title: 'Front-end Developer',
    email: 'lindsay.walton@example.com',
    role: 'Member'
  }, {
    id: 2,
    name: 'Courtney Henry',
    title: 'Designer',
    email: 'courtney.henry@example.com',
    role: 'Admin'
  }, {
    id: 3,
    name: 'Tom Cook',
    title: 'Director of Product',
    email: 'tom.cook@example.com',
    role: 'Member'
  }, {
    id: 4,
    name: 'Whitney Francis',
    title: 'Copywriter',
    email: 'whitney.francis@example.com',
    role: 'Admin'
  }, {
    id: 5,
    name: 'Leonard Krasner',
    title: 'Senior Designer',
    email: 'leonard.krasner@example.com',
    role: 'Owner'
  }, {
    id: 6,
    name: 'Floyd Miles',
    title: 'Principal Designer',
    email: 'floyd.miles@example.com',
    role: 'Member'
  }]
}

</script>