//git@git.zhlh6.cn:fanstik/React_project.git
import { createSlice } from "@reduxjs/toolkit";
import {request} from "../../utils/index"
import { setToken as localSetToken,getToken } from "../../utils/index";

const userStore = createSlice({
    name:"user",
    initialState: {
        token: getToken() || ''
    },
    reducers: {
        //修改token方法
        setToken (state, action) {
            state.token = action.payload;
            localSetToken(action.payload);
        }
    }
})

//异步登录方法，发送请求获取token
const fetchLogin = (loginForm) => {
    return async (dispatch) => {
        const res = await request.post('/authorizations',loginForm);
        dispatch(setToken(res.data.data.token));
    }
}

//解析暴露setToken
const {setToken} = userStore.actions;
export {fetchLogin,setToken} 

//暴露reducer
const userReducer = userStore.reducer;
export default userReducer