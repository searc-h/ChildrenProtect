import React , {useState }from 'react'
import {Button, Input, Space, Table,Modal} from "antd";
import {ColumnsType} from "antd/es/table";
import './Manage.css'
interface DataType {
  key: React.Key,
  number: number,
  name: string,
  phone: string | number,
  organization:string,
  op?: string, /*操作?*/
}

interface Props {
    list:DataType[]
    role: boolean,  // true表站长管理, false表儿童主任管理
}

const columns: ColumnsType<DataType> = [
  {
    title: "序号",
    dataIndex: "number",
    width: 100,
    key: "number",
  }, {
    title: "姓名",
    width: 200,
    dataIndex: "name",
    key: "name",
  }, {
    title: "手机号",
    width: 300,
    dataIndex: "phone",
    key: "phone",
  }, {
    title: "所属组织",
    width: 500,
    dataIndex: "organization",
    key: "organization",
  }, {
    title: "操作",
    key: "op",
    width: 200,
    render: () => <Space>
      <Button style={{color:'green'}}>编辑</Button>
      <Button style={{color:'red'}}> 删除</Button>
    </Space>
  },
];

export const Manage = (props: Props) => {

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const {role ,list} = props; // 站长/主任
  
  return (
      <section className="table-outer">
        <section className="search">
          <div className="left">
            <span style={{lineHeight: 2}}>姓名/手机号</span>
            <Input placeholder={"请输入关键字"} style={{width: 300}}/>
            <Button type='primary'>搜索</Button>
          </div>
          <div className="right">
            <Button type={"primary"} onClick={()=>{setIsModalVisible(true)}}>新增{role ? "站长" : "主任"}</Button>
          </div>
        </section>

        <Table
          columns={columns}
          dataSource={list}
          pagination={{ pageSize: 50 }}
          bordered
        />

        <Modal centered title={"未成年人保护"} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </section>
  )
}
