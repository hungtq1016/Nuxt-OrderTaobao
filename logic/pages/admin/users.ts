import { PageRequest, Pagination, RegisterRequest, Response, TokenResponse, User, UserShow } from "~/type";
import type { FormError} from '@nuxt/ui/dist/runtime/types'
import {restore,disable,erase,get} from '~/logic/pages/RESTapi';
import { Enable } from "~/enum";

const { callBackNotification } = useNotification()

const init_state : User = {
    id:"",
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    phoneNumber: "",
    userName: "",
}

const init_table : Pagination<Array<User>> = {
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

const dataTable = ref<Pagination<Array<User>>>(init_table)

const dataDisableTable = ref<Pagination<Array<User>>>(init_table)

const state = ref<User>(init_state)

const { passwordRegex, emailRegex, phoneRegex } = useRegex()

const validate = (state: RegisterRequest): FormError[] => {
    const errors = []
    if (!passwordRegex.test(state.password)) errors.push({ path: 'password', message: 'Invalid password' })
    if (!emailRegex.test(state.email)) errors.push({ path: 'email', message: 'Invalid email' })
    if (!phoneRegex.test(state.phoneNumber)) errors.push({ path: 'phone', message: 'Invalid phone' })
    if (!state.userName) errors.push({ path: 'username', message: 'Invalid user name' })
    if (!state.firstName) errors.push({ path: 'firstname', message: 'Invalid first name' })
    if (!state.lastName) errors.push({ path: 'lastname', message: 'Invalid last name' })
    return errors
}

const validateEdit = (state: RegisterRequest): FormError[] => {
    const errors = []
    if (!emailRegex.test(state.email)) errors.push({ path: 'email', message: 'Invalid email' })
    if (!phoneRegex.test(state.phoneNumber)) errors.push({ path: 'phone', message: 'Invalid phone' })
    if (!state.userName) errors.push({ path: 'username', message: 'Invalid user name' })
    if (!state.firstName) errors.push({ path: 'firstname', message: 'Invalid first name' })
    if (!state.lastName) errors.push({ path: 'lastname', message: 'Invalid last name' })
    return errors
}

const dataDetail = ref<UserShow>({
    user: {
        id: "",
        email: '',
        userName: "",
        phoneNumber: "",
        firstName: "",
        lastName: "",
        enable: true,
        password: "",
        phoneNumberConfirmed: false,
        twoFactorEnabled: false,
        emailConfirmed: false,

    },
    notifications: [],
    orders: [],
    roles: []
})

const getPagedData = async (enable:Enable,table: Ref<Pagination<Array<User>>>) => {
    const queryObject:PageRequest = {
        pageNumber:table.value.pageNumber,
        pageSize:table.value.pageSize,
        status:enable
    }
    const queryString = "users" + objectToQuery(queryObject);
    try {
        const {data} = await useAsyncData(
            enable == 1 ? "dataTable" : "dataDisableTable",
            async () => await get<Pagination<Array<User>>>(queryString), 
            { watch: [() => table.value.pageNumber, () => table.value.pageSize, () => table.value.totalRecords] },
        )
        if (data.value?.data) {
            table.value = data.value
        }
    } catch (error) {
        throw error;
    }
}


const getById = async (id:string) => {
    try {
        await useAsyncData(
            'users',
            async () => {
                const data = await get<UserShow>('users/'+id)
                if (data) {
                    dataDetail.value = data
                }
            }
        )
    } catch (error) {
        throw error;
    }
}

const disableUser = async (id: string) => {
    callBackNotification("Want to disable user?", async() => await disable('users',id))
}

const eraseUser = async (id: string) => {
    callBackNotification("Want to erase user?", async() => await erase('users',id))
}

const restoreUser = async (id: string) => {
    callBackNotification("Want to restore user?", async() => await restore('users',id))
}

const items = (row: User) :any=> [
    [
        {
            label: 'View',
            icon: 'i-heroicons-eye-20-solid',
            click: async () => await navigateTo(`/admin/users/${row.id}`),
            shortcuts: ['V'],
        }, {
            label: 'Edit',
            icon: 'i-heroicons-pencil-square-20-solid',
            click: async () => await navigateTo(`/admin/users/edit/${row.id}`),
            shortcuts: ['E'],
        }, {
            label: 'Clone',
            icon: 'i-heroicons-document-duplicate-20-solid',
            shortcuts: ['C'],
        }], [{
            label: 'Delete',
            icon: 'i-heroicons-trash-20-solid',
            shortcuts: ['D'],
            click: async () => await disableUser(String(row.id)),
        }]
]

const itemsDelete = (row: User) => [
    [
        {
            label: 'Restore',
            icon: 'i-heroicons-pencil-square-20-solid',
            click: async () => await restoreUser(String(row.id)),
            shortcuts: ['R'],
        }], [{
            label: 'Absolute Delete',
            icon: 'i-heroicons-trash-20-solid',
            shortcuts: ['A'],
            click: async () => await eraseUser(String(row.id)),
        }]
]

export {
    getPagedData,getById,items,itemsDelete,validate,validateEdit,
    dataTable, state, dataDetail, init_state, dataDisableTable, 
}