import axios from "axios";

const request = axios.create({
    baseURL:'http://geek.itheima.net/v1_0',
    timeout:5000
})

//请求拦截器
request.interceptors.request.use = ((config) => {
    return config;
}, (error) => {
    return Promise.reject(error);
})

//响应拦截器
request.interceptors.response.use = ((res) => {
    return res.data;
}, (error) => {
    return Promise.reject(error);
})

export  {request}
