<template>
    <a-comment>
        <template #actions>
            <span key="comment-basic-like">
                <a-tooltip title="Like">
                    <template v-if="action === 'liked'">
                        <LikeFilled @click="like" />
                    </template>
                    <template v-else>
                        <LikeOutlined @click="like" />
                    </template>
                </a-tooltip>
                <span style="padding-left: 8px; cursor: auto">
                    {{ likes }}
                </span>
            </span>
            <span key="comment-basic-dislike">
                <a-tooltip title="Dislike">
                    <template v-if="action === 'disliked'">
                        <DislikeFilled @click="dislike" />
                    </template>
                    <template v-else>
                        <DislikeOutlined @click="dislike" />
                    </template>
                </a-tooltip>
                <span style="padding-left: 8px; cursor: auto">
                    {{ dislikes }}
                </span>
            </span>
            <span key="comment-basic-reply-to">Reply to</span>
        </template>
        <template #author><slot name="author"></slot></template>
        <template #avatar>
            <div class="avatar"><img class="avatar-img" src="/bilibili.png"></div>
        </template>
        <template #content>
            <slot></slot>
            <slot name="content"></slot>
        </template>
        <template #datetime>
            <a-tooltip :title="dayjs().format('YYYY-MM-DD HH:mm:ss')">
                <span>{{ dayjs().fromNow() }}</span>
            </a-tooltip>
        </template>
    </a-comment>
</template>

<script lang="ts">
import dayjs from 'dayjs';
import { LikeFilled, LikeOutlined, DislikeFilled, DislikeOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref } from 'vue'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime);

// import type { emit } from 'process';
export default defineComponent({
    components: {
        LikeFilled,
        LikeOutlined,
        DislikeFilled,
        DislikeOutlined,
    },
    setup() {
        const likes = ref<number>(0);
        const dislikes = ref<number>(0);
        const action = ref<string>();

        const like = () => {
            likes.value = 1;
            dislikes.value = 0;
            action.value = 'liked';
        };

        const dislike = () => {
            likes.value = 0;
            dislikes.value = 1;
            action.value = 'disliked';
        };

        return {
            likes,
            dislikes,
            action,
            like,
            dislike,
            dayjs,
        };
    },
});
</script>

<style scoped>
.avatar {
    width: 30px;
    height: 30px;
    background-color: #ece8e8;
    border-radius: 50%;
}
.avatar-img {
    width: 15px;
    height: 15px;
    margin: 8px 8px;
    border-radius: 0;
}
</style>