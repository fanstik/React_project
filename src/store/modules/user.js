//git@git.zhlh6.cn:fanstik/React_project.git
import { createSlice } from "@reduxjs/toolkit";
import { setToken as localSetToken,getToken,removeToken } from "../../utils/index";
import { loginAPI,getProfileAPI } from "../../apis/user";

const userStore = createSlice({
    name:"user",
    initialState: {
        token: getToken() || '',
        userInfo: {}
    },
    reducers: {
        //修改token方法
        setToken (state, action) {
            state.token = action.payload;
            localSetToken(action.payload);
        },
        //修改userInfo方法
        setUserInfo (state, action) {
            state.userInfo = action.payload;
        },
        //清除userInfo方法
        clearUserInfo (state) {
            state.token = '';
            state.userInfo = {};
            removeToken();
        }
    }
})

//异步登录方法，发送请求获取token
const fetchLogin = (loginForm) => {
    return async (dispatch) => {
        const res = await loginAPI(loginForm);
        dispatch(setToken(res.data.token || res.data.data.token));
    }
}

//发送请求获取userInfo并存入本地
const fetchUserInfo = () => {
    return async (dispatch) => {
        const res = await getProfileAPI();
        dispatch(setUserInfo(res.data));
    }
}

//解析暴露setToken
const {setToken,setUserInfo,clearUserInfo} = userStore.actions;
export {
    fetchLogin,
    setToken,
    setUserInfo,
    clearUserInfo,
    fetchUserInfo
} 

//暴露reducer
const userReducer = userStore.reducer;
export default userReducer