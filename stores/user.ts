import { Authentication, UserInfo } from "~/type"

const init_user : UserInfo = {
    id: '',
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
}
const isPermission = (array:Array<string>,role:string) : boolean=>{
    let result = array.findIndex((item:string)=>item.toLocaleUpperCase() === role.toLocaleUpperCase())
    return result>-1? true: false
}

const path = '/authenticate/check-oauth'
const user_info = '/authenticate/user-info'

export const useUserInfo = defineStore('userInfo',() => {
    const indexedDb = useAuthInfo();
    const runtimeConfig = useRuntimeConfig()

    const apiurl = runtimeConfig.public.apiBase
    
    const user = ref(init_user)
    const isCustomer = ref<boolean>(false)
    const isManager = ref<boolean>(false)
    const isAdmin = ref<boolean>(false)
    const isStaff = ref<boolean>(false)
    const isCollaborator = ref<boolean>(false)
    const isSuperAdmin = ref<boolean>(false)
    const isVisitor = ref<boolean>(false)
    const isAuthen = ref<boolean>(false)
    
    const permission = async() : Promise<void>=> {
        const auth: Authentication | undefined = await indexedDb.readAuthAsync();
 
        if (auth == undefined) {
                isCustomer.value = false
                isManager.value = false
                isAdmin.value = false
                isStaff.value = false
                isCollaborator.value = false
                isSuperAdmin.value = false
                isVisitor.value = false
                isAuthen.value = false
                return
        }
        await useFetch<Array<string>>(`${apiurl+path}`, {
            method: "POST",
            headers: { Authorization:`Bearer ${auth?.accessToken ?? ''}`} ,
            onRequestError({ request, options, error }) {
                
                if (error){
                    isCustomer.value = false
                    isManager.value = false
                    isAdmin.value = false
                    isStaff.value = false
                    isCollaborator.value = false
                    isSuperAdmin.value = false
                    isVisitor.value = false
                    isAuthen.value = false
                    
                    return
                }
                    
            },
            async onResponse({response}) {
                
                if (response.status == 200 && !response._data.error) {   
                    const arr:Array<string> = response._data.roles
                    isCustomer.value = isPermission(arr,'customer')
                    isManager.value = isPermission(arr,'manager')
                    isAdmin.value = isPermission(arr,'admin')
                    isStaff.value = isPermission(arr,'staff')
                    isCollaborator.value = isPermission(arr,'collaborator')
                    isSuperAdmin.value = isPermission(arr,'superadmin')
                    isVisitor.value = isPermission(arr,'visitor')
                    isAuthen.value = true
                    await fetchUser(auth)
                }else{              
                    await indexedDb.deleteAuthAsync()
                    isCustomer.value = false
                    isManager.value = false
                    isAdmin.value = false
                    isStaff.value = false
                    isCollaborator.value = false
                    isSuperAdmin.value = false
                    isVisitor.value = false
                    isAuthen.value = false
                }                         
            },
            body:auth
        }); 
    }

    const fetchUser = async(token:Authentication)=>{
        
        await useFetch<Array<string>>(`${apiurl+user_info}`, {
            method: "POST",
            headers: { Authorization:`Bearer ${token?.accessToken ?? ''}`} ,
            onRequestError({ request, options, error }) {    
                if (error){
                    console.log(error);                    
                    return
                }                    
            },
            async onResponse({response}) {                         
                if (response.status == 200 && !response._data.error) {   
                    user.value.email =response._data.email;
                    user.value.userName =response._data.userName;
                    user.value.firstName =response._data.firstName;
                    user.value.lastName =response._data.lastName;
                }                                 
            },
            body:token
        });
    }
    
    const isEmpty: ComputedRef<boolean> = computed((): boolean => {
        return isObjectEmpty(user.value)
    });
    const logout = async (): Promise<void> => {
        const res = await indexedDb.deleteAuthAsync()
        if (res) {
            isCustomer.value = false
            isManager.value = false
            isAdmin.value = false
            isStaff.value = false
            isCollaborator.value = false
            isSuperAdmin.value = false
            isVisitor.value = false
            isAuthen.value = false
            user.value = init_user
            await navigateTo('/auth/login')
            return;
        }
    }

    return {user,isEmpty,isAuthen,
        isAdmin,isCollaborator,isSuperAdmin,isCustomer,isManager,isStaff,isVisitor,
        permission,logout,fetchUser}
})
