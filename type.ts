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

export type Role = {
    id: string,
    name: string
}
export type User = {
    id: string,
    firstName: string,
    lastName: string,
    userName:string,
    email:string,
    phone:string,
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

export type Pagination<T> = Response<T> & {
    pageNumber:number,
    pageSize:number,
    firstPage:string,
    lastPage :string,
    totalPages :number,
    totalRecords :number,
    nextPage :string,
    previousPage :string,
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