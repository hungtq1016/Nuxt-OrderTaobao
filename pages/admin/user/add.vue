<template>
  <TheForm/>
</template>
  
<script setup>
import TheForm from '~/components/admin/user/TheForm.vue';
import { init_state,dataUser } from '~/logic/pages/admin/user';
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
dataUser.value =init_state
</script>