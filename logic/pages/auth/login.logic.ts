import { LoginRequest, TokenResponse, Response } from '~/type';
import type { FormError } from '@nuxt/ui/dist/runtime/types'

const LoginLogic = () => {
    const {passwordRegex} = useRegex()
    const {errorNotification,successNotification} = useNotification()
    const state = ref<LoginRequest>({
        username: '',
        password: '',
    })

    const validate = (state: LoginRequest): FormError[] => {
        const errors = []
        if (!passwordRegex.test(state.password)) errors.push({ path: 'password', message: 'Invalid password'})
        if (!state.username) errors.push({ path: 'username', message: 'Invalid username'})
        return errors
    }

    const LoginAsync = async (req: LoginRequest, url: string): Promise<void> => {
        const { updateAuthAsync } = useAuthInfo(); 

        try {
            const data = await $fetch<Response<TokenResponse>>(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: req
            });           
            if (!data.error) {
                const auth: TokenResponse = {
                    refreshToken: data.data.refreshToken,
                    accessToken: data.data.accessToken,
                    tokenType :data.data.tokenType,
                    expiredAt:data.data.expiredAt
                }
                const saveResult: boolean | undefined = await updateAuthAsync(auth);
                
                if (saveResult) {
                    successNotification(data.message,'Login.')
                    await navigateTo('/');
                    return;
                }
            }
        } catch (error) {
            errorNotification('Cannot login.')
        }
    }  
    return {state,LoginAsync,validate}
}
export default LoginLogic
