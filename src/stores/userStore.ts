import { defineStore } from "pinia";
import type { UserInfo } from "@/types/user";
import { ref } from "vue";

const userStore = defineStore('user',()=> {
    const userInfo = ref<UserInfo | null>(null)
    const setUser = (user:UserInfo)=> {
        userInfo.value = user
    }
    return {
        userInfo,
        setUser
    }
},{persist:true})

export default userStore