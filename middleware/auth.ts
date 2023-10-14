export default defineNuxtRouteMiddleware((to, from) => {
    const {isAdmin} = useUserInfo()
    if (!isAdmin) {
        return navigateTo('/')
    }

  })