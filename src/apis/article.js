import { request } from "../utils";

//频道数据获取接口
const getChannelAPI = () => {
    return request({
        url:'/channels',
        method:'GET',
    })
}
//提交表单数据接口
function postArticleAPI(data)  {
    request({
        url:'/mp/articles?draft=false',
        method:'POST',
        data,
    })
}
//获取文章列表
function getArticleListAPI(params) {
    return request({
        url:'/mp/articles?draft=false',
        method:'GET',
        params
    })
}

//删除文章
function deleteArticleAPI(id) {
    return request({
        url:`/mp/articles/${id}`,
        method:'DELETE'
    })
}

//获取文章详情
function getArticleByIdAPI(id) {
    return request({
        url:`/mp/articles/${id}`,
        method:'GET'
    })
}

//编辑文章
function putArticleAPI(data)  {
    return request({
        url:`/mp/articles/${data.id}?draft=false`,
        method:'PUT',
        data,
    })
}

export {
    getChannelAPI,
    postArticleAPI,
    getArticleListAPI,
    deleteArticleAPI,
    getArticleByIdAPI,
    putArticleAPI
}