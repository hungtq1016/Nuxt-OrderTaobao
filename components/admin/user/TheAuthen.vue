<template>
    <div>
        <div class="sm:flex sm:items-center">
            <div class="sm:flex-auto">
                <h3 class="text-lg font-semibold leading-6 text-gray-900">Xác minh 2 bước</h3>
            </div>
           
        </div>
        <div class="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
            <div class="pt-6 sm:flex">                
                <div class="font-medium text-base text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Xác thực điện thoại</div>
                <div class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                    <div class="text-gray-900">{{ user.phoneNumberConfirmed }}</div>
                </div>
            </div>
            <div class="pt-6 sm:flex">                
                <div class="font-medium text-base text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Xác thực 2 bước</div>
                <div class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                    <div class="text-gray-900">{{ user.twoFactorEnabled }}</div>                
                </div>
            </div>
            <div class="pt-6 sm:flex">                
                <div class="font-medium text-base text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Xác thực email</div>
                <div class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                    <div class="text-gray-900">{{ user.emailConfirmed }}</div>
                </div>
            </div>
        </div>
        <!-- <div class="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
            <div class="pt-6 sm:flex">                
                <div class="font-medium text-base text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Xác thực điện thoại</div>
                <div class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                    <div v-if="user.phoneNumberConfirmed"
                        class="text-gray-900">Đã xác thực</div>
                    <button v-else type="button" class="font-semibold text-indigo-600 hover:text-indigo-500">Xác thực ngay</button>
                </div>
            </div>
            <div class="pt-6 sm:flex">                
                <div class="font-medium text-base text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Xác thực 2 bước</div>
                <div class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                    <div v-if="user.twoFactorEnabled"
                        class="text-gray-900">Đã xác thực</div>
                    <button v-else type="button" class="font-semibold text-indigo-600 hover:text-indigo-500">Xác thực ngay</button>
                </div>
            </div>
            <div class="pt-6 sm:flex">                
                <div class="font-medium text-base text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Xác thực email</div>
                <div class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                    <div v-if="user.emailConfirmed"
                        class="text-gray-900">Đã xác thực</div>
                    <button v-else type="button" class="font-semibold text-indigo-600 hover:text-indigo-500">Xác thực ngay</button>
                </div>
            </div>
        </div> -->
    </div>
</template>

<script setup lang="ts">
const props = defineProps(['user'])
</script>
