import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import setToken from '../../utils/setToken'
import './SetPassword.css'
export default function SetPassword() {
  let [isRight, setIsRight] = useState<boolean>(true)
  let [passwordOne, setPasswordOne] = useState<string>('')
  let [passwordTwo, setPasswordTwo] = useState<string>('') 
  let navigate = useNavigate()

  useEffect(()=>{
    if(passwordTwo!==passwordOne)
      setIsRight(false)
    else setIsRight(true)
  },[passwordTwo])

  let newLogin = ()=>{
    if(isRight){
      navigate('/home', {replace:true})
    }
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
                : <div></div>
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
