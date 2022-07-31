import {Menu} from "antd";
import {ReactNode} from "react";
import styles from "./MainLayout.module.css";
import {Link} from "react-router-dom";

interface Props {
    children: ReactNode,
}

const items = [
    { label: <Link to={"/home/data"}>数据概览</Link> , key: "1", },
    { label: "角色管理", key: "2", children: [
            { label: <Link to={"/home/station"}>站长管理</Link>, key: "3", },
            { label: <Link to={"/home/director"}>儿童主任管理</Link>, key: "4", },
        ]},
    { label: <Link to={"/home/event"}>事件管理</Link>, key: "5", },
    { label: <Link to={"/home/set"}>设置</Link>, key: "6", },
]

export const MainLayout = (props: Props) => {
    return <section className={styles["container"]}>
        <header className={styles["header"]}>
            <h1>LOGO</h1>
            <h3>“宝护未来”儿童权利保障智慧平台</h3>
            <div>消息</div>
            <section>
                <span>头像</span>
                <span>昵称</span>
                <span>👇</span>
            </section>
        </header>
        <section className={styles["body"]}>
            <Menu
                items={items}
                className={styles["menu"]}
                mode={"inline"}
                inlineCollapsed={false}
                inlineIndent={29}
            />
            <section>
                {props.children}
            </section>
        </section>
    </section>
}