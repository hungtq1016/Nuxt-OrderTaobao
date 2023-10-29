import { FunctionalComponent } from "vue"

export type TokenResponse = {
    accessToken: string,
    refreshToken: string
    tokenType? :string,
    expiredAt?:string
}

export type LoginRequest = {
    username: string,
    password: string
}

export type RegisterRequest = {
    id?:string
    userName: string,
    password: string,
    repassword:string,
    phone:string,
    email:string,
    firstName:string,
    lastName:string
}

export type ResetPasswordRequest = {
    idResetPassword:string
    password: string,
    repassword:string,
    email:string
}

export type ValidateResponse = {
    isError:boolean,
    message:string
}

export type Role = {
    id: string,
    name: string
}

export type SendEmailRequest = {
    email: string
}
export type Image = BaseEntity & {
    label: string,
    url:string,
    size: number,
    type: string
}
export type User = {
    id?: string,
    firstName: string,
    lastName: string,
    userName:string,
    password:string,
    email:string,
    phone:string,
}

export type UserDetail = User & {
    phoneNumberConfirmed : boolean,
    twoFactorEnabled : boolean,
    enable:boolean,
    emailConfirmed:boolean
}

export type Order = {
    [key:string]:string|number
}

export type UserShow = {
    roles:Array<string>,
    user:UserDetail,
    orders:Array<Order>,
    notifications:Array<Order>,
}

export type Permission<T> = Response<T> & {
    isAuthen : boolean,
    adminPermission : boolean,
}

export type Column = {
    [key: string]: any,
    key: string,
    sortable?: boolean,
    direction?: "asc" | "desc", 
    class?: string
}

export type Pagination<T> = {
    pageNumber:number,
    pageSize:number,
    firstPage:string,
    lastPage :string,
    totalPages :number,
    totalRecords :number,
    nextPage :string,
    previousPage :string,
    data:T
}

export type BaseEntity = {
    id : string,
    createdAt : string,
    createdBy : string,
    updatedAt : string,
    updatedBy : string,
    enable : boolean
}

export type Navigation = {
    title: string,
    slug: string,
    description?: string,
    icon: FunctionalComponent,
    sub?:Array<Navigation>,
    enable?:boolean
}

export type Response<T> = {
    data: T,
    statusCode: number,
    message: string,
    error:boolean,
}