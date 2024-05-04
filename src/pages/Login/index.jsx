import React from 'react'
//引入css文件和静态资源
import "./index.scss"
import logo from "@/assets/logo.png"
import {Card,Form,Input,Button, message} from 'antd'
import { fetchLogin } from '@/store/modules/user'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleOnFinish = async (values) => {
      console.log(values);
      //请求token并存入redux
      await dispatch(fetchLogin(values));
      //路由跳转到layout界面
      navigate('/');
      //显示登录成功
      message.success("登录成功")
    }

    return (
      <div className='login'>
        <Card className='login-container'>
          <img src={logo} alt="" className='login-logo'/>
          <Form 
          validateTrigger="onBlur"
          onFinish={handleOnFinish}
          >
            <Form.Item
            name="mobile"
            rules={[
              {
              required:true,
              message:"请输入手机号 ！"
              },
              {
                pattern:/^1[3-9]\d{9}$/,
                message:"请输入正确的格式！"
              }
            ]}>
              <Input size='large' placeholder='请输入手机号'></Input>
            </Form.Item>

            <Form.Item
            name="code"
            rules={[{
              required:true,
              message:"请输入验证码！"
            }]}>
              <Input size='large' placeholder='请输入验证码'></Input>
            </Form.Item>

            <Form.Item>
              <Button type='primary' size='large' htmlType='submit' block>登录</Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    )
} 

export default  Login