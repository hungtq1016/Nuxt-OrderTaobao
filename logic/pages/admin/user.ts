import { Pagination, RegisterRequest, Response, TokenResponse, User, UserShow } from "~/type";
const indexedDb = useAuthInfo();
const token: TokenResponse | undefined = await indexedDb.readAuthAsync();
const runtimeConfig = useRuntimeConfig()
const init_state:User = {
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    phone: "",
    userName: "",
}
const dataTable = ref<Pagination<Array<User>>>({
    pageNumber: 1,
    pageSize: 10,
    firstPage: "",
    lastPage: "",
    totalPages: 1,
    totalRecords: 1,
    nextPage: "",
    previousPage: "",
    data: [],
    error: false,
    message: "",
    statusCode: 200
})

const dataUser = ref<User>(init_state)

const dataDetail = ref<UserShow>({
    user: {
        id: "",
        email: '',
        userName: "",
        phone: "",
        firstName: "",
        lastName: "",
        enable: true,
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

    } catch (error) {
        console.log(error);
    }
}

const readUsersAsync = async (url: string) => {
    try {
        const { data } = await useAsyncData(
            'users',
            async () => {
                const data = await $fetch<Pagination<Array<User>>>(url, {
                    headers: { Accept: 'application/json', Authorization: `Bearer ${token?.accessToken ?? ''}`, },
                    params: {
                        PageNumber: dataTable.value.pageNumber,
                        PageSize: dataTable.value.pageSize
                    }
                })
                if (data) {
                    dataTable.value = data
                }
            }, { watch: [() => dataTable.value.pageNumber, () => dataTable.value.pageSize, () => dataTable.value.totalRecords] },
        )

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


    } catch (error) {
        console.log(error);
    }
}

const deleteUserAsync = async (url: string) => {
    try {
        const data = await $fetch<Response<any>>(url, {
            method: "DELETE",
            headers: { Accept: 'application/json', Authorization: `Bearer ${token?.accessToken ?? ''}`, },
        });
        dataTable.value.totalRecords--;

    } catch (error) {
        console.log(error);
    }
}
const deleteUser = async (id: string) => {
    await deleteUserAsync(`${runtimeConfig.public.apiBase}/users/${id}`)
}

const items = (row: any) => [
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
            click: async () => await deleteUser(row.id),
        }]
]
export {
    createUserAsync, readUsersAsync, updateUserAsync, deleteUserAsync, readUserAsync,
    dataTable, dataUser, dataDetail, items,init_state
}