<template>
    <TheUserIndex/>
</template>
  
<script setup lang="ts">

import TheUserIndex from '~/components/admin/user/TheUserIndex.vue';

definePageMeta({
  layout: "admin",
  middleware: ['admin']
})

useHead({
  title: 'User List | Order Taobao',
  meta: [
    { name: 'description', content: 'user list' }
  ],
})

</script>