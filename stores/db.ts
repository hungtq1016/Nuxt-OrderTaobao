const collection = "userDB";
export const useDB = defineStore('store',() => {
    const user = ref()

    const CreateUser = (value:any)=>{
        localStorage.setItem("user",value)
    }

    return {user,CreateUser}
})