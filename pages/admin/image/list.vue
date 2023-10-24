<template>
    <UModal v-model="isOpen" prevent-close>
      
    </UModal>
  </template>
  
  <script setup lang="ts">

  const isOpen = ref(true)
  
  function closeModal() {
    isOpen.value = false
  }
  function openModal() {
    isOpen.value = true
  }
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
  