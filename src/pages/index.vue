<template>
    <Layout>
        <channel-bar />
        <a-row :gutter="20">
            <a-col :span="10">
                <a-carousel autoplay>
                    <div v-for="pic in 4" :key="pic">fdsfsdf
                        <a href="">
                            <img class="caroPic" :src="`https://raw.githubusercontent.com/darenyerken/imitate-bili/main/dist/${pic}.avif`" alt="pic">
                        </a>
                    </div>
                </a-carousel>
            </a-col>
            <a-col :span="14">
                <a-row :gutter="20">
                    <a-col :span="8" v-for="video in mainVideos" :key="video.key">
                        <RouterLink :to="`/video/${video.key}`">
                            <a-card hoverable class="main-videos">
                                <template #actions>
                                    <PlayCircleOutlined @click="watchLater" />
                                </template>
                                <template #cover>
                                    <img :src="'loading.gif'" v-lazy-load="video.image">
                                </template>
                                <a-card-meta :title="video.name" :description="video.text">
                                </a-card-meta>
                            </a-card>
                        </RouterLink>
                    </a-col>
                </a-row>
            </a-col>
        </a-row>

        <a-row :gutter="20">
            <a-col :span="6" v-for="video in videos" :key="video.key">
                <RouterLink :to="`/video/${video.key}`">
                    <a-card hoverable>
                        <template #actions>
                            <PlayCircleOutlined @click="watchLater" />
                        </template>
                        <template #cover>
                            <img :src="'loading.gif'" v-lazy-load="video.image">
                        </template>
                        <a-card-meta :title="video.name" :description="video.text">
                        </a-card-meta>
                    </a-card>
                </RouterLink>
            </a-col>
        </a-row>
        <div class="loading" v-show="loading">
            <LoadingOutlined :style="{ fontSize: '40px' }" />
        </div>
        <div class="watchLaterBall">
            <Transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter" name="wlBall">
                <div class="animate" v-show="wlBall.show"></div>
            </Transition>
        </div>
        <div class="backTop" v-back-top="800">
            <arrow-up-outlined />
        </div>
    </Layout>
</template>

<script setup lang='ts'>
import Layout from '@/layouts/default.vue'
import { onMounted, onUnmounted, reactive, ref } from 'vue';
import ChannelBar from '@/components/channelBar/ChannelBar.vue'  //频道栏目

// -----------  视频列表加载
import { getIndexList, getMainList } from '@/apis/mock';
import type { Video } from '@/apis/mock'
import { ArrowUpOutlined,
        LoadingOutlined,
        PlayCircleOutlined,
} from '@ant-design/icons-vue'
// import { renderToString } from '@vue/test-utils';

let videos = ref<Video[]>()  //视频数据
let curPage: number = 0 //当前页数
let totalPage: number = 4  //总的页数-1  这个数据应该是后台发的，暂时弄这里
let loading = ref<boolean>(false)  //一是简单的防抖，二是loading组件的开关
const mainVideos = ref<Video[]>()
// 初次加载
onMounted(async () => {
    loading.value = true  // loading状态开启
    videos.value = await getIndexList(curPage)  //请求数据
    curPage++  //增加页数
    loading.value = false //loading状态关闭
    window.addEventListener('scroll', loadVideos)

    // 获取主要视频
    mainVideos.value = await getMainList()
})
// 后续懒加载
const loadVideos = async () => {
    // 如果后台数据加载完成就unmount
    if (curPage >= totalPage) window.removeEventListener('scroll', loadVideos)

    // 页面被用户拉到底部并且不在loading状态就请求新数据
    let scrollTop = document.documentElement.scrollTop
    let clientHeight = document.documentElement.clientHeight
    let scrollHeight = document.documentElement.scrollHeight
    if (scrollHeight - 10 <= clientHeight + scrollTop && !loading.value) {
        loading.value = true
        curPage++
        const newList = await getIndexList(curPage)
        videos.value = videos.value?.concat(newList)
        loading.value = false
    }
}
onUnmounted(() => {
    window.removeEventListener('scroll', loadVideos)
})
// 图片懒加载
import { useLazyLoad } from '@/directives/useLazyLoad'
const vLazyLoad = useLazyLoad()


// ------------ 稍后再看动画
let wlBall = reactive<{
    show: boolean,
    el: HTMLElement | null
}>({
    show: false,
    el: null
})
function watchLater(e: Event) {
    wlBall.show = true
    wlBall.el = e.target as HTMLElement
    e.preventDefault()
}
const beforeEnter = (el: Element) => {
    let wlbtn = wlBall.el!  //!!!

    let rect = wlbtn.getBoundingClientRect()
    console.log(rect);

    let x = window.innerWidth - rect.left - rect.width / 2 - 290
    let y = rect.top - rect.height / 2 - 20


        ; (el as HTMLElement).style.transform = `translate(-${Math.abs(x)}px,${y}px)`
}
const enter = (el: Element, done: () => void) => {
    document.body.offsetHeight  //强制页面重绘
        ; (el as HTMLElement).style.transform = `translate(0,0)`
    el.addEventListener('transitionend', done)
}
const afterEnter = () => {
    wlBall.show = false
}

// 回到顶部
import { useBackTop } from '@/directives/useBacktop'
const vBackTop = useBackTop()

</script>

<style scoped lang='scss'>


// 轮播图
:deep(.ant-carousel .slick-slider) {
    border-radius: 15px;
}

.ant-carousel {
    width: 100%;
    margin: 10px 0;
    border-radius: 15px;
}

.caroPic {
    width: 100%;
    border-radius: 15px;
}

// 视频列表

.ant-col {
    margin-top: 10px;
}

.ant-card-cover img,
.ant-card {
    border-radius: 10px;
}

:deep(.ant-card-meta-description) {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

// .main-videos {
//     transform: scaleY(.95) translateY(-12px);
// }

// 加载框
.loading {
    padding: 1rem 0;
    text-align: center;
}

// 稍后再看小球
// .wlBall-enter-active {
// }
// .wlBall-enter-to {
//     transform: translate(0,0);
// }
.watchLaterBall .animate {
    position: fixed;
    top: 20px;
    right: 270px;
    z-index: 100;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: #FB7299;
    transition: .8s 0s cubic-bezier(.13, .49, .05, 1.19) transform;
    transform-origin: center;
}

// 回到顶部
.backTop {
    width: 45px;
    height: 45px;
    background-color: #FB7299;
    line-height: 45px;
    text-align: center;
    border-radius: 50%;
    cursor: pointer;
    font-size: 25px;
    color: #fff;
    position: fixed;
    right: 30px;
    bottom: 50px;
    display: none;
}</style>