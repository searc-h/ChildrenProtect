import React from 'react'
import './Header.css'
export default function Header() {
  return (
    <header className='header'>
        <div className='left'>
          <div className='logo'>LOGO</div>
          <div className='icon'>三</div>
          <div className='title'>“宝护未来”儿童权利保障智慧平台</div>
        </div>

        <div className='right'>
            <div>头像</div>
            <div>昵称</div>
        </div>
    </header>
  )
}
