<template>
    <div class="space-y-5 lg:mx-0 lg:max-w-none">
        <TheClaimIndex/>
      </div>
</template>

<script setup lang="ts">
import TheClaimIndex from '~/components/admin/roles/claims/TheClaimIndex.vue';

definePageMeta({
  layout: "admin",
  middleware: ['admin']
})
useHead({
  title: `Role detail | Order Taobao`,
  meta: [
    { name: 'information', content: 'Role detail' }
  ],
})
</script>
