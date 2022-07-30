import {Menu} from "antd";
import {ReactNode} from "react";
import styles from "./MainLayout.module.css";

interface Props {
    children: ReactNode,
}

const items = [
    { label: "数据概览", key: "1", },
    { label: "角色管理", key: "2", },
    { label: "站长管理", key: "3", },
    { label: "儿童主任管理", key: "4", },
    { label: "事件管理", key: "5", },
    { label: "设置", key: "6", },
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
            <Menu items={items} className={styles["menu"]}/>
            <section>
                {props.children}
            </section>
        </section>
    </section>
}