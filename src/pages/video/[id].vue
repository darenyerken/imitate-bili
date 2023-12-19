<template>
    <Layout>
        <div class="container">
            <div class="video">
                <div id="player"></div>
            </div>
            <h2 style="transform: translateX(-30vw);">评论</h2>
            <div class="outer" @scroll="outerScroll">
                <!-- 占位元素 -->
                <div :style="{ height: `${commentListHeight}px` }" class="placeholder"></div>
                <div class="viewWindow" :style="{ transform: `translateY(${viewTranslate}px)`, top: `-${viewWindowTop}px` }">
                    <Comment v-for="comment in viewList" :key="comment.key" class="comment">
                        {{ comment.key }}
                        <template #author>
                            <a>{{ comment.author }}</a>
                        </template>
                        <template #content>
                            <p>{{ comment.content }}</p>
                        </template>
                    </Comment>
                </div>
                <a-empty v-if="commentListHeight === 0" />
            </div>
        </div>
    </Layout>
</template>

<script setup lang='ts'>
import { ref, onMounted } from 'vue';
import Layout from '@/layouts/default.vue'
import Comment from '@/components/comment/Comment.vue'

// ---------------视频播放功能
// @ts-ignore
import Player from 'xgplayer/dist/index.min.js'
import 'xgplayer/dist/index.min.css'
onMounted(() => {
    new Player({
        id: 'player',
        url: "//lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo.mp4",
        fluid: true,
        poster: '/2.avif'
    })
})

// ----------------评论区
// 定高虚拟列表技术：
// 列表视口只能容下6条评论
// 上下各预加载2条评论
// 每次只渲染10条评论
import type { Comments } from '@/apis/comment'
import { getCommentList } from '@/apis/comment'

let commentList = ref<Comments[] | undefined>(undefined)  //所有列表
const viewList = ref<Comments[] | undefined>(undefined)  //可视列表
const COMMEMT_HEIGHT = 132
const commentListHeight = ref<number>(0)  //占位元素高度
onMounted(async function () {
    // 页面有个小bug总是跳到评论区
    window.scrollTo({
        top: 0
    })

    // 获取所有评论
    let res = await getCommentList()
    commentList.value = res
    // 先渲染10条评论
    viewList.value = res.filter(item => {
        return item.key <= 9
    })
    // 设置占位元素高度
    commentListHeight.value = res.length * COMMEMT_HEIGHT
})

const viewTranslate = ref<number>(0)  // 列表视口向下偏移量 === 窗口向下滑动量
const viewWindowTop = ref<number>(0)  //列表视口的绝对位置：top
const outerScroll = (e: Event) => {  //外窗口滑动
    let scrollTop = (e.target as Element).scrollTop
    console.log(Math.ceil(scrollTop / COMMEMT_HEIGHT));

    if (scrollTop > COMMEMT_HEIGHT * 4) {
        viewWindowTop.value = scrollTop % COMMEMT_HEIGHT + COMMEMT_HEIGHT
        viewTranslate.value = scrollTop  //视窗下移
        viewList.value = commentList.value?.filter(item => {
            return item.key >= Math.ceil(scrollTop / COMMEMT_HEIGHT) - 2 &&
                item.key <= Math.ceil(scrollTop / COMMEMT_HEIGHT) + 9
        })
    } else {
        viewTranslate.value = 0
        viewWindowTop.value = 0
        viewList.value = commentList.value?.filter(item => item.key <= 9)
    }
    // console.log(viewList.value);
}
</script>

<style scoped lang='scss'>
.container {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
}

// 视频播放器
.video {
    width: 95%;
    max-width: 1000px;
    border-radius: 10px;
    margin-bottom: 40px;
}

#player {
    border-radius: 10px;
}

// 评论区
.outer {
    width: 95%;
    max-width: 1000px;
    max-height: 792px;
    overflow: auto;

    // 为占位元素提供
    position: relative;
}

.placeholder {
    // position: absolute;
    // top: 0;
    // left: 0;
    width: 100%;
    background-image: linear-gradient(90deg, #F0F2F5, #e9effa 10%, #F0F2F5);
    ;
}

.viewWindow {
    // background-color: aqua;
    max-height: 1320px;
    overflow: hidden;

    position: absolute;
    top: 0;
}
</style>