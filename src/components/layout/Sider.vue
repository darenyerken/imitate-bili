<template>
    <header class="ant-layout-sider">
        <slot />
    </header>
</template>
<script setup lang='ts'>
defineOptions({
    name:'BiliSider'
})
// 组件属性接口
interface Siderprops {
    width?:string
}
withDefaults(defineProps<Siderprops>(),{
    // 默认高度
    width:'15vw'
})
</script>