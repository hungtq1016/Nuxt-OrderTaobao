import { storeToRefs } from "pinia";
import { TokenResponse, Permission,User } from "~/type";


const permissionAsync = async (): Promise<boolean> => {
    const customer = '/authorize/permission';  
    return ResolvePermission(customer,false);
}

const ResolvePermission = async (role:string,admin:boolean):Promise<boolean> => {
    const runtimeConfig = useRuntimeConfig();
    const apiurl = runtimeConfig.public.apiBase;
    
    const indexedDb = useAuthInfo();
    const token: TokenResponse | undefined = await indexedDb.readAuthAsync();
    const userStore = useUserInfo()
    const{user,isAuthen,adminPermission} = storeToRefs(userStore)  
    if (token == undefined) {
        return Promise.resolve(false);
    }else{
        try {  
            const data = await $fetch<Permission<User>>(apiurl+role,{
                method:"POST",
                headers: 
                    { 
                        Authorization:`Bearer ${token?.accessToken ?? ''}`,
                    },
                body:token
            })
            
            if (data.error) {
                return Promise.resolve(false);
            }else{
                if (data?.data !== undefined) {
                    user.value = data?.data
                } 
                if (data.isAuthen === true) {
                    adminPermission.value = data.adminPermission
                    isAuthen.value = true
                    return Promise.resolve(true);
                }  
            }            
            return Promise.resolve(false);
        } catch (error) {
            return Promise.resolve(false);
        }
    }
}

export {canAccess,permissionAsync}