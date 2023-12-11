<template>
    <BiliLayout>
        <!-- 头部组件 -->
        <BiliHeader>
            <PageHeader></PageHeader>
        </BiliHeader>
        <!-- 内容 -->
        <BiliContent>
            <BiliLayout class="content-layout">
                <!-- <BiliSider><h4>Sider</h4></BiliSider> -->
                <slot></slot>
            </BiliLayout>
        </BiliContent>
        <!-- 页脚 -->
        <BiliFooter>Footer</BiliFooter>
    </BiliLayout>
</template>

<script setup lang='ts'>
// import BiliButton from '@/components/button/Button.vue'
import BiliLayout from '@/components/layout/Layout.vue'
import BiliHeader from '@/components/layout/Header.vue'
import BiliContent from '@/components/layout/Content.vue'
import BiliFooter from '@/components/layout/Footer.vue'
import PageHeader from '@/components/page-header/PageHeader.vue'
// import BiliSider from '@/components/layout/Sider.vue'
</script>

<style scoped lang='scss'>
// h1,
// h3,
// h4 {
//     color: #666;
// }
.ant-layout-header {
    height: fit-content;
}
.content-layout {
    padding: 10px 100px;
}
</style>