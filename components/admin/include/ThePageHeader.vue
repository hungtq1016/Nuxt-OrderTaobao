
import { NuxtLink } from '#build/components';
<template>
  <div class="sm:flex sm:items-center">
    <div class="sm:flex-auto">
      <h1 class="text-base font-semibold leading-6 text-gray-900">{{ title }}</h1>
      <div class="flex gap-x-2 items-center mt-2">
        <p class="text-sm text-gray-700">{{ desc }}</p>
        <UTooltip v-if="tooltip" :text="tooltip" :shortcuts="['⌘', 'O']">
          <UButton icon="i-heroicons-question-mark-circle" size="xs" :padded="false" color="gray" variant="link" />
        </UTooltip>
      </div>
    </div>
    <div v-if="slug_title" class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
      <NuxtLink type="button" :to="slug"
        class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        {{ slug_title }}</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: { type: String },
  desc: { type: String },
  slug: { type: String },
  slug_title: { type: String },
  tooltip: { type: String },
})
</script>
