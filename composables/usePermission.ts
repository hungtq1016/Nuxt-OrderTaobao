import { storeToRefs } from "pinia";
import { Authentication, Permission } from "~/type";

const adminPermission = async (): Promise<boolean> => {
    const admin = '/authorize/admin-permission';  
    return permission(admin);
}
const userPermisson = async (): Promise<boolean> => {
    const customer = '/authorize/user-permission';  
    return permission(customer);
}

const permission = async (role:string):Promise<boolean> => {
    const runtimeConfig = useRuntimeConfig();
    const apiurl = runtimeConfig.public.apiBase;
    
    const indexedDb = useAuthInfo();
    const token: Authentication | undefined = await indexedDb.readAuthAsync();
    const userStore = useUserInfo()
    const{user,isAuthen} = storeToRefs(userStore)
    if (token == undefined) {
        return Promise.resolve(false);
    }else{
        try {  
            const data = await $fetch<Permission>(apiurl+role,{
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
                if (data?.user !== undefined) {
                    user.value = data?.user
                } 
                if (data.isPermission === true) {
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

export {canAccess,userPermisson,adminPermission}