import { message } from "ant-design-vue";
import Axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";

// 配置axios
 export const axios = Axios.create({
    baseURL:'/api'
 })

//  设置拦截器
 axios.interceptors.request.use((config:InternalAxiosRequestConfig)=> {
    // 所有请求发出去之前在这里配置
    config.headers.apikey = import.meta.env.VITE_API_KEY;
    return config
 })

 axios.interceptors.response.use((response)=> {
    const {data} = response
    // data.code是模拟后端返回当前登录状态
    if(data.code === 0) {
        return data.data
    } else {
        message.warning(data.message)
        return Promise.reject(data)
    }
 })