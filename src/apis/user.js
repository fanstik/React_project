import { request } from "../utils";

const loginAPI = (loginForm) => {
    request({
        url:'/authorizations',
        method:'POST',
        params:loginForm
    })
}

const getProfileAPI = () => {
    return request({
        url:'/user/profile',
        method:'GET',
    })
}

export {
    loginAPI,
    getProfileAPI
}