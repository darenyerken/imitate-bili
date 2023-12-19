import { defineStore } from "pinia";
import type { UserInfo } from "@/types/user";
import { ref } from "vue";

const userStore = defineStore('user',()=> {
    // 用户信息
    const userInfo = ref<UserInfo | null>(null)
    // 设置用户信息
    const setUser = (user:UserInfo | null)=> {
        userInfo.value = user
    }
    return {
        userInfo,
        setUser
    }
},{persist:true})

export default userStore