import { ResetPasswordRequest, Response } from '~/type';
import type { FormError } from '@nuxt/ui/dist/runtime/types'

const ResetLogic = () => {

    const {passwordRegex} = useRegex()
    const {query} = useRoute();
    const {errorNotification,successNotification} = useNotification()

    const state = ref<ResetPasswordRequest>({
        idResetPassword: String(query.reset),
        repassword: '',
        password: '',
        email: String(query.email)
    })

    const validate = (state: ResetPasswordRequest): FormError[] => {
        const errors = []
        if (!passwordRegex.test(state.password)) errors.push({ path: 'password', message: 'Invalid password'})
        if (state.repassword.localeCompare(state.password) !== 0 && !passwordRegex.test(state.repassword)) errors.push({ path: 'repassword', message: 'Password not match'})
        return errors
    }

    const ResetPasswordAsync = async (req: ResetPasswordRequest, url: string): Promise<void> => {
        try {
            const data = await $fetch<Response<boolean>>(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: req
            });

            if (!data.error) {
                successNotification(data.message,'Updated password.')
                navigateTo('/auth/login')
            }
            
        } catch (error) {
            errorNotification('Cannot updated')
        }
    }

    return { state, validate, ResetPasswordAsync }
}

export default ResetLogic