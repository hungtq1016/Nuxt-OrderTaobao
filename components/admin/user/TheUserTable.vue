<template>
    <TheTable :columns="columns" v-bind="dataTable" 
        :items="items" 
        @update-page="(e: number) => dataTable.pageNumber = e"
        @update-size="(e: number) => dataTable.pageSize = e"
        @delete-selected="(e: Array<string>) => deleteUserAsync(`${runtimeConfig.public.apiBase}/users/multiple/delete`, e)" />
</template>
    
<script setup lang="ts">
import TheTable from '~/components/admin/table/TheTable.vue';
import { Column } from '~/type';
import { items, readUsersAsync, dataTable, deleteUserAsync } from '~/logic/pages/admin/user';

const props = defineProps({
    columns: {
        type: Array<Column>,
        default: []
    }
})

const runtimeConfig = useRuntimeConfig()

await readUsersAsync(`${runtimeConfig.public.apiBase}/users`)

</script>