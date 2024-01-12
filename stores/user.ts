import { TokenResponse, User, Permission } from "~/type"

const init_user: Permission<User> = {
    data: {
        id: '',
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        password: '',
        phoneNumber: ''
    },
    isAdmin: false,
    isAuthen: false
}

export const useUserInfo = defineStore('userInfo', () => {

    const user = ref(init_user)

    const { PostRequest } = useRequest()

    const isEmpty: ComputedRef<boolean> = computed((): boolean => {
        return isObjectEmpty(user.value.data)
    });

    const logOut = async (): Promise<void> => {
        const runtimeConfig = useRuntimeConfig();
        const indexedDb = useAuthInfo();
        
        const token: TokenResponse | undefined = await indexedDb.readAuthAsync();
        const url : string = `${runtimeConfig.public.apiBase}/authenticate/logout`;
        user.value = init_user
        if (await PostRequest(url,token)) {
            await indexedDb.deleteAuthAsync();
            await navigateTo('/auth/login')
        }
    }

    return { user, isEmpty, logOut, init_user }
})
