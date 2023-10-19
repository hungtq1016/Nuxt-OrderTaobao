<template>
  <section>
    <ThePageHeader v-bind="header_props" />
    <TheTable :columns="columns" v-bind="page" @update-page="(e:number)=>page.pageNumber = e" @update-size="(e:number)=>page.pageSize = e"/>
  </section>
</template>
  
<script setup lang="ts">
import ThePageHeader from '~/components/admin/include/ThePageHeader.vue';
import TheTable from '~/components/admin/table/TheTable.vue';
import { TokenResponse,Column } from '~/type';
import { User,Pagination } from '~/type';

definePageMeta({
  layout: "admin",
  middleware: ['admin']
})
useHead({
  title: 'Danh Sách Người Dùng | Order Taobao',
  meta: [
    { name: 'description', content: 'user' }
  ],
})
const header_props = {
  title: "Danh sách người dùng",
  desc: "Hiển thị danh sách người dùng",
  slug: "/admin/user/add",
  slug_title: "Thêm mới"
}
const columns:Array<Column> = [{
  key: 'id',
  label: 'ID'
}, {
  key: 'userName',
  label: 'Tài Khoản',
  sortable: true
},
{
  key: 'email',
  label: 'Email',
  sortable: true
}, {
  key: 'firstName',
  label: 'Họ'
}, {
  key: 'lastName',
  label: 'Tên'
},
{
  key: 'phone',
  label: 'Số Điện Thoại'
},
{ key: 'actions', label: 'Tùy Chỉnh' }
]

const indexedDb = useAuthInfo();
const token: TokenResponse | undefined = await indexedDb.readAuthAsync();
const page = ref<Pagination<Array<User>>>({
    pageNumber:1,
    pageSize:10,
    firstPage:"",
    lastPage :"",
    totalPages :1,
    totalRecords :1,
    nextPage :"",
    previousPage :"",
    data:[],
    error:false,
    message:"",
    statusCode:200
})

const runtimeConfig = useRuntimeConfig()
const url = ref<string>(runtimeConfig.public.apiBase+'/users')

await useAsyncData(
    'users',
    async() => {
      const data = await $fetch<Pagination<Array<User>>>(url.value, {
        headers: { Accept: 'application/json', Authorization: `Bearer ${token?.accessToken ?? ''}`, },
        params: {
          PageNumber: page.value.pageNumber,
          PageSize:page.value.pageSize
        } 
      })
      if (data) {
        page.value = data
      }
    }, { watch: [()=>page.value.pageNumber,()=>page.value.pageSize] },
  )
</script>