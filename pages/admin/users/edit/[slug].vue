<template>
  <TheForm :user="dataDetail.user" :edit="true"/>
</template>

<script setup lang="ts">
import TheForm from '~/components/admin/users/TheForm.vue';
import { getById,dataDetail,state } from '~/logic/pages/admin/users';
const route = useRoute();

definePageMeta({
  layout: "admin",
  middleware: ['admin']
})
useHead({
  title: `Tùy Chỉnh Người Dùng | Order Taobao`,
  meta: [
    { name: 'information', content: 'login' }
  ],
})

await getById(String(route.params.slug))

state.value = dataDetail.value.user 

</script>
