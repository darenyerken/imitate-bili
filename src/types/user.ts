export interface LoginData {
    email:string
    passwd:string
}

export interface UserInfo {
    name:string
}

export interface LoginRes {
    token:string
    userInfo:UserInfo
}