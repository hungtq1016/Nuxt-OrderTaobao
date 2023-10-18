import { UserInfo } from "~/type"

const init_user : UserInfo = {
    id: '',
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
}

const user_info = '/authenticate/user-info'

export const useUserInfo = defineStore('userInfo',() => {

    const user = ref(init_user)
    const isAuthen = ref<boolean>(false)
    const isPermission = ref<boolean>(false)
    
    const isEmpty: ComputedRef<boolean> = computed((): boolean => {
        return isObjectEmpty(user.value)
    });

    return {user,isEmpty,isAuthen,isPermission}
})
