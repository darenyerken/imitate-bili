<template>
    <div class="bili-header">
        <div class="bili-header__bar">
            <!-- 左侧 -->
            <ul class="left-entry">
                <li v-for="link in links" :key="link.name">
                    <a :href="link.url" class="bar-font">{{ link.name }}</a>
                </li>
            </ul>
            <!-- 中间 -->
            <a-input-search style="width: 25%; position: fixed; top: 15px; left: 35%;" placeholder="luke"></a-input-search>
            <!-- 右侧 -->
            <ul class="right-entry">
                <li style="margin-right: 8px;">
                    <a href="" v-if="store.userInfo">{{ store.userInfo.name }}</a>
                    <router-link to="/login" v-else>登录</router-link>
                </li>
                <li style="margin-right: 8px;" @click="quit">
                    <a v-if="store.userInfo">退出</a>
                </li>
                <li class="right-entry-item" v-for="r in rights" :key="r">
                    <a href="" class="bar-font">{{ r }}</a>
                </li>
                <li>
                    <div class="upload-button">
                        <a href="" style="color: #fff !important;">
                            <UploadOutlined />投稿
                        </a>
                    </div>
                </li>
            </ul>
        </div>
        <div class="bili-header__banner">
            <img class="banner" src="/headerBack.png" alt="hb">
        </div>
        <div class="bili-header__logo">
            <a href="https://www.bilibili.com/">
                <img src="/bili-logo.png" alt="logo" class="logo-img" style="width: 80%;height: 80%;">
            </a>
        </div>
    </div>
    <div v-show="barBacShow" class="barBac">
        <div class="logo"></div>
    </div>
</template>

<script setup lang='ts'>
import { onMounted, ref } from 'vue'
import { UploadOutlined } from '@ant-design/icons-vue'
import userStore from '@/stores/userStore'
import { useRouter } from 'vue-router'

const store = userStore()
const router = useRouter()

// 视频列表
const links = ref([
    { name: '首页', url: '' },
    { name: '番剧', url: '' },
    { name: '直播', url: '' },
    { name: '游戏中心', url: '' },
])
const rights = ref([
    '创作中心',
    '稍后再看'
])

// 导航列表背景
// const bar = ref<any>()
const barBacShow = ref<boolean>(false)
let a: NodeList | Array<any> = []
onMounted(() => {
    // 获取所有a（为了改变a的字体颜色
    a = document.querySelectorAll('li>a')
    // 获取第一个a 也就是 首页 （跳转首页
    document.querySelector('li>a')?.addEventListener('click', function () {
        router.push('/')
    })
})
document.onscroll = () => {
    if (document.documentElement.scrollTop >= 50) {
        barBacShow.value = true

        a.forEach((item:HTMLElement) => {
            item.setAttribute('style', 'color: black !important')
        })
    } else {
        barBacShow.value = false
        a.forEach((item:HTMLElement) => {
            item.setAttribute('style', 'color: white !important')
        })
    }
}

// 退出登录
const quit = ()=> { 
    store.setUser(null)
}
</script>

<style lang='scss'>
@import '@/styles/mixin';

@include b(header) {
    min-height: 64px;
    height: fit-content;
    position: relative;
    width: 100%;
    background-color: #fff;

    @include sub(bar) {
        // color: red;
        position: fixed;
        top: 0;
        z-index: 101;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 24px;
        height: 64px;
        width: 90%;
        transform: translateX(30px);

        & .left-entry {
            display: flex;
            align-items: center;
            flex-shrink: 0;
            list-style: none;
            margin-bottom: 0;

            li {
                margin-right: 10px;
            }
        }

        & .right-entry {
            display: flex;
            align-items: center;
            margin-bottom: 0;

            .right-entry-item {
                display: block;
                margin-right: 5px;
                text-align: center;
                cursor: pointer;
            }
        }

        & .upload-button {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-left: 16px;
            width: 90px;
            height: 34px;
            border-radius: 8px;
            background: #fb7299;
            color: #fff;
            text-align: center;
            font-size: 14px;
            line-height: 20px;
            cursor: pointer;
            transition: background-color .3s;
        }
    }

    @include sub(banner) {
        // color: blue
        position: relative;
        z-index: 0;
        display: flex;
        justify-content: center;
        max-height: 160px;

        .banner {
            width: 100vw;
            // min-width: 1100px;
            transform: translateX(-10px);
        }
    }

    @include sub(logo) {
        position: absolute;
        bottom: 10px;
        left: 40px;
        width: 15vw;
    }

    a {
        color: #fff
    }

    li {
        list-style: none;
    }
}

// 下滑背景
.barBac {
    position: fixed;
    top: 0;
    z-index: 100;
    transform: translateX(-50px);
    min-width: 1100px;
    width: 100%;
    height: 64px;
    background-color: #fff;

    .logo {
        background-image: url('https://github.com/darenyerken/imitate-bili/blob/main/dist/bili-logo2.jpg?raw=true');
        background-size: 125px;
        background-position: center;

        position: absolute;
        top: 10px;
        left: 10px;
        width: 80px;
        height: 40px;
    }
}

// 搜索框
.ant-input-group>.ant-input:first-child {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    background-color: #f0f0f0;
    color: #333;
    height: 32px;
}

.ant-input-group>.ant-input:first-child:focus {
    box-shadow: none;
    background-color: #ddd;
}

.ant-input-group-addon {
    background-color: #fff0;
}

.ant-input-search>.ant-input-group>.ant-input-group-addon:last-child .ant-input-search-button:not(.ant-btn-primary) {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    border-left: none;
    background-color: #eee;
}

.ant-input-search>.ant-input-group>.ant-input-group-addon:last-child .ant-input-search-button:not(.ant-btn-primary):hover {
    background-color: #ddd;
    border: none;
}
</style>