import { RegisterRequest, TokenResponse, Response } from '~/type';
import type { FormError } from '@nuxt/ui/dist/runtime/types'

const RegisterLogic = () => {
    const {passwordRegex,emailRegex,phoneRegex} = useRegex()
    const {errorNotification,successNotification} = useNotification()
    const state = ref<RegisterRequest>({
        userName: '',
        password: '',
        repassword: '',
        phone: '',
        email: '',
        firstName: '',
        lastName: ''
    })

    const validate = (state: RegisterRequest): FormError[] => {
        const errors = []
        if (!passwordRegex.test(state.password)) errors.push({ path: 'password', message: 'Invalid password'})
        if (!passwordRegex.test(state.repassword) && state.password.localeCompare(state.repassword) !== 0) errors.push({ path: 'repassword', message: 'Password not match'})
        if (!emailRegex.test(state.email)) errors.push({ path: 'email', message: 'Invalid email'})
        if (!phoneRegex.test(state.phone)) errors.push({ path: 'phone', message: 'Invalid phone'})
        if (!state.userName) errors.push({ path: 'username', message: 'Invalid user name'})
        if (!state.firstName) errors.push({ path: 'firstname', message: 'Invalid first name'})
        if (!state.lastName) errors.push({ path: 'lastname', message: 'Invalid last name'})
        return errors
    }

    const RegisterAsync = async (req: RegisterRequest, url: string): Promise<void> => {
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
                    successNotification(data.message,'Register.')
                    await navigateTo('/');
                    return;
                }
            }
        } catch (error) {
            errorNotification('Cannot register.')
        }
        
    }
        
    return { state, validate ,RegisterAsync}
}
export default RegisterLogic
