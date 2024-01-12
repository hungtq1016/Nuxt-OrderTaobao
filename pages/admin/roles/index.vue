<template>
    <TheRoleIndex/>
</template>
  
<script setup lang="ts">

import TheRoleIndex from '~/components/admin/roles/TheRoleIndex.vue';

definePageMeta({
  layout: "admin",
  middleware: ['admin']
})

useHead({
  title: 'Role List | Order Taobao',
  meta: [
    { name: 'description', content: 'role list' }
  ],
})

</script>