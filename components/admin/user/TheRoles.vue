<template>
    <div>
        <div class="sm:flex sm:items-center">
            <div class="sm:flex-auto">
                <h3 class="text-lg font-semibold leading-6 text-gray-900">Quyền Hạn</h3>
            </div>
            <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                <button type="button"
                    class="block border border-gray-600 rounded-md px-3 py-2 text-center text-sm font-semibold text-gray-900 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Lưu</button>
            </div>
        </div>
        <USelectMenu v-model="selected" :options="roles" multiple placeholder="Chọn Role" class="mt-6">
            <template #label>
                <span v-if="selected.length" class="truncate">{{ selected.join(', ') }}</span>
                <span v-else>Chọn Vai Trò</span>
            </template>
        </USelectMenu>
        <div class="flex gap-1 role-group flex-wrap">
            <template v-for="item in selected">
                <div v-if="item === 'Visitor'" class="guest">{{ item }}</div>
                <div v-if="isUser(item)" class="user">{{ item }}</div>
                <div v-if="isAdmin(item)" class="admin">{{ item }}</div>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">

const props = defineProps(['roles'])
const selected = ref<Array<string>>(props.roles)

const roles: Array<string> = ["Customer", "Manager", "Staff", "Collaborator", "Visitor", "Admin"]
const user: Array<string> = ['Customer', 'Staff']
const admin: Array<string> = ['Manager', 'Collaborator', 'Admin']
const isUser = (value: string) => user.some(item => item === value)
const isAdmin = (value: string) => admin.some(item => item === value)
</script>
<style scoped lang="scss">
.role-group {
    @apply my-2;

    div {
        @apply px-2 py-0.5 border rounded-md;
    }

    .guest {
        @apply bg-sky-100 text-sky-600 border-sky-600;
    }

    .user {
        @apply bg-lime-100 text-lime-600 border-lime-600;
    }

    .admin {
        @apply bg-rose-100 text-rose-600 border-rose-600;
    }
}</style>