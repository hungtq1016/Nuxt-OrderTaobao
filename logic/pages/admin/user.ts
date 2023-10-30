import { Pagination, RegisterRequest, Response, TokenResponse, User, UserShow } from "~/type";
import type { FormError} from '@nuxt/ui/dist/runtime/types'
import { useRequest } from "~/composables/useRequest";

const indexedDb = useAuthInfo();
const runtimeConfig = useRuntimeConfig()
const { callBackNotification } = useNotification()
const { PostRequest,PutRequest,DeleteRequest } = useRequest()

const init_state : User = {
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    phone: "",
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
    if (!phoneRegex.test(state.phone)) errors.push({ path: 'phone', message: 'Invalid phone' })
    if (!state.userName) errors.push({ path: 'username', message: 'Invalid user name' })
    if (!state.firstName) errors.push({ path: 'firstname', message: 'Invalid first name' })
    if (!state.lastName) errors.push({ path: 'lastname', message: 'Invalid last name' })
    return errors
}

const validateEdit = (state: RegisterRequest): FormError[] => {
    const errors = []
    if (!emailRegex.test(state.email)) errors.push({ path: 'email', message: 'Invalid email' })
    if (!phoneRegex.test(state.phone)) errors.push({ path: 'phone', message: 'Invalid phone' })
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
        phone: "",
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

const createUserAsync = async (url: string, body: RegisterRequest) => {
    if (await PostRequest(url,body)) {
        await navigateTo('/admin/user');
    }
}

const readUsersAsync = async (url: string) => {
    const token: TokenResponse | undefined = await indexedDb.readAuthAsync();

    try {
        await useAsyncData(
            'dataTable',
            async () => {
                const data = await $fetch<Response<Pagination<Array<User>>>>(url, {
                    headers: { Accept: 'application/json', Authorization: `Bearer ${token?.accessToken ?? ''}`, },
                    params: {
                        PageNumber: dataTable.value.pageNumber,
                        PageSize: dataTable.value.pageSize
                    }
                })
                
                if (data) {
                    dataTable.value = data.data
                }
            }, { watch: [() => dataTable.value.pageNumber, () => dataTable.value.pageSize, () => dataTable.value.totalRecords] },
        )

    } catch (error) {
        throw error;
    }
}

const readDisableUsersAsync = async (url: string) => {
    const token: TokenResponse | undefined = await indexedDb.readAuthAsync();

    try {
        await useAsyncData(
            'dataDisableTable',
            async () => {
                const data = await $fetch<Response<Pagination<Array<User>>>>(url, {
                    headers: { Accept: 'application/json', Authorization: `Bearer ${token?.accessToken ?? ''}`, },
                    params: {
                        PageNumber: dataDisableTable.value.pageNumber,
                        PageSize: dataDisableTable.value.pageSize
                    }
                })
                if (data) {
                    dataDisableTable.value = data.data
                }
            }, { watch: [() => dataDisableTable.value.pageNumber, () => dataDisableTable.value.pageSize, () => dataDisableTable.value.totalRecords] },
        )

    } catch (error) {
        throw error;
    }
}

const readUserAsync = async (url: string) => {
    const token: TokenResponse | undefined = await indexedDb.readAuthAsync();

    try {
        await useAsyncData(
            'users',
            async () => {
                const data = await $fetch<Response<UserShow>>(url, {
                    headers: { Accept: 'application/json', Authorization: `Bearer ${token?.accessToken ?? ''}`, },
                })
                if (data) {
                    dataDetail.value = data.data
                }
            }
        )
    } catch (error) {
        console.log(error);
    }
}

const updateUserAsync = async (url: string, body: RegisterRequest) => {
    if (await PutRequest(url,body)) {
        await navigateTo('/admin/user');
    }
}

const deleteUserAsync = async (url: string,body:any) => {
    if (await DeleteRequest(url,body)) {
        dataDisableTable.value.totalRecords--;
        dataTable.value.totalRecords--;
    }
}

const restoreUserAsync = async (url: string,body:any) =>{
    if (await PutRequest(url,body)) {
        dataDisableTable.value.totalRecords--;
        dataTable.value.totalRecords++;
    }
}

const deleteUser = async (id: string) => {
    callBackNotification("Want to delete user?", () => deleteUserAsync(`${runtimeConfig.public.apiBase}/users/single/delete/${id}`,null))
}

const eraseUser = async (id: string) => {
    callBackNotification("Want to delete user?", () => deleteUserAsync(`${runtimeConfig.public.apiBase}/users/single/erase/${id}`,null))
}

const restoreUser = async (id: string) => {
    callBackNotification("Want to delete user?", () => restoreUserAsync(`${runtimeConfig.public.apiBase}/users/single/restore/${id}`,null))
}

const items = (row: User) :any=> [
    [
        {
            label: 'View',
            icon: 'i-heroicons-eye-20-solid',
            click: async () => await navigateTo(`/admin/user/${row.id}`),
            shortcuts: ['V'],
        }, {
            label: 'Edit',
            icon: 'i-heroicons-pencil-square-20-solid',
            click: async () => await navigateTo(`/admin/user/edit/${row.id}`),
            shortcuts: ['E'],
        }, {
            label: 'Clone',
            icon: 'i-heroicons-document-duplicate-20-solid',
            shortcuts: ['C'],
        }], [{
            label: 'Delete',
            icon: 'i-heroicons-trash-20-solid',
            shortcuts: ['D'],
            click: async () => await deleteUser(String(row.id)),
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
    createUserAsync, readUsersAsync, updateUserAsync, deleteUserAsync, readUserAsync, readDisableUsersAsync,
    dataTable, state, dataDetail, items, init_state, dataDisableTable, itemsDelete, validate,validateEdit,restoreUserAsync
}