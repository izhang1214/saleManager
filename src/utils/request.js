import axios from 'axios';
import config from '@/config/config.js';
import { Loading, Message } from 'element-ui';
const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro;

const request = axios.create({
    baseURL: baseUrl,//请求的基础路径
    timeout: 5000,
    headers: {}
})

const loading = {
    loadingInstance: null,
    open() { 
        if (this.loadingInstance === null) {
            this.loadingInstance = Loading.service({
                target: ".main",
                text: "正在加载中.....",
                background: 'rgba(0,0,0,0.7)'
            })
        }
    },
    close() { 
        if (this.loadingInstance !== null) {
            this.loadingInstance.close()
        }
        this.loadingInstance = null;
    }
}

// 添加请求拦截器
request.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    loading.open()
    return config;
}, function (error) {
    loading.close()
    // 对请求错误做些什么
    return Promise.reject(error);
});


// 添加响应拦截器
request.interceptors.response.use(function (response) {
    loading.close();
    if (response.data.code!='0000') {
        Message({
            message: '请求 '+response.data.msg,
            type: "error",
            duration:5000
        })
    }
    // 对响应数据做点什么
    return response;
}, function (error) {
        loading.close();
        Message({
            message: "请求失败",
            center: true,
            type: "error",
            duration: 5000, //消息框显示的时间 3秒
        })
    // 对响应错误做点什么
    return Promise.reject(error);
});


export default request;