<template>
    <div>
        hello {{ route.params.slug }}
    </div>
</template>

<script setup lang="ts">
const route = useRoute();
definePageMeta({
  layout: "admin",
  middleware: ['admin']
})
useHead({
  title: `Tùy Chỉnh ${route.params.slug} | Order Taobao`,
  meta: [
    { name: 'description', content: 'login' }
  ],
})
</script>

<style scoped>

</style>