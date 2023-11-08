
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
    <div class="flex gap-2 items-center flex-wrap">

      <div v-if="e_excel" class="flex-auto sm:flex-none">
        <button @click="expExcel(e_excel)"
          class="block rounded-md bg-green-600 px-3 py-1.5 sm:flex gap-x-1 items-center
      text-center text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">
          <UIcon name="i-heroicons-document-arrow-up" />
          Export Excel

        </button>

      </div>
      <div v-if="i_excel" class="flex-auto sm:flex-none">

        <template v-if="!contain">
          <label for="import-excel">
            <div
              class="block rounded-md bg-emerald-800 px-3 py-1.5 sm:flex gap-x-1 items-center
      text-center text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700">
              <UIcon name="i-heroicons-document-arrow-down" />
              Import Excel
              <input type="file" @change="onFileChanged($event)" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" id="import-excel" class="hidden">

            </div>
          </label>
        </template>
        <template v-else>
          <div class="flex gap-px items-center">
            <button @click="impExcel(i_excel)"
              class="rounded-md bg-emerald-800 px-3 py-1.5 flex gap-x-1 items-center
      text-center text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700">
              <UIcon name="i-heroicons-document-arrow-down" />
              <span class="capitalize">{{ file.name }}</span>
            </button>

            <label for="change-file">
            <div
              class="rounded-md bg-emerald-800 py-1.5 px-2 flex gap-x-1 items-center
      text-center text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700">
              <UIcon name="i-heroicons-arrow-path" />
              <span >Change</span>
              <input type="file" @change="onFileChanged($event)" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" id="change-file" class="hidden">

            </div>
          </label>
          </div>
        </template>

      </div>
      <div v-if="slug_title" class="flex-auto sm:flex-none">
        <NuxtLink type="button" :to="slug"
          class="block rounded-md bg-sky-600 px-3 py-1.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600">
          {{ slug_title }}</NuxtLink>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { expExcel, impExcel, onFileChanged, contain, file } from '~/logic/pages/admin/excel';

const props = defineProps({
  title: { type: String },
  desc: { type: String },
  e_excel: { type: String },
  i_excel: { type: String },
  slug: { type: String },
  slug_title: { type: String },
  tooltip: { type: String },
})

</script>
