<template>
    <footer class="ant-layout-footer">
        <slot />
    </footer>
</template>
<script setup lang='ts'>
defineOptions({
    name:'BiliFooter'
})
// 组件属性接口
interface Footerprops {
    height?:string
}
withDefaults(defineProps<Footerprops>(),{
    // 默认高度
    height:'15vh'
})
</script>
<style scoped>
.ant-layout-footer {
    text-align: center;
}
</style>