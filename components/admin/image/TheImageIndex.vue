<template>
  <section>
    <UInput v-model="q" placeholder="Filter value" class="md:w-auto w-full" />
    <TheGrid />
    <div class="flex justify-end mt-5">
      <UPagination @update:model-value="(e) => state.pageNumber = e"
        :prev-button="{ icon: 'i-heroicons-arrow-small-left-20-solid', color: 'gray' }"
        :next-button="{ icon: 'i-heroicons-arrow-small-right-20-solid', color: 'gray' }" v-model="page"
        :page-count="state.pageSize" :total="state.totalRecords" :max="5" class="md:w-auto w-full" />
    </div>

    <UModal v-model="isOpen">
      <img :src="`${runtimeConfig.public.apiBase}/images/${selected.url}`" alt=""
        class="pointer-events-none w-full h-full group-hover:opacity-75" />
      <UButton @click="nextImage" icon="i-heroicons-chevron-right" size="lg" color="black" square variant="solid"
        class="fixed top-1/2 right-2 z-50 -translate-y-1/2" />
      <UButton @click="prevImage" icon="i-heroicons-chevron-left" size="lg" color="black" square variant="solid"
        class="fixed top-1/2 left-2 z-50 -translate-y-1/2" />
    </UModal>

    <UButton v-if="preview_list.length > 0" @click="createImageAsync(`${runtimeConfig.public.apiBase}/images/${user.userName}`)"
      class="fixed bottom-5 right-5 md:bottom-10 md:right-10 z-10" icon="i-heroicons-inbox-arrow-down" size="xl"
      color="primary" square variant="solid" label="Save Change" />
  </section>
</template>
    
<script setup lang="ts">
import TheGrid from './TheGrid.vue';
import { preview_list, q, readImageAsync, isOpen, selected, createImageAsync, state, nextImage, prevImage } from '~/logic/pages/admin/image';
import { useUserInfo } from '~/stores/user';

const {user} = useUserInfo();
const runtimeConfig = useRuntimeConfig()
const page = ref<number>(state.value.pageNumber)
await readImageAsync(`${runtimeConfig.public.apiBase}/images/page`)

</script>
    