import {Menu} from "antd";
import {ReactNode} from "react";
import './MainLayout.css'
import {Link} from "react-router-dom";
import {Header} from '../components/index'
interface Props {
    children: ReactNode,
}

const items = [
    { label: <Link to={"/home/data"}>数据概览</Link> , key: "1", },
    { label: "角色管理", key: "2", children: [
            { label: <Link to={"/home/manage/station"}>站长管理</Link>, key: "3", },
            { label: <Link to={"/home/manage/director"}>儿童主任管理</Link>, key: "4", },
        ]},
    { label: <Link to={"/home/event"}>事件管理</Link>, key: "5", },
    { label: <Link to={"/home/set"}>设置</Link>, key: "6", },
]

export const MainLayout = (props: Props) => {
    return(
        <section className='container'>
            <section className="top">
                <Header/>
            </section>


            <section className="body">
                <section  className="menu">
                <Menu
                    style={{ width: 220 }}
                    defaultSelectedKeys={['1']}
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