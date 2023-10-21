import { ResetPasswordRequest, Response } from '~/type';
import AuthLogic from './auth.logic';
const ResetLogic = () => {
    const { pwValidate, rpwValidate,
        validatePassword, validateRePassword } = AuthLogic()
    const dataReset = ref<ResetPasswordRequest>({
        idResetPassword: '',
        repassword: '',
        password: '',
        email: ''
    })

    const isValidate = (): boolean => {
        validatePassword(dataReset.value.password)
        validateRePassword(dataReset.value.password, dataReset.value.repassword)
        return !rpwValidate.value.isError && !pwValidate.value.isError
    }
    const ResetPasswordAsync = async (req: ResetPasswordRequest, url: string): Promise<void> => {

        if (isValidate()) {

            try {
                const data = await $fetch<Response<boolean>>(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: req
                });
                console.log(data);

            } catch (error) {
                console.log(error);
            }
        }
    }

    return { dataReset, ResetPasswordAsync }
}


export default ResetLogic