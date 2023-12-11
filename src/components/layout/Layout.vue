<template>
    <section class="ant-layout" :class="classes">
        <slot />
    </section>
</template>

<script setup lang='ts'>
defineOptions({
    name:'BiliLayout'
})
// 借引antd的css
import 'ant-design-vue/es/layout/style/css'
import { useSlots } from 'vue';
import type { Component, VNode } from 'vue';

function useClasses() {
    // 判断有没有子元素是sider
    // 获取插槽对象
    const slots = useSlots()
    let hasSider = false
    if(slots && slots.default) {
        // 获取所有默认插槽内的虚拟dom
        const vnodes:VNode[] = slots.default()
        // 遍历vnode
        hasSider = vnodes.some(vnode=> {
            // 将这个vnode视作component
            const Component = vnode.type as Component
            
            // 找出名字为Sider的组件( 组件名称需要自己起)
            return Component.name === 'BiliSider'
        })
    }
    return hasSider ? 'ant-layout-has-sider' : ''
}
const classes = useClasses()
</script>

<style scoped>
</style>