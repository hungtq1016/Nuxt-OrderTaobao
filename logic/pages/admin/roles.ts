import { PageRequest, Pagination, Role, RoleDetail, ClaimRequest} from "~/type";
import type { FormError} from '@nuxt/ui/dist/runtime/types'
import {restore,disable,erase,get} from '~/logic/pages/RESTapi';
import { Enable } from "~/enum";

const { callBackNotification } = useNotification()

const init_claims : Pagination<Array<RoleDetail>> = {
    pageNumber: 1,
    pageSize: 10,
    firstPage: "",
    lastPage: "",
    totalPages: 1,
    totalRecords: 1,
    nextPage: "",
    previousPage: "",
    data: [],
}

const init_roles : Pagination<Array<Role>> = {
    pageNumber: 1,
    pageSize: 10,
    firstPage: "",
    lastPage: "",
    totalPages: 1,
    totalRecords: 1,
    nextPage: "",
    previousPage: "",
    data: [],
}

const init_claim : ClaimRequest = {
    id:1,
    roleId : "",
    claimType:"",
    claimValue:"",
}

const dataRoles = ref<Pagination<Array<Role>>>(init_roles)
const dataClaims = ref<Pagination<Array<RoleDetail>>>(init_claims)
const dataClaim = ref<ClaimRequest>(init_claim)


const validate = (state: ClaimRequest): FormError[] => {
    const errors = []
    if (!state.claimType) errors.push({ path: 'claimType', message: 'Invalid type' })
    if (!state.claimValue) errors.push({ path: 'claimValue', message: 'Invalid value' })
    return errors
}


const getPagedData = async <T>(enable:Enable, table: Ref<Pagination<Array<T>>>, controller: String) => {
    const queryObject:PageRequest = {
        pageNumber:table.value.pageNumber,
        pageSize:table.value.pageSize,
        status:enable
    }
    const queryString = controller + objectToQuery(queryObject);
    try {
        const {data} = await useAsyncData(
            "dataTable",
            async () => await get<Pagination<Array<T>>>(queryString), 
            { watch: [() => table.value.pageNumber, () => table.value.pageSize, () => table.value.totalRecords] },
        )
        if (data.value?.data) {
            table.value = data.value
        }
    } catch (error) {
        throw error;
    }
}

const moveToTrash = async (id: string) => {
    callBackNotification("Want to move to trash?", async() => await disable('roles',id))
}

const deleteRow = async (id: string) => {
    callBackNotification("Want to delete this row?", async() => await erase('roles',id))
}

const restoreFromTrash = async (id: string) => {
    callBackNotification("Want to restore from trash?", async() => await restore('roles',id))
}

const items = (row: Role) :any=> [
    [
        {
            label: 'View',
            icon: 'i-heroicons-eye-20-solid',
            click: async () => await navigateTo(`/admin/roles/${row.id}`),
            shortcuts: ['V'],
        }, {
            label: 'Edit',
            icon: 'i-heroicons-pencil-square-20-solid',
            click: async () => await navigateTo(`/admin/roles/edit/${row.id}`),
            shortcuts: ['E'],
        }, {
            label: 'Clone',
            icon: 'i-heroicons-document-duplicate-20-solid',
            shortcuts: ['C'],
        }], [{
            label: 'Delete',
            icon: 'i-heroicons-trash-20-solid',
            shortcuts: ['D'],
            click: async () => await moveToTrash(String(row.id)),
        }]
]


export {
    getPagedData,items,validate,
    dataRoles, dataClaim, dataClaims 
}