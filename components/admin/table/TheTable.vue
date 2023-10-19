<template>
  <div class="space-y-3 mt-3">
    <div class="flex items-center justify-between flex-wrap gap-2">
      <USelectMenu v-model="selectedColumns" :options="columns" multiple placeholder="Chọn Cột"
        class="md:w-auto w-full" />
      <UInput v-model="q" placeholder="Lọc dữ liệu" class="md:w-auto w-full" />
    </div>
    <UTable :rows="filteredRows" :columns="selectedColumns" v-model="selected"
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
        <UButton color="white" :label="`Đang chọn: ${pageSize}`" trailing-icon="i-heroicons-chevron-down-20-solid" />
      </UDropdown>
      <UPagination @update:model-value="(e: number) => emit('update-page', e)"
        :prev-button="{ icon: 'i-heroicons-arrow-small-left-20-solid', color: 'gray' }"
        :next-button="{ icon: 'i-heroicons-arrow-small-right-20-solid', color: 'gray' }" v-model="page"
        :page-count="pageSize" :total="totalRecords" :max="5" class="md:w-auto w-full" />
    </div>
  </div>
</template>

<script setup lang="ts">

const props = defineProps(['data', 'columns', 'pageSize', 'pageNumber', 'totalPages', 'totalRecords'])
const emit = defineEmits(['update-page', 'update-size'])
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

const items = (row: any) => [
  [
  {
    label: 'View',
    icon: 'i-heroicons-eye-20-solid',
    click: async () => await navigateTo(`/admin/user/${row.id}`),
    shortcuts: ['V'],
  },{
    label: 'Edit',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: async () => await navigateTo(`/admin/user/edit/${row.id}`),
    shortcuts: ['E'],
  }, {
    label: 'Clone',
    icon: 'i-heroicons-document-duplicate-20-solid',
    shortcuts: ['C'],
  }], [{
    label: 'Archive',
    icon: 'i-heroicons-archive-box-20-solid'
  }, {
    label: 'Move',
    icon: 'i-heroicons-arrow-right-circle-20-solid'
  }], [{
    label: 'Delete',
    icon: 'i-heroicons-trash-20-solid',
    shortcuts: ['D']
  }]
]



</script>
