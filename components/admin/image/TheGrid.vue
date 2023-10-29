<template>
  <ul role="list"
    class="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-4 lg:grid-cols-4 xl:grid-cols-6 md:gap-x-6 xl:gap-x-4 mt-6">
    <li>
      <label
        class="group aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg border-dashed border-2 border-gray-300 hover:border-gray-400 ">
        <span class="flex justify-center items-center flex-col space-x-2 p-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24"
            stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <span class="font-medium text-gray-600">
            Drop files to Attach, or
            <span class="text-blue-600 underline">browse</span>
          </span>
        </span>
        <input type="file" name="file_upload" class="hidden" accept="image/*" :multiple="true"
          @change="previewMultiImage">

      </label>

    </li>
    <template v-if="preview_list.length > 0">
      <li v-for="item, index in preview_list" :key="index" class="relative">
        <div
          class="group aspect-h-7 ring-2 ring-sky-500 aspect-w-10 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-lime-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
          <img :src="item" class="pointer-events-none object-cover group-hover:opacity-75" />
        </div>
        <div class="absolute right-0 top-0 translate-x-1/2 -translate-y-1/2">
          <UButton color="sky" variant="solid" icon="i-heroicons-arrow-path" size="2xs" :ui="{ rounded: 'rounded-full' }"
            @click="remove(index)" />
        </div>
        <p class="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">{{ image_list[index].name
        }}</p>
        <p class="pointer-events-none block text-sm font-medium text-gray-500">{{ formatBytes(image_list[index].size) }}
        </p>
      </li>

    </template>

    <li v-for="(file, index) in filteredRows" :key="file.id" class="relative group">
      <div
        class="group aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
        <img :src="`${runtimeConfig.public.apiBase}/images/${file.url}`" alt=""
          class="pointer-events-none object-cover group-hover:opacity-75" />
        <button @click="openImage(file, index)" type="button" class="absolute inset-0 focus:outline-none">
          <span class="sr-only">View details for {{ file.label }}</span>
        </button>
      </div>
      <div class="absolute right-1 top-1 ">
        <UButton class="hidden group-hover:flex" color="red" square variant="soft" icon="i-heroicons-x-mark" size="2xs"
          :ui="{ rounded: 'rounded-full' }"
          @click="deleteImage(file.id,user.userName)" />
      </div>
      <p class="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">{{ file.label }}</p>
      <p class="pointer-events-none block text-sm font-medium text-gray-500">{{ formatBytes(file.size) }}</p>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { formatBytes } from '~/composables/useFile';
import { filteredRows, image_list, previewMultiImage, preview_list, remove, openImage, deleteImage } from '~/logic/pages/admin/image';
import { useUserInfo } from '~/stores/user';

const { user } = useUserInfo();
const runtimeConfig = useRuntimeConfig()

</script>
