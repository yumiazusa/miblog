export default function({$axios,redirect,route,store}){
    // 基本配置
    $axios.defaults.timeout = 1000
    $axios.defaults.validateStatus = (status)=>{
            return status >= 200 && status < 600    
    }
    // 请求拦截
    $axios.onRequest(config=>{
        config.headers.token = ''
        config.headers.basehttp = 'www.baidu.com'
        config.headers.apikey = 123456
        return config
    })
    // 相应拦截
    $axios.onResponse(res=>{
        return res.data
    })
    // 错误处理
    $axios.onError(error=>{
        return error
    })
}