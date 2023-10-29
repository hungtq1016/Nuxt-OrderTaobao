<template>
  <div class="space-y-3 mt-3">
    <div class="flex items-center justify-between flex-wrap gap-2">
      <div class="flex items-center gap-2">
        <USelectMenu v-model="selectedColumns" :options="columns" multiple placeholder="Select Row"
          class="md:w-auto w-full" />
        <UDropdown :items="itemsRow" :popper="{ placement: 'bottom-start' }">
          <UButton color="white" :label="`Selected Rows: ${String(selected.length)}`" trailing-icon="i-heroicons-chevron-down-20-solid" />
        </UDropdown>
      </div>

      <UInput v-model="q" placeholder="Filter value" class="md:w-auto w-full" />
    </div>
    <UTable :rows="filteredRows" :columns="selectedColumns" v-model="selected"
      :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid', label: 'Loading...' }"
      sort-asc-icon="i-heroicons-arrow-up-20-solid" sort-desc-icon="i-heroicons-arrow-down-20-solid"
      :sort-button="{ icon: 'i-heroicons-sparkles-20-solid', color: 'primary', variant: 'outline', size: 'xs', square: false }">
      <template #actions-data="{ row }">
        <UDropdown :items="items(row)">
          <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
        </UDropdown>
      </template>
    </UTable>
    <div class="flex items-center justify-between flex-wrap gap-2">
      <UDropdown :items="pages" :popper="{ placement: 'bottom-start' }" class="md:w-auto w-full">
        <UButton color="white" :label="`Selected: ${pageSize}`" trailing-icon="i-heroicons-chevron-down-20-solid" />
      </UDropdown>

      <UPagination @update:model-value="(e: number) => emit('update-page', e)"
        :prev-button="{ icon: 'i-heroicons-arrow-small-left-20-solid', color: 'gray' }"
        :next-button="{ icon: 'i-heroicons-arrow-small-right-20-solid', color: 'gray' }" v-model="page"
        :page-count="pageSize" :total="totalRecords" :max="5" class="md:w-auto w-full" />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps(['data', 'columns', 'pageSize', 'pageNumber', 'totalPages', 'totalRecords', 'items'])

const emit = defineEmits(['update-page', 'update-size','delete-selected'])

const page = ref<number>(props.pageNumber)

const selected = ref([])
const selectedColumns = ref(props.columns)
const q = ref('')

const filteredRows = computed(() => {
  if (!q.value) {
    return props.data
  }
  return props.data.filter((row: any) => {
    return Object.values(row).some((value) => {
      return String(value).toLowerCase().includes(q.value.toLowerCase())
    })
  })
})

const pages = [[
  {
    label: '5',
    click: () => emit('update-size', 5),
  },
  {
    label: '10',
    click: () => emit('update-size', 10),
  },
  {
    label: '25',
    click: () => emit('update-size', 25),
  },
  {
    label: '50',
    click: () => emit('update-size', 50),
  },
  {
    label: '100',
    click: () => emit('update-size', 100),
  },
]]

const itemsRow = [
  [{
    label: 'Delete Selected',
    icon: 'i-heroicons-trash-20-solid',
    shortcuts: ['D'],
    click: () => {
      emit('delete-selected',selected.value.map((item:any) => item.id))
      selected.value = []
    },
  }]
]
</script>
