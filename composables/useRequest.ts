import { Response, TokenResponse } from "~/type";



export const useRequest =  () => {
    const indexedDb = useAuthInfo();
    const { errorNotification, successNotification } = useNotification()

    const GetRequest = async <T>(url: string) : Promise<T|undefined> => {
        const token: TokenResponse | undefined = await indexedDb.readAuthAsync();
        
        try {
            const {data,error} = await useFetch<Response<T>>(url, {
                method: "GET",
                headers: { Accept: 'application/json', Authorization: `Bearer ${token?.accessToken ?? ''}` },
            });

            if (data.value?.data) {
                return data.value?.data;
            }

            if (error.value?.data) {
                errorNotification('Operation failed',error.value.data.message);
                return undefined;
            }
        } catch (error) {
            errorNotification('Operation failed');
            throw error;
        }

        return undefined;
    };

    const PostRequest = async (url: string, body: any) => {
        const token: TokenResponse | undefined = await indexedDb.readAuthAsync();

        try {
            const {data,error} = await useFetch<Response<any>>(url, {
                method: "POST",
                headers: { 
                    Accept: 'application/json', 
                    Authorization: `Bearer ${token?.accessToken ?? ''}` ,
                    "Content-Type": "application/json",
                },
                body: body,
            });

            if (data.value?.data) {
                successNotification(data.value.message, 'Operation successful');
                return true;
            }

            if (error.value?.data) {
                errorNotification('Operation failed',error.value.data.message);
            }
        } catch (error) {
            errorNotification('Operation failed');
            throw error;
        }

        return false;
    };

    const PutRequest = async (url: string, body: any) => {
        const token: TokenResponse | undefined = await indexedDb.readAuthAsync();

        try {
            const {data,error} = await useFetch<Response<any>>(url, {
                method: "PUT",
                headers: { Accept: 'application/json', Authorization: `Bearer ${token?.accessToken ?? ''}` },
                body: body,
            });

            if (data.value?.data) {
                successNotification(data.value.message, 'Operation successful');
                return true;
            }

            if (error.value?.data) {
                errorNotification('Operation failed',error.value.data.message);
            }
        } catch (error) {
            errorNotification('Operation failed');
            throw error;
        }

        return false;
    };

    const DeleteRequest = async (url: string, body: any) => {
        const token: TokenResponse | undefined = await indexedDb.readAuthAsync();

        try {
            const {data,error} = await useFetch<Response<any>>(url, {
                method: "DELETE",
                headers: { Accept: 'application/json', Authorization: `Bearer ${token?.accessToken ?? ''}` },
                body: body,
            });

            if (data.value?.data) {
                successNotification(data.value.message, 'Operation successful');
                return true;
            }

            if (error.value?.data) {
                errorNotification('Operation failed',error.value.data.message);
            }
        } catch (error) {
            errorNotification('Operation failed');
            throw error;
        }

        return false;
    };

    return {
        GetRequest,DeleteRequest,PostRequest,PutRequest
    }
}