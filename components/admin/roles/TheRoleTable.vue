<template>
    <TheTable :columns="columns" v-bind="dataRoles" :items="items" @update-page="(e: number) => dataRoles.pageNumber = e"
        @update-size="(e: number) => dataRoles.pageSize = e"
        @delete-selected="async (e: Array<string>) => await disableMultiple('roles', { ids: e, user: user.data.id })" />
</template>
    
<script setup lang="ts">

    import TheTable from '~/components/admin/table/TheTable.vue';
    import { Column } from '~/type';
    import { items, getPagedData, dataRoles } from '~/logic/pages/admin/roles';
    import { disableMultiple } from '~/logic/pages/RESTapi';
    import { Enable } from '~/enum';
    const { user } = useUserInfo();
    const props = defineProps({
        columns: {
            type: Array<Column>,
            default: []
        },
        enable:{
            type:Number as PropType<Enable>,
            default:1
        }
    })

    await getPagedData(props.enable, dataRoles,"roles");

</script>