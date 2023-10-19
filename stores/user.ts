import { Authentication, UserInfo } from "~/type"

const init_user : UserInfo = {
    id: '',
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
}

export const useUserInfo = defineStore('userInfo',() => {

    const user = ref(init_user)
    const isAuthen = ref<boolean>(false)
    const adminPermission = ref<boolean>(false)
    
    const isEmpty: ComputedRef<boolean> = computed((): boolean => {
        return isObjectEmpty(user.value)
    });

    const logOut = async ():Promise<void> => {
        const runtimeConfig = useRuntimeConfig();
        const indexedDb = useAuthInfo();
        const apiurl = runtimeConfig.public.apiBase;
        const token: Authentication | undefined = await indexedDb.readAuthAsync();
        isAuthen.value = false
        adminPermission.value= false
        const logout = '/authenticate/logout';  
        
        if (token == undefined) {
            navigateTo('/auth/login');
        }else{
            try {  
                await $fetch<void>(apiurl+logout,{
                    method:"POST",
                    headers: 
                        { 
                            Authorization:`Bearer ${token?.accessToken ?? ''}`,
                        },
                    body:token
                })          
                const success = await indexedDb.deleteAuthAsync();
                if (success) {
                    navigateTo('/auth/login')
                }
            } catch (error) {
                console.log(error)
            }
        }
        
    }

    return {user,isEmpty,isAuthen,adminPermission,logOut}
})
