import React, { useEffect, useState } from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import './SetPassword.css'
import {setPwd} from "../../api/loginApi";
import {message} from "antd";
export default function SetPassword() {
  let [isRight, setIsRight] = useState<boolean>(true)
  let [passwordOne, setPasswordOne] = useState<string>('')
  let [passwordTwo, setPasswordTwo] = useState<string>('') 
  let navigate = useNavigate()

  // 获取路由参数-phone
  const {phone} = useLocation().state as {phone: string};

  // 判断两次密码是否一致
  useEffect(()=>{
    if(passwordTwo!==passwordOne)
      setIsRight(false)
    else setIsRight(true)
  },[passwordOne, passwordTwo])

  // 去重新登录
  let newLogin = ()=>{
    setPwd(passwordTwo, phone).then(res => {
      navigate('/login', {replace:true})  // 跳转到登录页重新登录以获取token
      return message.success(res.data.message);
    }, err => {
      return message.error(err.response.data.message);
    })
  }

  return (
    <div className='set-outer'>
      <div className="loginBox">
        <div className="title">
          重置密码
        </div>
        <div className="mid">
          <div className="user">新密码</div>
          <div className='input'>
            <input
              type="password"
              placeholder='输入新密码' 
              value={passwordOne}
              onChange={(e)=>{ setPasswordTwo('') ;setPasswordOne(e.target.value)}}
            />
          </div>
          <div className="pass">再次输入新密码</div>
          <div className='password'>
            <input 
              type="password" 
              style={{ "borderColor": !isRight ? 'rgb(216, 26, 26)' : '',"color":!isRight?"rgb(216, 26, 26)":""}} 
              placeholder='输入新密码' 
              value={passwordTwo}
              onChange={(e)=>{setPasswordTwo(e.target.value)}}
            />
          </div>
          <div className="tips">
            {
              !isRight ?
                <div className="left">密码不一致请重新输入</div>
                : <div />
            }
          </div>
        </div>

        <div className="loginBtn">
          <button onClick={newLogin}>重新登陆</button>
        </div>
      </div>
    </div>
  )
}
