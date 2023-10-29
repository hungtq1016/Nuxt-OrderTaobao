<template>
  <TheImageIndex/>
</template>
  
<script setup lang="ts">

import TheImageIndex from '~/components/admin/image/TheImageIndex.vue';

definePageMeta({
  layout: "admin",
  middleware: ['admin']
})
useHead({
  title: 'Image List | Order Taobao',
  meta: [
    { name: 'description', content: 'image list' }
  ],
})


</script>
  