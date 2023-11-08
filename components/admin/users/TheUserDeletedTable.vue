<template>
    <TheTable :columns="columns" v-bind="dataDisableTable" 
        :items="itemsDelete"
        @update-page="(e: number) => dataDisableTable.pageNumber = e"
        @update-size="(e: number) => dataDisableTable.pageSize = e"
        @delete-selected="async(e: Array<string>) => await eraseMuliple('users', {ids:e,user:user.data.id})" 
        @restore-selected="async(e: Array<string>) => await restoreMultiple('users', {ids:e,user:user.data.id})" />
</template>

<script setup lang="ts">
import TheTable from '~/components/admin/table/TheTable.vue';
import { Column } from '~/type';
import { getDisablePagedData, dataDisableTable, itemsDelete} from '~/logic/pages/admin/users';
import { eraseMuliple,restoreMultiple } from '~/logic/pages/RESTapi';
const {user} = useUserInfo();
const props = defineProps({
    columns: {
        type: Array<Column>,
        default: []
    }
})

const runtimeConfig = useRuntimeConfig()

await getDisablePagedData()

</script>