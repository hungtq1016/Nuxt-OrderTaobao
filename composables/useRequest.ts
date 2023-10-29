import { Response, TokenResponse } from "~/type";
const indexedDb = useAuthInfo();
const token: TokenResponse | undefined = await indexedDb.readAuthAsync();

const { errorNotification, successNotification } = useNotification()

export const useRequest = () => {

    const GetRequest = async (url: string) => {
        try {
            const data = await $fetch<Response<any>>(url, {
                method: "GET",
                headers: { Accept: 'application/json', Authorization: `Bearer ${token?.accessToken ?? ''}` },
            });

            if (!data.error) {
                successNotification(data.message, 'Operation successful');
                return true;
            }
        } catch (error) {
            errorNotification('Operation failed');
        }

        return false;
    };

    const PostRequest = async (url: string, body: any) => {
        try {
            const data = await $fetch<Response<any>>(url, {
                method: "POST",
                headers: { Accept: 'application/json', Authorization: `Bearer ${token?.accessToken ?? ''}` },
                body: body,
            });

            if (!data.error) {
                successNotification(data.message, 'Operation successful');
                return true;
            }
        } catch (error) {
            errorNotification('Operation failed');
        }

        return false;
    };

    const PutRequest = async (url: string, body: any) => {
        try {
            const data = await $fetch<Response<any>>(url, {
                method: "PUT",
                headers: { Accept: 'application/json', Authorization: `Bearer ${token?.accessToken ?? ''}` },
                body: body,
            });

            if (!data.error) {
                successNotification(data.message, 'Operation successful');
                return true;
            }
        } catch (error) {
            errorNotification('Operation failed');
        }

        return false;
    };

    const DeleteRequest = async (url: string, body: any) => {
        try {
            const data = await $fetch<Response<any>>(url, {
                method: "DELETE",
                headers: { Accept: 'application/json', Authorization: `Bearer ${token?.accessToken ?? ''}` },
                body: body,
            });

            if (!data.error) {
                successNotification(data.message, 'Operation successful');
                return true;
            }
        } catch (error) {
            errorNotification('Operation failed');
        }

        return false;
    };

    return {
        GetRequest,DeleteRequest,PostRequest,PutRequest
    }
}