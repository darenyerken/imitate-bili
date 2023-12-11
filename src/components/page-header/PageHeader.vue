<template>
    <div class="bili-header">
        <div class="bili-header__bar">
            <!-- 左侧 -->
            <ul class="left-entry">
                <li v-for="link in links" >
                    <a :href="link.url" class="bar-font">{{ link.name }}</a>
                </li>
            </ul>
            <!-- 右侧 -->
            <ul class="right-entry">
                <li style="margin-right: 8px;">
                    <a href="" v-if="store.userInfo">{{ store.userInfo.name }}</a>
                    <router-link to="/login" v-else>登录</router-link>
                </li>
                <li class="right-entry-item" v-for="r in rights" >
                    <a href="" class="bar-font">{{ r }}</a>
                </li>
                <li>
                    <div class="upload-button">
                        <a href="">
                            <UploadOutlined />投稿
                        </a>
                    </div>
                </li>
            </ul>
        </div>
        <div class="bili-header__banner">
            <img class="banner" src="/header_bac.png" alt="hb">
        </div>
        <div class="bili-header__logo">
            <a href="https://www.bilibili.com/">
                <img src="/bili-logo.png" alt="logo" class="logo-img" width="160" height="78">
            </a>
        </div>
    </div>
    <div v-show="barBacShow" class="barBac"></div>
</template>

<script setup lang='ts'>
import { onMounted, ref } from 'vue'
import type { Ref } from 'vue';
import { UploadOutlined } from '@ant-design/icons-vue'
import userStore from '@/stores/userStore'

const store = userStore()


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
let a:NodeList | Array<any> = []
onMounted(()=>{
    a = document.querySelectorAll('li>a')
})
document.onscroll = ()=> {
    if(document.documentElement.scrollTop >= 50) {
        barBacShow.value = true
        
        a.forEach(item => {
            item.setAttribute('style','color: black !important')
        })
    } else {
        barBacShow.value = false
        a.forEach(item => {
            item.setAttribute('style','color: white !important')
        })
    }
}

</script>

<style lang='scss'>
@import '@/styles/mixin';

@include b(header) {
    min-height: 64px;
    height: 160px;
    position: relative;
    width: 100%;
    background-color: #fff;

    @include sub(bar) {
        // color: red;
        position: fixed;
        top: 0;
        z-index: 99;
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

            li {
                margin-right: 10px;
            }
        }

        & .right-entry {
            display: flex;
            align-items: center;

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
            transform: translateX(-10px);
        }
    }

    @include sub(logo) {
        position: absolute;
        bottom: 10px;
        left: 40px;
    }

    a {
        color: #fff
    }

    li {
        list-style: none;
    }
}
.barBac {
    position: fixed;
    top: 0;
    z-index: 1;
    transform: translateX(-50px);
    width: 100%;
    height: 50px;
    background-color: #fff;
}

</style>