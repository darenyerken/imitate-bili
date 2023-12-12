// import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue';
import legacy from '@vitejs/plugin-legacy'
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import VueRouter from 'unplugin-vue-router/vite'

// require('events').EventEmitter.defaultMaxListeners = 0;
// https://vitejs.dev/config/
export default defineConfig({
  lintOnSave:true,
  plugins: [
    VueRouter({}), //自动路由引入
    vue(),
    // 浏览器兼容
    legacy({
      polyfills: ['es.promise.finally', 'es/map', 'es/set'],
      modernPolyfills: ['es.promise.finally'],
    }),
    // 组件自动引入
    Components({
      dts: true,
      resolvers: [
        // antd 自动引入
        AntDesignVueResolver({
          importStyle: true, // css in js
        }),
      ],
    }),
  ],
  // 配置测试环境
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'json', 'html'],
      // include: []
    },
  },
  // resolve: {
  //   alias: {
  //     '@': fileURLToPath(new URL('./src', import.meta.url))
  //   }
  // },
  resolve: {
    alias: {
      // 导入路径可以省略回退,不用一级一级跳出去找
      "@": resolve(__dirname, 'src'), // 路径别名
    },
    extensions: ['.js', '.json', '.ts', '.vue'] // 使用路径别名时想要省略的后缀名，可以自己 增减
  },
  // server:{
  //   proxy:{
  //     // 将api路径的网络请求都转发到target路径下
  //     "/api/":{
  //       target:"http://shengxinjing.cn:7001/",
  //       // 源地址改变了
  //       changeOrigin:true,
  //       // 不是https
  //       secure:false,
  //       rewrite:(path)=>path.replace(/^\/api/,'')
  //     }
  //   }
  // }
})

// import events from 'events'
// events.EventEmitter.setMaxListeners(20)