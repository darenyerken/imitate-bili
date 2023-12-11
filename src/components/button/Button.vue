<template>
    <button
        :class="classes"
        :type = "nativeType"
    >
        <span>
            <slot></slot>
        </span>

    </button>
</template>

<script setup lang="ts">
import {computed} from 'vue'
// 单独引入button的css
import 'ant-design-vue/es/button/style/css'

//定义button属性的类型 
type ButtonType = 'primary' | 'default' | 'danger' | 'link' | 'warning'
type ButtonNativeType = 'button' | 'submit' | 'reset'
type ButtonSize = 'lg' | 'sm'
// 集合到接口
interface ButtonProps {
    // 自定义类型
    type?:ButtonType,
    // 本地原始button类型
    nativeType?:ButtonNativeType,
    // 大小
    size?:ButtonSize
}
// 应用到属性
const props = withDefaults(defineProps<ButtonProps>(),{
    nativeType:'button',
})

// 定义到class上
const classes = computed(()=> {
    return [
        'ant-btn', // 默认class
        props.size?`ant-btn-${props.size}`:'',
        props.type?`ant-btn-${props.type}`:'',
        "css-dev-only-do-not-override-1qb1s0s"  //ant组件识别class
    ]
})
</script>