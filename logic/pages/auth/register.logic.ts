import { RegisterRequest, TokenResponse, Response } from '~/type';
import AuthLogic from './auth.logic';

const RegisterLogic = () => {
    const {unameValidate,pwValidate,emailValidate,rpwValidate,fnameValidate,lnameValidate,phoneValidate,
        validatePassword,validateUserName,validateEmail,validateRePassword,validatePhone,validateFirstName,validateLastName} = AuthLogic()

    const register = ref<RegisterRequest>({
        username: '',
        password: '',
        repassword: '',
        phone: '',
        email: '',
        fname: '',
        lname: ''
    })
    
    const isValidate = () : boolean=>{
        validatePassword(register.value.password)
        validateUserName(register.value.username)
        validateFirstName(register.value.fname)
        validateLastName(register.value.lname)
        validateEmail(register.value.email)
        validateRePassword(register.value.password,register.value.repassword)
        validatePhone(register.value.phone)
        return !unameValidate.value.isError && !pwValidate.value.isError
        && !emailValidate.value.isError && !rpwValidate.value.isError
        && !fnameValidate.value.isError && !lnameValidate.value.isError
        && !phoneValidate.value.isError
    }

    const RegisterAsync = async (req: RegisterRequest, url: string): Promise<void> => {
        const { updateAuthAsync } = useAuthInfo();   

        if (isValidate()) {
            try {
                const data = await $fetch<Response<TokenResponse>>(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: req
                });           
                if (data == null) {
                    console.log('error');
                } else {
                    const auth: TokenResponse = {
                        refreshToken: data.data.refreshToken,
                        accessToken: data.data.accessToken,
                        tokenType :data.data.tokenType,
                        expiredAt:data.data.expiredAt
                    }
                    const saveResult: boolean | undefined = await updateAuthAsync(auth);
                    
                    if (saveResult) {
                        await navigateTo('/');
                        return;
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
        
    }
        
    return { register ,RegisterAsync}
}
export default RegisterLogic
