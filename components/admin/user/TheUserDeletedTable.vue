<template>
    <TheTable :columns="columns" v-bind="dataDeletedTable" :items="itemsDelete" :loading="fetchTable?.pending" 
        @update-page="(e: number) => dataDeletedTable.pageNumber = e"
        @update-size="(e: number) => dataDeletedTable.pageSize = e" />
</template>

<script setup lang="ts">
import TheTable from '~/components/admin/table/TheTable.vue';
import { Column } from '~/type';
import {  readUsersDeletedAsync, dataDeletedTable, itemsDelete } from '~/logic/pages/admin/user';

const props = defineProps({
    columns:{
        type:Array<Column>,
        default:[]
    }
})

const runtimeConfig = useRuntimeConfig()

const fetchTable = await readUsersDeletedAsync(`${runtimeConfig.public.apiBase}/users/delete`)

if (fetchTable?.data?.value !== null && fetchTable) {
    dataDeletedTable.value = fetchTable.data.value.data;
}



</script>