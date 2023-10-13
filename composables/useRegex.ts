 export const useRegex = () => {
    const emailRegex:RegExp = /\S+@\S+\.\S+/g
    const passwordRegex:RegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    const phoneRegex:RegExp = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;

    return {emailRegex,passwordRegex,phoneRegex}
}