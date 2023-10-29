<template>
  <UModal v-model="isOpen" prevent-close :fullscreen="true">

    <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
      <template #header>
        <div class="flex justify-end">
          <UButton @click="back" :padded="false" color="gray" variant="link" icon="i-heroicons-x-mark-20-solid"
            size="xl" />
        </div>
      </template>
      <TheImageIndex class="p-6" /> 
    </UCard>

  </UModal>
</template>
  
<script setup lang="ts">
import TheImageIndex from '~/components/admin/image/TheImageIndex.vue';

const isOpen = ref(true)
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
</script>
  