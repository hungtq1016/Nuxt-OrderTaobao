import { SendEmailRequest, Response } from '~/type';
import type { FormError } from '@nuxt/ui/dist/runtime/types'

const EmailLogic = () => {
    const {emailRegex} = useRegex();
    const {errorNotification,successNotification} = useNotification()

    const state = ref<SendEmailRequest>({
        email: "",
    })
    
    const validate = (state: SendEmailRequest): FormError[] => {
        const errors = []
        if (!emailRegex.test(state.email)) errors.push({ path: 'email', message: 'Invalid email address'})
        return errors
    }
    
    const SendEmailAsync = async (req: SendEmailRequest, url: string): Promise<void> => {
        try {
            const data = await $fetch<Response<boolean>>(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                params:{
                    request: req.email
                }
            });

            if (!data.error) {
                successNotification(data.message,'Updated password.')
                navigateTo('/auth/login')
            }

        } catch (error) {
            errorNotification('Cannot send email.')
        }
    }

    return { state, validate ,SendEmailAsync }
}

export default EmailLogic