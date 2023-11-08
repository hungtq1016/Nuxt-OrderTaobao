import { MultipleRequest } from "~/type";

const runtimeConfig = useRuntimeConfig()
const { PostRequest, PutRequest, DeleteRequest, GetRequest } = useRequest()

async function get<T>(path: string, action: string) {

    const url: string = `${runtimeConfig.public.apiBase}/${path}/${action}`;
    const result = await GetRequest<T>(url);
    if (result) {
        return result
    }
}

async function post<T>(path: string, body: T) {

    const url: string = `${runtimeConfig.public.apiBase}/${path}`;

    if (await PostRequest(url, body)) {
        await navigateTo(`/admin/${path}`);
    }
}

async function update<T>(path: string,id:string, body: T) {
    const { user } = useUserInfo();

    const url: string = `${runtimeConfig.public.apiBase}/${path}/${id}/${user.data.id}`;

    if (await PutRequest(url, body)) {
        await navigateTo(`/admin/${path}`);
    }
}

async function erase(path: string, id: string) {

    const url: string = `${runtimeConfig.public.apiBase}/${path}/erase/${id}`;

    if (await DeleteRequest(url, null)) {
        await navigateTo(`/admin/${path}`);
    }
}

async function disable(path: string, id: string) {
    await updateResource(path, id, 'disable');
}

async function restore(path: string, id: string) {
    await updateResource(path, id, 'restore');
}

async function disableMultiple(path: string, body: MultipleRequest) {
    await updateMultipleResource(path, 'disable/multiple', body);
}

async function restoreMultiple(path: string, body: MultipleRequest) {
    await updateMultipleResource(path, 'restore/multiple', body);
}

async function eraseMuliple(path: string, body: MultipleRequest) {

    const url: string = `${runtimeConfig.public.apiBase}/${path}/erase/multiple`;

    if (await DeleteRequest(url, body)) {
        await navigateTo(`/admin/${path}`);
    }
}

async function updateResource(path: string, id: string, action: string) {
    const { user } = useUserInfo();

    const url: string = `${runtimeConfig.public.apiBase}/${path}/${action}/${id}/${user.data.id}`;

    if (await PutRequest(url, null)) {
        await navigateTo(`/admin/${path}`);
    }
}

async function updateMultipleResource(path: string, action: string, body: any) {

    const url: string = `${runtimeConfig.public.apiBase}/${path}/${action}`;

    if (await PutRequest(url, body)) {
        await navigateTo(`/admin/${path}`);
    }
}

async function importExcel<T>(path: string, body: T) {

    const url: string = `${runtimeConfig.public.apiBase}/${path}/excel`;

    if (await PostRequest(url, body)) {
        return true
    }
}

async function exportExcel(path: string) {

    const url: string = `${runtimeConfig.public.apiBase}/${path}/excel`;
    const result = await GetRequest<Blob>(url);
    if (result !== undefined) {
        const blob = new Blob([result], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `users.xlsx`;
        a.click();
        window.URL.revokeObjectURL(url);
    }
}

export { get, post, update, disable, restore, erase, disableMultiple, restoreMultiple, eraseMuliple, importExcel, exportExcel }
