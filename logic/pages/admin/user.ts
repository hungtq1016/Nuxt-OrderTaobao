import { Pagination, RegisterRequest, Response, TokenResponse, User, UserShow } from "~/type";
import type { FormError } from '@nuxt/ui/dist/runtime/types'

const indexedDb = useAuthInfo();
const token: TokenResponse | undefined = await indexedDb.readAuthAsync();
const runtimeConfig = useRuntimeConfig()
const { errorNotification, successNotification, callBackNotification } = useNotification()

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

const dataDeletedTable = ref<Pagination<Array<User>>>(init_table)

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
    try {
        const data = await $fetch<Response<any>>(url, {
            method: "POST",
            headers: { Accept: 'application/json', Authorization: `Bearer ${token?.accessToken ?? ''}`, },
            body: body
        });
        if (!data.error) {
            successNotification(data.message, 'Create User.')
            await navigateTo('/admin/user');
        }
    } catch (error) {
        console.log(error);
        errorNotification('Cannot create.')
    }
}

const readUsersAsync = async (url: string) => {
    try {
        await useAsyncData(
            'users',
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
        console.log(error);
    }
}

const readUsersDeletedAsync = async (url: string) => {
    try {
        const { data, pending, error, refresh } = await useAsyncData<Response<Pagination<Array<User>>>>(
            'usersDeleted',
            async () => await $fetch<Response<Pagination<Array<User>>>>(url, {
                headers: { Accept: 'application/json', Authorization: `Bearer ${token?.accessToken ?? ''}`, },
                params: {
                    PageNumber: dataTable.value.pageNumber,
                    PageSize: dataTable.value.pageSize
                },
            }), 
            { watch: [() => dataDeletedTable.value.pageNumber, () => dataDeletedTable.value.pageSize, () => dataDeletedTable.value.totalRecords] },
        )
        return { data, pending, error, refresh }
    } catch (error) {
        console.log(error);
    }
}

const readUserAsync = async (url: string) => {
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
    try {
        const data = await $fetch<Response<any>>(url, {
            method: "PUT",
            headers: { Accept: 'application/json', Authorization: `Bearer ${token?.accessToken ?? ''}`, },
            body: body
        });
        if (!data.error) {
            successNotification(data.message, 'Update User.')
            await navigateTo('/admin/user');
        }
    } catch (error) {
        console.log(error);
        errorNotification('Cannot update.')
    }
}

const deleteUserAsync = async (url: string) => {
    try {
        const data = await $fetch<Response<any>>(url, {
            method: "DELETE",
            headers: { Accept: 'application/json', Authorization: `Bearer ${token?.accessToken ?? ''}`, },
        });
        if (!data.error) {
            successNotification(data.message, 'Delete User.')
            dataDeletedTable.value.totalRecords--;
            dataTable.value.totalRecords--;

        }
    } catch (error) {
        console.log(error);
        errorNotification('Cannot delete.')
    }
}

const deleteUser = async (id: string) => {
    callBackNotification("Want to delete user?", () => deleteUserAsync(`${runtimeConfig.public.apiBase}/users/${id}`))
}

const absoluteDelete = async (id: string) => {
    callBackNotification("Want to delete user?", () => deleteUserAsync(`${runtimeConfig.public.apiBase}/users/${id}/delete`))
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
            click: async () => await navigateTo(`/admin/user/edit/${row.id}`),
            shortcuts: ['R'],
        }], [{
            label: 'Absolute Delete',
            icon: 'i-heroicons-trash-20-solid',
            shortcuts: ['A'],
            click: async () => await absoluteDelete(String(row.id)),
        }]
]


export {
    createUserAsync, readUsersAsync, updateUserAsync, deleteUserAsync, readUserAsync, readUsersDeletedAsync,
    dataTable, state, dataDetail, items, init_state, dataDeletedTable, itemsDelete, validate
}