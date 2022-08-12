import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import setToken from '../../utils/setToken'
import './Login.css'
import {login as loginApi} from "../../api/loginApi";
import {message} from "antd";
import setId from "../../utils/setId";
import setPhone from "../../utils/setPhone";

export default function Login() {
  let [isRight, setIsRight] = useState<boolean>(true)
  let [username, setUsername] = useState<string>('')
  let [password, setPassword] = useState<string>('')
  let navigate = useNavigate()
  let Login = () => {
    // 登录逻辑
    loginApi(username, password).then(res => {
      setIsRight(true)
      setToken(res.data.data.token);
      setId(res.data.data.id);
      setPhone(username);
      setTimeout(() => {
        navigate('/home/data')
      }, 0);
      return message.success(res.data.message);
    }).catch(err => {
      setIsRight(false)
      return message.error(err.response.data.message);
    })
  }

  return (
    <div className='login-outer'>
      <div className="loginBox">
        <div className="title">
          欢迎登录
        </div>
        <div className="mid">
          <div className="user">用户名称</div>
          <div className='input'>
            <input
              type="text"
              placeholder='输入用户名' 
              value={username}
              onChange={(e)=>{setUsername(e.target.value)}}
            />
          </div>
          <div className="pass">用户密码</div>
          <div className='password'>
            <input 
              type="password" 
              style={{ "borderColor": !isRight ? 'rgb(216, 26, 26)' : '',"color":!isRight?"rgb(216, 26, 26)":""}} 
              placeholder='密码' 
              value={password}
              onChange={(e)=>{setPassword(e.target.value)}}
            />
          </div>
          <div className="tips">
            {
              !isRight ?
                <div className="left">用户密码错误重新输入</div>
                : <div />
            }

            <div className="right" onClick={()=>{navigate('/getback')}}>忘记密码？</div>
          </div>
        </div>

        <div className="loginBtn">
          <button onClick={Login}>登录</button>
        </div>
      </div>
    </div>
  )
}
