import {TokenResponse } from "~/type";

const indexedDb = useAuthInfo();


const { errorNotification, successNotification } = useNotification()

const file = ref();
const contain = ref<boolean>(false)
const exportExcel = async (url: string) => {
    const token: TokenResponse | undefined = await indexedDb.readAuthAsync();
    try {
        const data = await $fetch<Blob>(url, {
            method: "GET",
            headers: { Accept: 'application/json', Authorization: `Bearer ${token?.accessToken ?? ''}`, },
        });
        if (data) {
            successNotification('Successfully!', 'Export Excel.')
            const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `users.xlsx`; 
            a.click();
            window.URL.revokeObjectURL(url);
                
        }
    } catch (error) {
        console.log(error);
        errorNotification('Cannot Export.')
    }
}

const importExcel = async (url: string) => {
    const token: TokenResponse | undefined = await indexedDb.readAuthAsync();
    const formData = new FormData();    
    formData.append('file', file.value);
    try {
        const data = await $fetch(url, {
            method: "POST",
            headers: { Authorization: `Bearer ${token?.accessToken ?? ''}`},
            body:formData
        });
        if (data) {            
            contain.value = false
            successNotification('Successfully!', 'Import Excel.')
        }
    } catch (error) {
        console.log(error);
        errorNotification('Cannot import.')
    }
}

const onFileChanged = ($event: Event) => {
    const target = $event.target as HTMLInputElement;
    if (target && target.files) {
        file.value = target.files[0];
        contain.value = true
    }
}

export { exportExcel,importExcel,onFileChanged,contain,file}