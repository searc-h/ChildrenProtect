import avatar from '../../assets/images/avatar.jpg'
import {DownOutlined} from '@ant-design/icons'
import { Dropdown, Menu, Space } from 'antd';
import './Header.less'
import { useNavigate } from 'react-router-dom';
import removeToken from '../../utils/removeToken';
export default function Header() {

  const navigate = useNavigate()
  // 退出登陆
  const logout = ()=>{
    removeToken()
    navigate('/login',{replace:true})
  }
  const menu = (
    <Menu
      items={[
        {
          label: <a onClick={logout}>退出登录</a>,
          key: '1',
        },
      ]}
    />
  );
  return (
    <header className='header'>
        <div className='left'>
          <div className='logo'>LOGO</div>
          <div className='title'>“宝护未来”儿童权利保障智慧平台</div>
        </div>

        <div className='right'>
            <div className='avatar'>
              <img src={avatar} alt="头像"  width={40}/>
            </div>
            <Dropdown overlay={menu} trigger={['click']}>
              <a onClick={e=>e.preventDefault()}>
                <Space>
                  <span className='other' style={{"color":"#fff"}}>管理员</span><DownOutlined style={{'color':'#fff'}}/>
                </Space>
              </a>
            </Dropdown>
        </div>
    </header>
  )
}
