<template>
    <TheTable :columns="columns" v-bind="dataDisableTable" 
        :items="itemsDelete"
        @update-page="(e: number) => dataDisableTable.pageNumber = e"
        @update-size="(e: number) => dataDisableTable.pageSize = e"
        @delete-selected="(e: Array<string>) => deleteUserAsync(`${runtimeConfig.public.apiBase}/users/multiple/erase`, e)" 
        @restore-selected="(e: Array<string>) => restoreUserAsync(`${runtimeConfig.public.apiBase}/users/multiple/restore`, e)" />
</template>

<script setup lang="ts">
import TheTable from '~/components/admin/table/TheTable.vue';
import { Column } from '~/type';
import { readDisableUsersAsync, dataDisableTable, itemsDelete, deleteUserAsync,restoreUserAsync } from '~/logic/pages/admin/user';

const props = defineProps({
    columns: {
        type: Array<Column>,
        default: []
    }
})

const runtimeConfig = useRuntimeConfig()

await readDisableUsersAsync(`${runtimeConfig.public.apiBase}/users/disable`)

</script>