import React, {useState} from 'react'
import {Button, Input, Space, Table, Modal, Form, Cascader, message} from "antd";
import {ColumnsType} from "antd/es/table";
import './Manage.css'
import {Role, RoleListItem} from "../../utils/interface";
import {add} from "../../api/roleManageApi";

interface Option {
    value: string | number;
    label: string;
    children?: Option[];
}   // 级联选项
interface Props {
    list: RoleListItem[]
    judgeRole: boolean,  // true表站长管理, false表儿童主任管理
    searchFn: (keyWord: string) => void,
}
type FormVal = {
    name: string,
    phone: string,
    organization: [string, string],
}   // 表格数据

const columns: ColumnsType<RoleListItem> = [
    {
        title: "序号",
        dataIndex: "Number",
        width: 100,
        align: 'center',
        key: "number",
    }, {
        title: "姓名",
        width: 200,
        align: 'center',
        dataIndex: "Name",
        key: "name",
    }, {
        title: "手机号",
        width: 300,
        align: 'center',
        dataIndex: "Phone",
        key: "phone",
    }, {
        title: "所属组织",
        width: 500,
        align: 'center',
        dataIndex: "Organization",
        key: "organization",
    }, {
        title: "操作",
        key: "op",
        width: 200,
        align: 'center',
        render: () => <Space>
            <Button style={{color: 'green'}}>编辑</Button>
            <Button style={{color: 'red'}}> 删除</Button>
        </Space>
    },
];

// 组织选项
const orgOptions: Option[] = [
    {
        value: '渝中区',
        label: '渝中区',
        children: [
            {
                value: '七星岗街道',
                label: '七星岗街道',
            }, {
                value: "解放碑街道",
                label: "解放碑街道",
            }, {
                value: "两路口街道",
                label: "两路口街道",
            }
        ],
    },
    {
        value: '南岸区',
        label: '南岸区',
        children: [
            {
                value: '南坪街道',
                label: '南坪街道',
            }, {
                value: '弹子石街道',
                label: '弹子石街道',
            }, {
                value: '海棠溪街道',
                label: '海棠溪街道',
            }, {
                value: '花园路街道',
                label: '花园路街道',
            }, {
                value: '铜元局街道',
                label: '铜元局街道',
            }, {
                value: '龙门浩街道',
                label: '龙门浩街道',
            }
        ],
    },
    {
        value: '渝北区',
        label: '渝北区',
        children: [
            {
                value: '两路街道',
                label: '两路街道',
            }, {
                value: "人和街道",
                label: "人和街道",
            }, {
                value: "仙桃街道",
                label: "仙桃街道",
            }, {
                value: "双凤街街道",
                label: "双凤街街道",
            },
        ],
    },
];

export const Manage = (props: Props) => {
    const [searchKeyword, setSearchKeyword] = useState<string>("");
    const [isModalVisible, setIsModalVisible] = useState(false);

    const {judgeRole, list, searchFn} = props; // 站长/主任

    function formFinished(data: FormVal) {
        const role: Role = {
            name: data.name,
            phone: data.phone,
            province: "重庆市",
            city: "重庆市",
            district: data.organization[0],
            street: data.organization[1],
        };
        add(role, judgeRole ? "station" : "director").then(res => {
            return message.success(res.data.message);
        }, err => {
            return message.error(err.response.data.message);
        })
    }

    return (
        <section className="table-outer">
            <section className="search">
                <div className="left">
                    <span style={{lineHeight: 2}}>姓名/手机号</span>
                    <Input
                        value={searchKeyword}
                        placeholder={"请输入关键字"}
                        style={{width: 300}}
                        onChange={e => setSearchKeyword(e.target.value)}
                    />
                    <Button type='primary' onClick={() => searchFn(searchKeyword)}>搜索</Button>
                </div>
                <div className="right">
                    <Button type={"primary"} onClick={() => {
                        setIsModalVisible(true)
                    }}>新增{judgeRole ? "站长" : "主任"}</Button>
                </div>
            </section>

            <Table
                columns={columns}
                dataSource={list}
                pagination={{pageSize: 50}}
                bordered
            />

            <Modal
                centered
                title={"新增" + judgeRole ? "社区儿童主任" : "未成年人保护站站长"}
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                onOk={() => setIsModalVisible(false)}
            >
                <Form
                    onFinish={formFinished}
                >
                    <Form.Item
                        label={"姓名"}
                        name={"name"}
                        rules={[{required: true}]}
                    >
                        <Input placeholder={"请输入"}/>
                    </Form.Item>
                    <Form.Item
                        label={"手机号"}
                        name={"phone"}
                        rules={[{required: true}]}
                    >
                        <Input placeholder={"请输入"}/>
                    </Form.Item>
                    <Form.Item
                        label={"所属组织"}
                        name={"organization"}
                        rules={[{required: true}]}
                    >
                        <Cascader options={orgOptions} placeholder={"请选择"}/>
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType={"submit"} type={"primary"}>Submit</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </section>
    )
}
