<template>
  <section>
    
    <UTabs :items="tabs" class="w-full">
      <template #item="{ item }">
        <UCard @submit.prevent="">
          <template #header>
            <ThePageHeader v-bind="item.header" />
          </template>
          <div v-if="item.key === 'list'" class="space-y-3">
            <TheTable :columns="columns" v-bind="dataTable" :items="items"
              @update-page="(e: number) => dataTable.pageNumber = e"
              @update-size="(e: number) => dataTable.pageSize = e" />
          </div>
          <div v-else-if="item.key === 'delete'" class="space-y-3">
            <TheTable :columns="columns" v-bind="dataTableDelete" :items="itemsDelete"
              @update-page="(e: number) => dataTableDelete.pageNumber = e"
              @update-size="(e: number) => dataTableDelete.pageSize = e" />
          </div>

        </UCard>
      </template>
    </UTabs>

  </section>
</template>
  
<script setup lang="ts">
import ThePageHeader from '~/components/admin/include/ThePageHeader.vue';
import TheTable from '~/components/admin/table/TheTable.vue';
import { Column } from '~/type';
import { items, readUsersAsync, dataTable,readUsersDeleteAsync,dataTableDelete,itemsDelete } from '~/logic/pages/admin/user';
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

const columns: Array<Column> = [{
  key: 'id',
  label: 'ID'
}, {
  key: 'userName',
  label: 'User Name',
  sortable: true
},
{
  key: 'email',
  label: 'Email',
  sortable: true
}, {
  key: 'firstName',
  label: 'First Name'
}, {
  key: 'lastName',
  label: 'Last Name'
},
{
  key: 'phone',
  label: 'Phone Number'
},
{ key: 'actions', label: 'Actions' }
]
const runtimeConfig = useRuntimeConfig()

await readUsersAsync(`${runtimeConfig.public.apiBase}/users`)
await readUsersDeleteAsync(`${runtimeConfig.public.apiBase}/users/delete`)

  const tabs = [{
    key: 'list',
    label: 'User List',
    header: {
      title: 'User List',
      desc: "Display a list of users",
      slug: "/admin/user/add",
      slug_title: "Add"
    }
  }, {
    key: 'delete',
    label: 'Deleted List',
    header: {
      title: 'Deleted List',
      desc: "Display a list of users who have been deleted",
      tooltip:"Only administrators have access to view the data."
    }
  }]
</script>