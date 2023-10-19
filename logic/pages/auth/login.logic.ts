import { LoginRequest, TokenResponse, Response } from '~/type';
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
    return {login,LoginAsync}
}
export default LoginLogic
