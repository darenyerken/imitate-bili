<template>
    <header class="ant-layout-header">
        <slot />
    </header>
</template>
<script setup lang='ts'>
defineOptions({
    name:'BiliHeader'
})
// 组件属性接口
interface Headerprops {
    height?:string
}
withDefaults(defineProps<Headerprops>(),{
    // 默认高度
    height:'15vh'
})
</script>