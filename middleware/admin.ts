
import {adminPermission} from '~/composables/usePermission';
export default defineNuxtRouteMiddleware(async(to, from)=> {
    const permission:boolean = await adminPermission()
    
    if (!permission) {        
        return navigateTo('/auth/login')
    }
    
})