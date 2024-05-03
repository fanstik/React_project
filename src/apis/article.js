import { request } from "../utils";

//频道数据获取接口
const getChannelAPI = () => {
    return request({
        url:'/channels',
        method:'GET',
    })
}
//提交表单数据接口
const postArticleAPI = (params) => {
    return request({
        url:'/mp/articles?draft=false',
        method:'POST',
        params:params,
    })
}

export {
    getChannelAPI,
    postArticleAPI,
}