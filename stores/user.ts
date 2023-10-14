import { Authentication, UserInfo } from "~/type"

const init_user : UserInfo = {
    id: '',
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    roles:[]
}

const path = '/authenticate/check-oauth'

export const useUserInfo = defineStore('userInfo',() => {
    const indexedDb = useAuthInfo();
    const runtimeConfig = useRuntimeConfig()

    const apiurl = runtimeConfig.public.apiBase
    
    const user = ref(init_user)
    const isAdmin = ref<boolean>(false)
    const isCustomer = ref<boolean>(false)
    const isAuthen = ref<boolean>(false)
    const permission = async() => {
        const auth: Authentication | undefined = await indexedDb.readAuthAsync();

        const { data, error, pending } = await useFetch<Array<string>>(`${apiurl+path}`, {
            method: "POST",
            headers: { Authorization:`Bearer ${auth?.accessToken ?? ''}`} ,
            onRequestError({ request, options, error }) {
                isAuthen.value = false
                console.log(error);
                
            },
            onResponse({ request, response, options }) {
                isAuthen.value = response.status == 200 ? true : false
                const res1 = response._data.find((val:string)=>val=='Admin')
                const res2 = response._data.find((val:string)=>val=='Customer')
                
                isAdmin.value = res1 ? true : false
                isCustomer.value = res2 ? true : false
            },
            body:auth
        });
   
    }
    permission()
    const isEmpty: ComputedRef<boolean> = computed((): boolean => {
        return isObjectEmpty(user.value)
    });
    const clear = async ()=>{
        var res = await indexedDb.deleteAuthAsync()
        console.log()
    }
    return {user,isEmpty,isAdmin,isCustomer,permission,clear}
})
