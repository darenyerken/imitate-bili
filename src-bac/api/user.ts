import {axios} from '@/utils/axios'

// 配置返回类型
interface UserHiresponse {
    message:string
    react?:string
    vue?:string
}

// 封装网络请求 ,该函数返回promise，promise的结果是自己配置的interface
export async function userHi():Promise<UserHiresponse>{
    return axios.get('/user/hi')
}