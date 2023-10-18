
import {userPermisson} from '~/composables/usePermission';
export default defineNuxtRouteMiddleware(async(to, from)=> {
    const permission:boolean = await userPermisson()
    if (permission) {        
        return navigateTo('/')
    }
    
})