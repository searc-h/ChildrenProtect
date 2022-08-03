import {Menu} from "antd";
import {ReactNode, useEffect} from "react";
import './MainLayout.css'
import {Link, useLocation} from "react-router-dom";
import {Header} from '../components/index'
interface Props {
    children: ReactNode,
}

const items = [
    { label: <Link to={"/home/data"} className='item' >数据概览</Link> , key: "/home/data", },
    { 
        label: "角色管理",
        key: "/home/manage",
        children: [
            { label: <Link to={"/home/manage/station"} className='item itemc'>站长管理</Link>, key: "/home/manage/station", },
            { label: <Link to={"/home/manage/director"} className='item itemc'>儿童主任管理</Link>, key: "/home/manage/director", },
        ]
    },
    { label: <Link to={"/home/event"} className='item'>事件管理</Link>, key: "/home/event", },
    { label: <Link to={"/home/set"} className='item'>设置</Link>, key: "/home/set", },
]

export const MainLayout = (props: Props) => {

    
    let { pathname } = useLocation()
    
    return(
        <section className='container'>
            <section className="top">
                <Header/>
            </section>


            <section className="body">
                <section  className="menu">
                <Menu
                    style={{ width: 220  , fontSize: "1.1rem", letterSpacing: "3px" }}
                    defaultSelectedKeys={[pathname]}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    items={items}
                />
                </section>
                <section className="content">
                    {props.children}
                </section>
            </section>
            
        </section>
    )
}