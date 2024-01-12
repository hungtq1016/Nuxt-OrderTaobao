<template>
    <section>
        <UTabs :items="tabs" class="w-full">
            <template #item="{ item }">
                <UCard @submit.prevent="">
                    <template #header>
                        <ThePageHeader v-bind="item.header" />
                    </template>
                    <TheRoleTable  :columns="columns" :enable="Enable.All"/>
                </UCard>
            </template>
        </UTabs>
    </section>
</template>

<script setup lang="ts">
import ThePageHeader from '~/components/admin/include/ThePageHeader.vue';
import { Column } from '~/type';
import TheRoleTable from '~/components/admin/roles/TheRoleTable.vue';
import { Enable } from '~/enum';
import { getPagedData } from '~/logic/pages/admin/roles';
import { dataClaims } from '~/logic/pages/admin/roles';

const columns: Array<Column> = [{
        key: 'id',
        label: 'ID'
    }, 
    {
        key: 'name',
        label: 'Name',
        sortable: true
    },
    {
        key: 'normalizedName',
        label: 'Normalized Name'
    }, 
    {
        key: 'concurrencyStamp',
        label: 'Concurrency Stamp'
    },
    { key: 'actions', label: 'Actions' }
]

const tabs = [{
    key: 'list',
    label: 'Roles List',
    header: {
        title: 'Roles List',
        desc: "Display a list of roles",
        e_excel:'roles',
        i_excel:'roles',
    }
}]

await getPagedData(Enable.Disable, dataClaims, "roles")

</script>
