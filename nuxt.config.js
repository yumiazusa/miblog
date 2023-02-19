/*
 * @Author: yumiazusa yumiazusa@hotmail.com
 * @Date: 2023-02-17 13:52:11
 * @LastEditors: yumiazusa yumiazusa@hotmail.com
 * @LastEditTime: 2023-02-18 12:50:12
 * @FilePath: /www/miledo/miblog/nuxt.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'miblog',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "element-ui/lib/theme-chalk/index.css",
    "./assets/css/base.scss",
    "./assets/iconfont/iconfont.css"
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { 
      src: "~plugins/element-ui",
      ssr:true,
      // mode:'server'//client 
    },
      //拦截器
    {
      src:'~/plugins/axios',
     'ssr':true     //  服务端渲染
    },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/dotenv'
  ],

  axios:{
    proxy:true,//  开启跨域行为
    prefix:'/api/v1/blogApi',  //配置基本的url地址 
  },
  proxy:{
    '/api':{
    target: process.env.VUE_APP_TARGETURL,  //  代理转发的地址
    pathRewrite:{
    // '^/api':''                // 找到地址中的api并替换成空    
           }
    }

  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile:['/^element-ui/']
  },
  //中间件
  router:{
    middleware:'auth' 
  }
}
