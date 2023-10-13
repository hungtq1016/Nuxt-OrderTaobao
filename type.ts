
export type Authentication = {
    accessToken: string,
    refreshToken: string
}

export type LoginRequest = {
    username: string,
    password: string
}

export type RegisterRequest = {
    username: string,
    password: string,
    repassword:string,
    phone:string,
    email:string,
    fname:string,
    lname:string
}

export type ValidateResponse = {
    isError:boolean,
    message:string
}

export type AuthResponse = {
    statusCode: number,
    message: string,
    error:boolean,
    token:Authentication
}