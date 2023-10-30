import { Permission, TokenResponse, User ,Response} from "~/type";
import { storeToRefs } from "pinia";

const runtimeConfig = useRuntimeConfig();
const indexedDb = useAuthInfo();

export const usePermission = () => {
    const userStore = useUserInfo();

    const isAuthen = async () => {
        const { isEmpty } = storeToRefs(userStore)
        if (isEmpty.value) {
            await setToState()
        }
    }
    
    const isViewAdminPage = async () => {
        const { isEmpty } = storeToRefs(userStore)
        if (isEmpty.value) {
            await setToState()
        }
    }

    const setToState = async (): Promise<void> => {
        const result : Permission<User> | undefined = await userInfo();
        const { user } = storeToRefs(userStore)

        if (result == undefined) {
            await navigateTo('/auth/login')
        }else{
            user.value = result
        }
     ;
    }
    
    const userInfo = async (): Promise<Permission<User>|undefined> => {
        const token: TokenResponse | undefined = await indexedDb.readAuthAsync();    
        if (!token) {
            await navigateTo('/auth/login')
        }else{
            const url:string = `${runtimeConfig.public.apiBase}/authorize/user-info`;
            try {   
                const { data,error } = await useFetch<Response<Permission<User>>>(url, {
                    method: "POST",
                    headers:
                    {
                        Authorization: `Bearer ${token?.accessToken ?? ''}`,
                    },
                    body: token
                })
                if (data.value) return Promise.resolve(data.value.data);
                if (error.value) return Promise.resolve(undefined);
            } catch (error) {
                console.log(error);
                return Promise.resolve(undefined);
            }
        }
        
    }
    
    return { userInfo, isViewAdminPage, isAuthen }
}
