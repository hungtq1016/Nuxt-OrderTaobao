import { importExcel,exportExcel } from '~/logic/pages/RESTapi';

const file = ref();
const contain = ref<boolean>(false)

const expExcel = async (path: string) => {
    await exportExcel(path)
}

const impExcel = async (path: string) => {

    const formData = new FormData();    
    formData.append('file', file.value);

    const data = await importExcel<any>(path,formData)
    if (data) {            
        contain.value = false
    }
}

const onFileChanged = ($event: Event) => {
    const target = $event.target as HTMLInputElement;
    if (target && target.files) {
        file.value = target.files[0];
        contain.value = true
    }
}

export { expExcel,impExcel,onFileChanged,contain,file }