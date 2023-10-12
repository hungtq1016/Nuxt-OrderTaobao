
export type Authentication = {
    accessToken: string,
    refreshToken: string
}

export type LoginRequest = {
    username: string,
    password: string
}

export type AuthResponse = {
    statusCode: number,
    message: string,
    error:boolean,
    token:Authentication
}