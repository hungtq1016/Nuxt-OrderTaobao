import {ValidateResponse} from '~/type';

const AuthLogic = () => {

    const unameValidate = ref<ValidateResponse>({
        isError:false,
        message:''
    })
    const pwValidate = ref<ValidateResponse>({
        isError:false,
        message:''
    })
    const rpwValidate = ref<ValidateResponse>({
        isError:false,
        message:''
    })
    const emailValidate = ref<ValidateResponse>({
        isError:false,
        message:''
    })
    const phoneValidate = ref<ValidateResponse>({
        isError:false,
        message:''
    })
    const fnameValidate = ref<ValidateResponse>({
        isError:false,
        message:''
    })
    const lnameValidate = ref<ValidateResponse>({
        isError:false,
        message:''
    })


    
    const input1 = ref<HTMLInputElement>()
    const input2 = ref<HTMLInputElement>()
    const showPassword = ref<boolean>(false)
    const showRePassword = ref<boolean>(false)

    const validateUserName = (value:string):void=>{     
                
        if (value.length <= 1) {
            unameValidate.value.message = 'Tài khoản chưa hợp lệ';
            unameValidate.value.isError = true
        }else{
            unameValidate.value.message = ''
            unameValidate.value.isError = false
        }  
         
    }

    const validateFirstName = (value:string):void=>{     
                
        if (value.length <= 1) {
            fnameValidate.value.message = 'Họ chưa hợp lệ';
            fnameValidate.value.isError = true
        }else{
            fnameValidate.value.message = ''
            fnameValidate.value.isError = false
        }  
         
    }

    const validateLastName = (value:string):void=>{     
                
        if (value.length <= 1) {
            lnameValidate.value.message = 'Tên chưa hợp lệ';
            lnameValidate.value.isError = true
        }else{
            lnameValidate.value.message = ''
            lnameValidate.value.isError = false
        }  
         
    }

    
    const validateEmail = (value:string):void=>{
        const {emailRegex} = useRegex();
        if(emailRegex.test(value)){
            emailValidate.value.message = ''
            emailValidate.value.isError = false
        }else{
            emailValidate.value.message = 'Email chưa hợp lệ';
            emailValidate.value.isError = true
        }
    }


    const validatePassword = (value:string):void=>{
        const {passwordRegex} = useRegex();
        if(passwordRegex.test(value)){
            pwValidate.value.message = ''
            pwValidate.value.isError = false
        }else{
            pwValidate.value.message = 'Mật khẩu chưa hợp lệ';
            pwValidate.value.isError = true
        }
    }

    const validateRePassword = (value1:string,value2:string):void=>{
        const temp1 = value1.toLocaleLowerCase()
        const temp2 = value2.toLocaleLowerCase()
        if(temp1.localeCompare(temp2) == 0){
            rpwValidate.value.message = ''
            rpwValidate.value.isError = false
        }else{
            rpwValidate.value.message = 'Mật khẩu phải giống nhau';
            rpwValidate.value.isError = true
        }
    }

    const validatePhone = (value:string):void=>{
        const {phoneRegex} = useRegex();
        if(phoneRegex.test(value)){
            phoneValidate.value.message = ''
            phoneValidate.value.isError = false
        }else{
            phoneValidate.value.message = 'Số điện thoại chưa hợp lệ';
            phoneValidate.value.isError = true
        }
    }

    

    const togglePassword = ():void =>{
        if (showPassword.value != true) {
            input1.value?.setAttribute('type','text')
            showPassword.value = !showPassword.value
        }else{
            input1.value?.setAttribute('type','password')
            showPassword.value = !showPassword.value
        }
    }

    const toggleRePassword = ():void =>{
        if (showRePassword.value != true) {
            input2.value?.setAttribute('type','text')
            showRePassword.value = !showRePassword.value
        }else{
            input2.value?.setAttribute('type','password')
            showRePassword.value = !showRePassword.value
        }
    }
 
    return {unameValidate,pwValidate,emailValidate,rpwValidate,input1,input2,lnameValidate,fnameValidate,phoneValidate,
        validateUserName,validatePassword,togglePassword,toggleRePassword,validateEmail,validateRePassword,validatePhone,validateFirstName,validateLastName}
}
export default AuthLogic
