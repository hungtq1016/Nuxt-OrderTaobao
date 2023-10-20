<template>
    <div>
        <div class="sm:flex sm:items-center">
            <div class="sm:flex-auto">
                <h3 class="text-lg font-semibold leading-6 text-gray-900">Thông tin cơ bản</h3>
            </div>
            <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <NuxtLink type="button" :to="`/admin/user/edit/${user.id}`"
            class="block border border-gray-600 rounded-md px-3 py-2 text-center text-sm font-semibold text-gray-900 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Tùy Chỉnh</NuxtLink>
            </div>
        </div>

        <div class="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
            <div class="pt-6 sm:flex">
                <div class="font-medium text-base text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Địa Chỉ Email</div>
                <div class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                    <div class="text-gray-900">{{ user.email }}</div>
                </div>
            </div>
            <div class="pt-6 sm:flex">
                <dt class="font-medium text-base text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Tài Khoản</dt>
                <dd class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                    <div class="text-gray-900">{{ user.userName }}</div>
                </dd>
            </div>
            <div class="pt-6 sm:flex">
                <dt class="font-medium text-base text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Họ và Tên</dt>
                <dd class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                    <div class="text-gray-900">{{ user.firstName }}  {{ user.lastName }}</div>
                </dd>
            </div>
            <div class="pt-6 sm:flex">
                <dt class="font-medium text-base text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Số Điện Thoại</dt>
                <dd class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                    <div class="text-gray-900 inline-block relative after:content-['XXXXXXX'] after:absolute after:right-0 after:bg-white">{{ user.phone }}</div>
                </dd>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps(['user'])
</script>
