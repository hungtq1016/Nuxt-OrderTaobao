<template>
    <TheTable :columns="columns" v-bind="dataTable" 
        :items="items" 
        @update-page="(e: number) => dataTable.pageNumber = e"
        @update-size="(e: number) => dataTable.pageSize = e"
        @delete-selected="async(e: Array<string>) => await disableMultiple('users', {ids:e,user:user.data.id})" />
</template>
    
<script setup lang="ts">
import TheTable from '~/components/admin/table/TheTable.vue';
import { Column } from '~/type';
import { items, getPagedData, dataTable } from '~/logic/pages/admin/users';
import { disableMultiple } from '~/logic/pages/RESTapi';
const {user} = useUserInfo();
const props = defineProps({
    columns: {
        type: Array<Column>,
        default: []
    }
})

await getPagedData()

</script>