
import {permissionAsync} from '~/composables/usePermission';
export default defineNuxtRouteMiddleware(async(to, from)=> {
    await permissionAsync()
    const {isAuthen} = useUserInfo()
    if (isAuthen) {        
        return navigateTo('/')
    }
    
})