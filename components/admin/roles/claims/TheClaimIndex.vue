<template>
    <section>
        <UTabs :items="tabs" class="w-full">
            <template #item="{ item }">
                <UCard @submit.prevent="">
                    <template #header>
                        <ThePageHeader v-bind="item.header" />
                    </template>
                    <TheRoleClaimTable v-if="item.key === 'list'"
                    :columns="columns" :enable="Enable.All"/>
                    <TheForm v-else/>
                </UCard>
            </template>
        </UTabs>
    </section>
</template>

<script setup lang="ts">
import ThePageHeader from '~/components/admin/include/ThePageHeader.vue';
import { Column } from '~/type';
import { Enable } from '~/enum';
import { getPagedData } from '~/logic/pages/admin/roles';
import { dataClaims } from '~/logic/pages/admin/roles';
import TheRoleClaimTable from './TheRoleClaimTable.vue';
import TheForm from './TheForm.vue';

const columns: Array<Column> = [
    {
        key: 'type',
        label: 'Type'
    }, 
    {
        key: 'value',
        label: 'Value'
    },
    { key: 'actions', label: 'Actions' }
]

const tabs = [
    {
        key: 'list',
        label: 'Claim List',
        header: {
            title: 'Roles List',
            desc: "Display a list of roles",
            slug: "/admin/roles",
            slug_title: "List"
        }
    },
    {
        key: 'add',
        label: 'Add Claim',
        header: {
            title: 'Add Claim',
            desc: "Add new claim for role"
        }
    }
]
const route = useRoute();

await getPagedData(Enable.Disable, dataClaims, "roles/"+String(route.params.slug))

</script>
