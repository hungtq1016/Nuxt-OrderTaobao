import { storeToRefs } from "pinia"

export default defineNuxtRouteMiddleware((to, from)=> {

    
    const userStore = useUserInfo()
    const {isAuthen} = storeToRefs(userStore)
    console.log(isAuthen.value); 
    if (isAuthen.value) {
        return navigateTo(from.fullPath)
    }
})
