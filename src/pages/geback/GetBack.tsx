import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './GetBack.css'
export default function GetBack() {
  let [isRight, setIsRight] = useState<boolean>(true)
  let [phone, setPhone] = useState<string>('')
  let [code, setCode] = useState<string>('')
  let navigate = useNavigate()
  let next = () => {

    // 做手机号验证
    if(!phone.trim()){
      alert('手机号不能为空')
      return
    }

    // 下一步
    if(code!=='1111'){
      setIsRight(false)
    }else{
      setIsRight(true)

      setTimeout(() => {
        navigate('/setpassword', {replace:true})
      }, 0);
    }
  }

  let getCode = ()=>{
    alert('验证码是1111')
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
              type="password" 
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
                : <div></div>
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
