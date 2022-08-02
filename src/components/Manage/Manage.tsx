import React from 'react'
import styles from "./Manage.module.css";
import Search from "antd/es/input/Search";
import {Button, Space, Table} from "antd";
import {ColumnsType} from "antd/es/table";

interface DataType {
  key: React.Key,
  number: number,
  name: string,
  phone: number,
  op?: string, /*操作?*/
}
interface Props {
    role: boolean,  // true表站长管理, false表儿童主任管理
}

const columns: ColumnsType<DataType> = [
  {
    title: "序号",
    dataIndex: "number",
    key: "number",
  }, {
    title: "姓名",
    dataIndex: "name",
    key: "name",
  }, {
    title: "手机号",
    dataIndex: "phone",
    key: "phone",
  }, {
    title: "所属组织",
    dataIndex: "organization",
    key: "organization",
  }, {
    title: "操作",
    key: "op",
    render: () => <Space>
      <span>编辑</span>
      <span>删除</span>
    </Space>
  },
];

export const Manage = (props: Props) => {
  const {role} = props; // 站长/主任

  return (
      <section className={styles["container"]}>
        <section className={styles["bar"]}>
          <span style={{lineHeight: 2}}>姓名 / 手机号</span>
          <Search placeholder={"请输入关键字"} enterButton={"搜索"} style={{width: 300}}/>
          <Button type={"primary"}>新增{role ? "站长" : "主任"}</Button>
        </section>
        <Table columns={columns} />
      </section>
  )
}
