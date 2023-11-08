<template>
  <TheForm/>
</template>
  
<script setup>
import TheForm from '~/components/admin/users/TheForm.vue';
import { init_state,state } from '~/logic/pages/admin/users';
definePageMeta({
  layout: "admin",
  middleware: ['admin']
})
useHead({
  title: 'Thêm Người Dùng | Order Taobao',
  meta: [
    { name: 'description', content: 'login' }
  ],
})
state.value =init_state
</script>