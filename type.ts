import { FunctionalComponent } from "vue"

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
export type Role = {
    id: string,
    name: string
}
export type UserInfo = {
    id: string,
    firstName: string,
    lastName: string,
    userName:string,
    email:string,
}
export type Permission = {
    user?: UserInfo 
    isPermission : boolean,
    error : boolean,
    message : string
}

export type Navigation = {
    title: string,
    slug: string,
    description?: string,
    icon: FunctionalComponent,
    sub?:Array<Navigation>,
}