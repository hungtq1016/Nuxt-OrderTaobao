<template>
    <div>
        <h2 class="text-base font-semibold leading-7 text-gray-900">Quyền Hạn</h2>
        <p class="mt-1 text-sm leading-6 text-gray-500">Quyền hạn tối đa người sở hữu có quyền.</p>

        <USelectMenu v-model="selected" :options="roles" multiple placeholder="Select people" />

        <div class="flex border-t border-gray-100 pt-6">
            <button type="button" class="text-sm font-semibold leading-6 text-indigo-600 hover:text-indigo-500"><span
                    aria-hidden="true">+</span> Thêm</button>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps(['roles'])
const selected = ref(props.roles)
</script>
