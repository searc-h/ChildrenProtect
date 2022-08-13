import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './GetBack.css'
import {getVerificationCode, verifyCode} from "../../api/loginApi";
import {message} from "antd";

const phoneReg = /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/

export default function GetBack() {
  let [isRight, setIsRight] = useState<boolean>(true)
  let [phone, setPhone] = useState<string>('')
  let [code, setCode] = useState<string>('')
  let navigate = useNavigate()
  let next = () => {

    // 做手机号验证
    if(!phoneReg.test(phone)){
      return message.error("手机号填写错误");
    }
    else
    // 下一步
    verifyCode(phone, code).then(res => {
      setIsRight(true)
      setTimeout(() => {
        navigate('/setpassword', {
          replace:true,
          state: {  // phone传给重置密码页面
            phone,
          }
        })

      }, 0);
      return message.success((res as any).message);
    }, err => {
      setIsRight(false)
      return message.error(err.message);
    })
  }

  // 发送验证码
  let getCode = ()=>{

    // 做手机号验证
    if(!phoneReg.test(phone)){
      return message.error("手机号填写错误");
    }else

    getVerificationCode(phone).then(res => {
        return message.success((res as any).message);
      }, err => {
        return message.error(err.message);
      })
  }

  return (
    <div className='getback-outer'>
      <div className="loginBox">
        <div className="title">
          找回密码
        </div>
        <div className="mid">
          <div className="user">手机号</div>
          <div className='input'>
            <input
              type="text"
              placeholder='输入用户名' 
              value={phone}
              onChange={(e)=>{setPhone(e.target.value)}}
            />
          </div>
          <div className="pass">验证码</div>
          <div className='password'>
            <input 
              type="text"
              style={{ width:'200px', "borderColor": !isRight ? 'rgb(216, 26, 26)' : '',"color":!isRight?"rgb(216, 26, 26)":""}} 
              placeholder='输入验证码' 
              value={code}
              onChange={(e)=>{setCode(e.target.value)}}
            />
            <button className='getpassword' style={{"width":"150px"}} onClick={getCode}>获取验证码</button>
          </div>
          <div className="tips">
            {
              !isRight ?
                <div className="left">验证码错误重新输入</div>
                : <div />
            }
          </div>
        </div>

        <div className="loginBtn">
          <button onClick={next}>下一步</button>
        </div>
      </div>
    </div>
  )
}
