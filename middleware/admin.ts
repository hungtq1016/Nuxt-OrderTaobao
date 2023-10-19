
import { permissionAsync } from '~/composables/usePermission';
export default defineNuxtRouteMiddleware(async(to, from)=> {
    
    await permissionAsync()
    const {adminPermission} = useUserInfo()

    if (!adminPermission) {        
        return navigateTo('/auth/login')
    }
    
})