import { Authentication, UserInfo } from "~/type";
const indexedDb = useAuthInfo();
// const adminPermission = async () =>{
//     const {isEmpty} = useUserInfo()
//     if (isEmpty) {
//         await setUpState();
//     }
// }

// const setUpState = async (): Promise<void> => {
//     const {canAccess} = usePageAccessPermission();
//     const resp: Response<BasicCustomerInfo> | undefined = await canAccess();
//     if (!resp || resp.isError) {
//         onUnAuthorize();
//     } else {
//         const responseBody: BasicCustomerInfo = resp.body as BasicCustomerInfo;
//         const {setCustomer} = useCustomerBasicInfo();
//         setCustomer(responseBody);
//     }
//     return Promise.resolve();
// }

const canAccess = async (): Promise<UserInfo | undefined> => {
    const auth: Authentication | undefined = await indexedDb.readAuthAsync();
    const user_info = '/authenticate/user-info';
    const runtimeConfig = useRuntimeConfig();

    const apiurl = runtimeConfig.public.apiBase;

    // if (!auth) {
    //     navigateTo('/auth/login')
    // } else {
        
    // }
    try {

        const {data,error,pending} = await useFetch<Array<string>>(`${apiurl+user_info}`, {
            method: "POST",
            headers: { Authorization:`Bearer ${auth?.accessToken ?? ''}`} ,
            body:auth
        });
        console.log(data,error,pending);
        
        if (error.value) {
            return Promise.resolve(undefined);
        } else {
            // const user
            // return Promise.resolve();
        }
    } catch (error) {
        console.log(error);
        return Promise.resolve(undefined);
    }
}

const userPermisson = async (): Promise<boolean | undefined> => {
    const auth: Authentication | undefined = await indexedDb.readAuthAsync();
    const customer = '/authorize/customer';
    const runtimeConfig = useRuntimeConfig();

    const apiurl = runtimeConfig.public.apiBase;

    if (!auth) {
        navigateTo('/auth/login')
    } else {
        try {
            await useFetch<boolean>(`${apiurl+customer}`, {
                method: "GET",
                headers: { Authorization:`Bearer ${auth?.accessToken ?? ''}`} ,
            })
        } catch (error) {
            console.log(error);
            return Promise.resolve(false);
        }
    }
    
}


export {canAccess,userPermisson}