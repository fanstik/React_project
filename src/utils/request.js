import axios from "axios";
import { getToken, removeToken } from "./token";
import router from "@/router/index"

const request = axios.create({
    baseURL:'http://geek.itheima.net/v1_0',
    timeout:5000
})

//请求拦截器
request.interceptors.request.use((config) => {
    const token = getToken();
    if(token) {
        config.headers.Authorization = `Bearer ${token}`;
    } 
    return config;
}, (error) => {
    return Promise.reject(error);
})

//响应拦截器
request.interceptors.response.use((res) => {
    return res.data;
}, (error) => {
    if (error.response.status === 401) {
        //清除失效token
        removeToken();
        //跳转login
        router.navigate('/login');
        window.location.reload();
    }
    return Promise.reject(error);
})

export  {request}
