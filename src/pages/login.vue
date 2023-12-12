<template>
    <div class="login-container">
        <div class="login-form">
            <a-form :model="formState" @finish="onFinish" name="normal_login" class="login-form">
                <a-form-item name="email" :rules="[{ required: true, message: 'Please enter your email' }]">
                    <a-input placeholder="email" v-model:value="formState.email">
                        <template #prefix>
                            <UserOutlined></UserOutlined>
                        </template>
                    </a-input>
                </a-form-item>
                <a-form-item name="passwd" :rules="[{ required: true, message: 'Please enter your password' }]">
                    <a-input-password placeholder="passwd" v-model:value="formState.passwd">
                        <template #prefix>
                            <LockOutlined></LockOutlined>
                        </template>
                    </a-input-password>
                </a-form-item>
                <a-form-item name="captcha" :rules="[{ required: true, message: 'Please enter the code' }]">
                    <a-input placeholder="code" v-model:value="formState.captcha" style="width: 150px;">
                    </a-input>
                    <p @click="updateCaptcha">{{ captcha }}</p>
                </a-form-item>
                <a-form-item>
                    <a-button v-show="loginShow" :disabled="disabled" block type="primary" html-type="submit">
                        登录
                    </a-button>
                </a-form-item>
            </a-form>
        </div>
    </div>
    111
</template>

<script setup lang='ts'>
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { ref, reactive, computed} from 'vue'
import { useRouter } from 'vue-router'
import {userLogin} from '@/apis/user'
import type { LoginData } from '@/types/user'
import SparkMd5 from 'spark-md5'
import userStore from '@/stores/userStore'

const router = useRouter()
const store = userStore()

interface FormData extends LoginData {
    captcha: string
}
// 登录信息
const formState = reactive<FormData>({
    email: 'xxx@qq.com',
    passwd: 'xxx',
    captcha: ''
})
// 登录按钮
const loginShow = ref<boolean>(true) 
const disabled = computed(() => {
    return !(formState.passwd && formState.email && formState.captcha)
})
// 点击登录
const onFinish = async (val: FormData) => {
    if(captcha.value === val.captcha) {
        loginShow.value = false  //防抖
        const loginData:LoginData = {
            email:val.email,
            passwd:SparkMd5.hash(val.passwd),
        }
        let res = await userLogin(loginData)
        store.setUser(res.userInfo)
        localStorage.setItem("token",res.token)
        router.push('/')
    } else {
        formState.captcha = ''
        window.alert('验证码错误')
        updateCaptcha()
    }
}
// 验证码
const captcha = ref(`${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}`)
function updateCaptcha() {
    captcha.value = `${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}`
}
</script>

<style scoped lang='scss'>
.login-container {
    position: relative;
    height: 100vh;
    min-width: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #eee;

    .login-form {
        padding: 20px;
        background-color: rgba($color: #fff, $alpha: 0.8);
        border-radius: 20px;
        z-index: 10;
    }
}
</style>