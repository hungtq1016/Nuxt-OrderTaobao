<template>
  <UModal v-model="isOpen" @close="navigateTo('/admin/image')">
    <img :src="file.source" alt="" class="pointer-events-none w-full h-full group-hover:opacity-75" />
  </UModal>
</template>
  
<script setup lang="ts">

const isOpen = ref(true)
const file = {
  title: 'IMG_4985.HEIC',
  size: '3.9 MB',
  source:
    'https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80',
}
const { back } = useRouter()
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

defineShortcuts({
  escape: {
    usingInput: true,
    whenever: [isOpen],
    handler: async() => await navigateTo('/admin/image')
  }
})
</script>
  