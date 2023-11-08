export const useNotification = () => {
    const toast = useToast()

    const successNotification = (message:string,title:string) => {
        toast.add({
            id: message,
            title: title,
            description: message,
            icon: 'i-heroicons-check-circle',
            color:'green',
            timeout: 1500
        })
    }

    const errorNotification = (title:string,message:string="Unfortunately, we are unable to fulfill your request at this time.") => {
        toast.add({
            id: title,
            title: title,
            description: message,
            icon: 'i-heroicons-check-circle',
            color:'red',
            timeout: 2000
        })
    }

    const callBackNotification = (title:string,fn:()=>Promise<void>) => {
        toast.add({
            id: title,
            title: title,
            description: 'Are you sure you want to delete this item?',
            icon: 'i-heroicons-question-mark-circle',
            color:'orange',
            timeout: 0,
            actions:[
                { variant: 'solid', color: 'primary', label: 'Confirm' ,click: () => {
                    fn()
                }}, 
                { variant: 'outline', color: 'gray', label: 'Cancel' }
            ]
        })
    }

    return {
        successNotification,errorNotification,callBackNotification
    }
}