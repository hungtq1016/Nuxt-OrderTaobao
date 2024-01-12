<template>
    <TheTable :columns="columns" v-bind="dataClaims" :items="items" @update-page="(e: number) => dataClaims.pageNumber = e"
        @update-size="(e: number) => dataClaims.pageSize = e"
        @delete-selected="async (e: Array<string>) => await eraseMuliple('roles', { ids: e, user: user.data.id })"
        @restore-selected="async (e: Array<string>) => await restoreMultiple('roles', { ids: e, user: user.data.id })" />
</template>

<script setup lang="ts">
import TheTable from '~/components/admin/table/TheTable.vue';
import { Column } from '~/type';
import { getPagedData, dataClaims, items } from '~/logic/pages/admin/roles';
import { eraseMuliple, restoreMultiple } from '~/logic/pages/RESTapi';
import { Enable } from '~/enum';
const { user } = useUserInfo();
const route = useRoute();
const props = defineProps({
    columns: {
        type: Array<Column>,
        default: []
    },
    enable: {
        type: Number as PropType<Enable>,
        default: 1
    }
})

await getPagedData(Enable.Disable, dataClaims, "roles/"+String(route.params.slug))

</script>