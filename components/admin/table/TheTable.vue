<template>
    <div class="space-y-3 mt-3">
        <div class="flex items-center justify-between">
            <USelectMenu v-model="selectedColumns" :options="columns" multiple placeholder="Chọn Cột" />
            <UInput v-model="q" placeholder="Lọc dữ liệu" />
        </div>
        <UTable :rows="filteredRows" :columns="selectedColumns" v-model="selected"
        sort-asc-icon="i-heroicons-arrow-up-20-solid"
        sort-desc-icon="i-heroicons-arrow-down-20-solid"
        :sort-button="{ icon: 'i-heroicons-sparkles-20-solid', color: 'primary', variant: 'outline', size: 'xs', square: false}">
        <template #actions-data="{ row }">
            <UDropdown :items="items(row)">
                <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
            </UDropdown>
        </template>
        </UTable>
        <UPagination v-model="page" :page-count="pageCount" :total="data.length" class="justify-end"/>
    </div>
</template>

<script setup lang="ts">
const props = defineProps(['data','columns'])

const selected = ref([])
const selectedColumns = ref(props.columns)
const q = ref('')

const filteredRows = computed(() => {
  if (!q.value) {
    return props.data
  }
  return props.data.filter((row:any) => {
    return Object.values(row).some((value) => {
      return String(value).toLowerCase().includes(q.value.toLowerCase())
    })
  })
})
const items = (row:any) => [
  [{
    label: 'Edit',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: async () => await navigateTo(`/admin/user/edit/${row.id}`)
  }, {
    label: 'Duplicate',
    icon: 'i-heroicons-document-duplicate-20-solid'
  }], [{
    label: 'Archive',
    icon: 'i-heroicons-archive-box-20-solid'
  }, {
    label: 'Move',
    icon: 'i-heroicons-arrow-right-circle-20-solid'
  }], [{
    label: 'Delete',
    icon: 'i-heroicons-trash-20-solid'
  }]
]
const page = ref(1)
const pageCount = 5
const rows = computed(() => {
  return props.data.slice((page.value - 1) * pageCount, (page.value) * pageCount)
})

</script>
