import { storeToRefs } from "pinia"

export default defineNuxtRouteMiddleware((to, from)=> {
    const userStore = useUserInfo()
    const {isAdmin,isSuperAdmin} = storeToRefs(userStore) 
    
    if (!isAdmin.value&&!isSuperAdmin.value) {
        return navigateTo('/auth/login')
    }
})