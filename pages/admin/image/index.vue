<template>
  <UInput v-model="q" placeholder="Filter value" class="md:w-auto w-full" />
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

    <li v-for="file in filteredRows" :key="file.source" class="relative">
      <div
        class="group aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
        <img :src="file.source" alt="" class="pointer-events-none object-cover group-hover:opacity-75" />
        <NuxtLink :to="`/admin/image/${file.id}`" type="button" class="absolute inset-0 focus:outline-none">
          <span class="sr-only">View details for {{ file.title }}</span>
        </NuxtLink>
      </div>
      <p class="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">{{ file.title }}</p>
      <p class="pointer-events-none block text-sm font-medium text-gray-500">{{ file.size }}</p>
    </li>
  </ul>
  <UButton v-if="preview_list.length > 0"
  class="fixed bottom-5 right-5 md:bottom-10 md:right-10" 
  icon="i-heroicons-inbox-arrow-down" size="xl"
    color="primary" square variant="solid" label="Save Change" />
</template>
  
<script setup lang="ts">
const files = [
  {
    id: '123456789',
    title: 'IMG_4985.HEIC',
    size: '3.9 MB',
    source:
      'https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80',
  },
  // More files...
]
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

const remove = (id: number) => {
  image_list.value.splice(id, 1)
  preview_list.value.splice(id, 1)
}
function formatBytes(bytes: number, decimals = 2): string {
  if (!+bytes) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}
type Image = {
  name: string,
  size: number
}
const image_list = ref<Array<Image>>([])
const preview_list = ref<Array<string>>([])

const previewMultiImage = (event: any) => {
  var input = event.target;
  var count = input.files.length;
  var index = 0;
  if (input.files) {
    while (count--) {
      var reader = new FileReader();
      reader.onload = (e: any) => {
        preview_list.value.push(e.target.result);
      }
      image_list.value.push(input.files[index]);
      reader.readAsDataURL(input.files[index]);
      index++;
    }
  }
}
const q = ref('')

const filteredRows = computed(() => {
  if (!q.value) {
    return files
  }
  return files.filter((row: any) => {
    return Object.values(row).some((value) => {
      return String(value).toLowerCase().includes(q.value.toLowerCase())
    })
  })
})
</script>
  