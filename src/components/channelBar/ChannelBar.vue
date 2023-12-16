<template>
    <div class="channel-bar">
        <div class="channel-icons">
            <div class="channel-icon-item">
                <div class="icon" style="background-image: url('channel_icon.avif');
                                background-size: contain;"></div>
                <span>动态</span>
            </div>
            <div class="channel-icon-item">
                <div class="icon">
                    <FireOutlined />
                </div>
                <span>热门</span>
            </div>
        </div>
        <div class="channels">
            <div class="left-channels">
                <div class="channel-item" v-for="channel in leftChannels" :key="channel">
                    <a href="">{{ channel }}</a>
                </div>
                <div class="channel-item"><a>更多<DownOutlined style="font-size: 10px; margin-left: 4px;" /></a></div>
            </div>
            <div class="right-channels">
                <div class="channel-item"><file-text-outlined /><span>专栏</span></div>
                <div class="channel-item"><flag-outlined /><span>活动</span></div>
                <div class="channel-item"><comment-outlined /><span>社区中心</span></div>
                <div class="channel-item"><video-camera-outlined /><span>直播</span></div>
                <div class="channel-item"><smile-outlined /><span>课堂</span></div>
                <div class="channel-item"><crown-outlined /><span>新歌热榜</span></div>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { FireOutlined, DownOutlined, FileTextOutlined,
        FlagOutlined, CommentOutlined, VideoCameraOutlined,
        CrownOutlined, SmileOutlined
} from '@ant-design/icons-vue'
import { ref } from 'vue'

// 左频道列表
const leftChannels = ref<string[]>(['番剧', '国创', '综艺', '动画', '鬼畜', '舞蹈', '娱乐', '科技', '美食'
    , '汽车', '运动', '电影', '电视剧', '纪录片', '游戏', '音乐', '影视', '知识', '资讯', '生活', '时尚'])

</script>

<style scoped lang='scss'>
// 频道栏
.channel-bar {
    display: flex;

    .channel-icons {
        display: flex;
        cursor: pointer;

        .channel-icon-item {
            text-align: center;
            margin-right: 25px;

            .icon {
                height: 46px;
                width: 46px;
                border-radius: 50%;
                background-color: #F07775;
                font-size: 25px;
                text-align: center;
                line-height: 46px;
                color: #fff;
                margin-bottom: 5px;
            }
        }
    }

    .channels {
        display: flex;
        align-items: center;
        flex-wrap: nowrap;

        .left-channels {
            display: grid;
            grid-template-columns: repeat(11, 76px);
            grid-gap: 10px;
            grid-template-rows: 28px 28px;
            margin-left: 30px;

            a {
                color: #61666D !important;
            }

            a:hover {
                color: #111 !important;
            }

            .channel-item {
                background-color: #F6F7F8;
                line-height: 28px;
                text-align: center;
                border-radius: 5px;
                cursor: pointer;
            }

            .channel-item:hover {
                background-color: #E3E5E7;
            }
        }
        .right-channels {
            border-left: 1px solid #ccc;
            display: grid;
            grid-template-columns: 70px 70px 80px;
            grid-gap: 5px;
            grid-template-rows: 28px 28px;
            margin-left: 20px;
            padding-left: 16px;
            .channel-item {
                line-height: 28px;
                text-align: left;
                cursor: pointer;
                span {
                    margin-left: 5px;
                }
            }
            .channel-item:hover {
                color: #00A1D6;
            }
        }
    }
}
</style>