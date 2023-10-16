<template>
    <TheLogin/>
</template>

<script setup lang="ts">
import TheLogin from '~/components/auth/TheLogin.vue';
useHead({
  title: 'Đăng Nhập | Order Taobao',
  meta: [
    { name: 'description', content: 'login' }
  ],
})

definePageMeta({
  layout: "auth",
  middleware:'auth'
})

</script>
