import { Image,Response,TokenResponse,Pagination } from '~/type';

const image_list = ref<Array<Blob>>([])
const preview_list = ref<Array<string>>([])
const indexedDb = useAuthInfo();
const runtimeConfig = useRuntimeConfig();
const token: TokenResponse | undefined = await indexedDb.readAuthAsync();
const isOpen = ref(false)
const { PostRequest,DeleteRequest } = useRequest()
const { callBackNotification } = useNotification()

const init_state = {
    id:'',
    createdAt:'',
    createdBy:'',
    enable:false,
    label:'',
    size:1,
    type:'',
    updatedAt:'',
    updatedBy:'',
    url:''
}

const init_table : Pagination<Array<Image>> = {
    pageNumber: 1,
    pageSize: 17,
    firstPage: "",
    lastPage: "",
    totalPages: 1,
    totalRecords: 1,
    nextPage: "",
    previousPage: "",
    data: [],
}

const state = ref<Pagination<Array<Image>>>(init_table)

const selected = ref<Image>(init_state)
const selectedNumber = ref<number>(0)
const readImageAsync = async (url: string) => {
    try {
        await useAsyncData(
            'images',
            async () => {
                const data = await $fetch<Response<Pagination<Array<Image>>>>(url, {
                    headers: { Accept: 'application/json', Authorization: `Bearer ${token?.accessToken ?? ''}`, },
                    params: {
                        PageNumber: state.value.pageNumber,
                        PageSize: state.value.pageSize
                    }
                })
                if (data) {
                    state.value = data.data
                }
            }
            , { watch: [() => state.value.pageNumber, () => state.value.pageSize, () => state.value.totalRecords] },
        )
    } catch (error) {
        console.log(error);
    }
}

const createImageAsync = async (url: string) => {
    const formData = new FormData();    
    for (let file of image_list.value){
        formData.append('files', file);
    }
    if (await PostRequest(url,formData)) {
        state.value.totalRecords++;
        image_list.value =[]
        preview_list.value = []
    }
}

const deleteImageAsync = async (url: string) => {
    if (await DeleteRequest(url,null)) {
        state.value.totalRecords--;
    }
}

const previewMultiImage = (event: any) => {
    var input = event.target;
    var count = input.files.length;
    var index = 0;
    if (input.files) {
        while (count--) {
            var reader = new FileReader();
            reader.onload = (e: any) => {
                preview_list.value.push(e.target.result);
            }
            image_list.value.push(input.files[index]);
            reader.readAsDataURL(input.files[index]);
            index++;
        }
    }    
}

const deleteImage= async (id: string,name:string) => {
    callBackNotification("Want to delete image?", () => deleteImageAsync(`${runtimeConfig.public.apiBase}/images/${id}/${name}`))
}

const q = ref('')

const filteredRows = computed(() => {
    if (!q.value) {
        return state.value.data
    }
    return state.value.data.filter((row: any) => {
        return Object.values(row).some((value) => {
            return String(value).toLowerCase().includes(q.value.toLowerCase())
        })
    })
})

const remove = (id: number) => {
    image_list.value.splice(id, 1)
    preview_list.value.splice(id, 1)
}

const openImage = (image:Image,value:number) => {
    isOpen.value = true
    selected.value = image
    selectedNumber.value= value
}

const nextImage = () => {
    selectedNumber.value = Math.min(selectedNumber.value+1,init_table.pageSize-1)
    selected.value = state.value.data[selectedNumber.value]
}

const prevImage = () => {
    selectedNumber.value = Math.max(selectedNumber.value-1,0)
    selected.value = state.value.data[selectedNumber.value]
}
export { image_list, preview_list, state, filteredRows, q, previewMultiImage, remove,readImageAsync,isOpen,selected 
    ,openImage,createImageAsync,nextImage,prevImage,deleteImage}