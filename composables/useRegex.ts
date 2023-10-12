 export const useRegex = () => {
    const emailRegex:RegExp = /\S+@\S+\.\S+/g
    const passwordRegex:RegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

    return {emailRegex,passwordRegex}
}