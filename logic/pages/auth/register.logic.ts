import { RegisterRequest, Authentication, AuthResponse,ValidateResponse } from '~/type';
import AuthLogic from './auth.logic';

const RegisterLogic = () => {
    const {unameValidate,pwValidate,emailValidate,rpwValidate,fnameValidate,lnameValidate,phoneValidate,
        validatePassword,validateUserName,validateEmail,validateRePassword,validatePhone} = AuthLogic()

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
        validateUserName(register.value.fname)
        validateUserName(register.value.lname)
        validateEmail(register.value.email)
        validateRePassword(register.value.password,register.value.repassword)
        validatePhone(register.value.phone)
        return !unameValidate.value.isError && !pwValidate.value.isError
        && !emailValidate.value.isError && !rpwValidate.value.isError
        && !unameValidate.value.isError && !lnameValidate.value.isError
        && !phoneValidate.value.isError
    }

    const RegisterAsync = async (req: RegisterRequest, url: string): Promise<void> => {
        const { updateAuthAsync } = useAuthInfo();        
        if (isValidate()) {            
            const { data, error, pending } = await useFetch<AuthResponse>(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: req
            });
    
            if (error.value != null) {
                console.log(error.value);
            } else {
                if (data.value == null) {
                    console.log('error');
                } else {
                    const auth: Authentication = {
                        refreshToken: data.value.token.refreshToken,
                        accessToken: data.value.token.accessToken
                    }
                    const saveResult: boolean | undefined = await updateAuthAsync(auth);
                    if (saveResult) {
                        navigateTo('/');
                        return;
                    }
                }
    
            }
        }
        

    }
        
    return { register ,RegisterAsync}
}
export default RegisterLogic
