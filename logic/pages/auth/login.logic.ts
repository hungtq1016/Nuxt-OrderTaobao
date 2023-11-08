import { LoginRequest, TokenResponse, Response } from '~/type';
import type { FormError } from '@nuxt/ui/dist/runtime/types'

const LoginLogic = () => {
    const { passwordRegex } = useRegex()
    const { errorNotification, successNotification } = useNotification()
    const state = ref<LoginRequest>({
        username: '',
        password: '',
    })

    const validate = (state: LoginRequest): FormError[] => {
        const errors = []
        if (!passwordRegex.test(state.password)) errors.push({ path: 'password', message: 'Invalid password' })
        if (!state.username) errors.push({ path: 'username', message: 'Invalid username' })
        return errors
    }

    const LoginAsync = async (req: LoginRequest, url: string): Promise<void> => {
        const { updateAuthAsync } = useAuthInfo();
        try {
            const { data, error } = await useFetch<Response<TokenResponse>>(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: req
            });
            if (data.value) {
                const auth: TokenResponse = {
                    refreshToken: data.value.data.refreshToken,
                    accessToken: data.value.data.accessToken,
                    tokenType: data.value.data.tokenType,
                    expiredAt: data.value.data.expiredAt
                }
                const saveResult: boolean | undefined = await updateAuthAsync(auth);

                if (saveResult) {
                    successNotification(data.value.message, 'Login.')
                    const {isViewAdminPage} = usePermission()
                    await isViewAdminPage()
                    await navigateTo('/');
                    return;
                }
            }
            if (error.value) {
                errorNotification('Cannot login.', error.value.data.message)
            }
        } catch (error) {
            errorNotification('Cannot login.')
        }
    }
    return { state, LoginAsync, validate }
}
export default LoginLogic
