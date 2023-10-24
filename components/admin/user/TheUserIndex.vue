<template>
    <section>
        <UTabs :items="tabs" class="w-full">
            <template #item="{ item }">
                <UCard @submit.prevent="">
                    <template #header>
                        <ThePageHeader v-bind="item.header" />
                    </template>
                    <TheUserTable v-if="item.key === 'list'" :columns="columns" />
                    <TheUserDeletedTable v-else :columns="columns" />
                </UCard>
            </template>
        </UTabs>
    </section>
</template>

<script setup lang="ts">
import ThePageHeader from '~/components/admin/include/ThePageHeader.vue';
import { Column } from '~/type';
import TheUserDeletedTable from '~/components/admin/user/TheUserDeletedTable.vue';
import TheUserTable from '~/components/admin/user/TheUserTable.vue';


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
        tooltip: "Only administrators have access to view the data."
    }
}]
</script>
