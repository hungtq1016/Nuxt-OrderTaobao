<template>
  <TheForm :user="dataDetail.user" :edit="true"/>
</template>

<script setup lang="ts">
import TheForm from '~/components/admin/user/TheForm.vue';
import { readUserAsync,dataDetail,state } from '~/logic/pages/admin/user';
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
const runtimeConfig = useRuntimeConfig()

await readUserAsync(runtimeConfig.public.apiBase+'/users/'+route.params.slug)

state.value = dataDetail.value.user 

</script>
