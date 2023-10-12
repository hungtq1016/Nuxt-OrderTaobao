import { LoginRequest, Authentication, AuthResponse } from '~/type';

const LoginLogic = () => {
    const login = ref<LoginRequest>({
        username: '',
        password: ''
    })

    const usernameMsg = ref<string|null>(null)
    const passwordMsg = ref<string|null>(null)
    const usernameError = ref<boolean>(false)
    const passwordError = ref<boolean>(false)
    const input = ref<HTMLInputElement>()
    const showPassword = ref<boolean>(false)

    const validateUserName = (value:string):void=>{     
                
        if (value.length <= 1) {
            usernameMsg.value = 'Tài khoản chưa hợp lệ';
            usernameError.value = true
        }else{
            usernameMsg.value=null
            usernameError.value = false
        }  
         
    }

    const validatePassword = (value:string):void=>{
        const {passwordRegex} = useRegex();
        if(passwordRegex.test(value)){
            passwordMsg.value=null
            passwordError.value = false
        }else{
            passwordMsg.value = 'Mật khẩu chưa hợp lệ';
            passwordError.value = true
        }
    }

    const toggleShowPassword = ():void =>{
        if (showPassword.value != true) {
            input.value?.setAttribute('type','text')
            showPassword.value = !showPassword.value
        }else{
            input.value?.setAttribute('type','password')
            showPassword.value = !showPassword.value
        }
    }

    const isValidate = () : boolean=>{
        validatePassword(login.value.password)
        validateUserName(login.value.username)
        return passwordError.value == false && !usernameError.value == false
    }

    const LoginAsync = async (req: LoginRequest, url: string): Promise<void> => {
        const { updateAuthAsync } = useAuthInfo();        
        if (!isValidate()) {
            console.log('toggle');
            
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
    

    
    return { login ,passwordError,LoginAsync,usernameMsg,passwordMsg,validateUserName,validatePassword,input,toggleShowPassword,usernameError}
}
export default LoginLogic
