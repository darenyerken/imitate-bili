import { createApp } from "vue";
// @ts-ignore
import App from './App.vue'
// @ts-ignore
import {createRouter, createWebHashHistory } from 'vue-router/auto'
import { createPinia } from "pinia";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'


const app = createApp(App)

const router = createRouter({
    history:createWebHashHistory(),
    // routes会自动插入
})

app.use(router)
app.use(createPinia().use(piniaPluginPersistedstate))
app.mount('#app')
