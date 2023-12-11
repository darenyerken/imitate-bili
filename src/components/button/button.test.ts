import {test, expect} from 'vitest'
import Button from './Button.vue'
import { mount } from '@vue/test-utils'

// 测试Button组件 slot功能
test('test Button-slot', async ()=> {
    // expect(Button).toBeTruthy  // 先检查组件是否存在

    // 先模拟创建一个button实例
    const wrapper = mount(Button, {
        props: {
            type:'primary'
        },
        slots:{
            default:"hello world"
        }
    })

    // 测试这个button是否存在该有的size属性
    expect(wrapper.text()).toContain('hello world')
})

// 测试Button组件 size属性
test('test Button-size', async ()=> {
    // expect(Button).toBeTruthy  // 先检查组件是否存在

    // 先模拟创建一个button实例
    const wrapper = mount(Button, {
        props: {
            size:'lg'
        }
    })

    // 测试这个button是否存在该有的size属性
    expect(wrapper.classes()).toContain('ant-btn-lg')
})