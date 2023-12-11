import { createRouter, createWebHashHistory } from 'vue-router'

const routes:any = [
    // 同步路由, 登录和首页
    {
        // 重定向首页
        path:'/',
        redirect:'/home'
    }
]

const modules = import.meta.glob('./view/*.vue')
Object.keys(modules).forEach(key=> {
    const module = {
        path:'/'+ key.split('/').pop()?.split('.')[0].toLowerCase(),
        component:modules[key]
    }
    routes.push(module)
    console.log(module);
})



const router = createRouter({
    routes,
    history: createWebHashHistory()
})

export default router