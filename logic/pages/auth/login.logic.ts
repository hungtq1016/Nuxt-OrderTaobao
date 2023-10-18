import { LoginRequest, Authentication, AuthResponse } from '~/type';
import AuthLogic from './auth.logic';

const LoginLogic = () => {
    const login = ref<LoginRequest>({
        username: '',
        password: ''
    })
    const {unameValidate,pwValidate,validatePassword,validateUserName} = AuthLogic()
    
    const isValidate = () : boolean=>{
        validatePassword(login.value.password)
        validateUserName(login.value.username)
        return !unameValidate.value.isError && !pwValidate.value.isError
    }

    const LoginAsync = async (req: LoginRequest, url: string): Promise<void> => {
        const { updateAuthAsync } = useAuthInfo();    
        const {isAuthen} = useUserInfo()   
        
        if (isAuthen) {
            await navigateTo('/');
            return
        }
         
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
             
                        await navigateTo('/');
                        return;
                    }
                }
    
            }
        }
    }  
    return {login,LoginAsync}
}
export default LoginLogic
