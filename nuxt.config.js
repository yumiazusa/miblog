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
    "element-ui/lib/theme-chalk/index.css"
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
    prefix:'/api/testApi',  //配置基本的url地址 
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
