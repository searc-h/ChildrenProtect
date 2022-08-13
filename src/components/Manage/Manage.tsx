import React, {useState} from 'react'
import {Button, Input, Space, Table, Modal, Form, Cascader, message, Typography, Popconfirm,} from "antd";
import {ColumnsType} from "antd/es/table";
import './Manage.css'
import {Role, RoleListItem} from "../../utils/interface";
import {add, modifyInfo, removeRole} from "../../api/roleManageApi";
import getId from "../../utils/getId";

interface Option {
    value: string | number;
    label: string;
    children?: Option[];
}   // 级联选项
interface Props {
    list: RoleListItem[]
    judgeRole: boolean,  // true表站长管理, false表儿童主任管理
    updateList: () => void // 重新刷新list
    searchFn: (keyWord: string) => void,
}

type FormVal = {
    name: string,
    phone: string,
    organization: [string, string, string],
}   // 表格数据

// 组织选项
const orgOptionsStation: Option[] = [
    {
        value: '渝中区',
        label: '渝中区',
        children: [
            {
                value: '七星岗街道',
                label: '七星岗街道',
                children: [
                    {
                        value: "第一社区",
                        label: "第一社区",
                    },
                    {
                        value: "第二社区",
                        label: "第二社区",
                    },
                ]
            }, {
                value: "解放碑街道",
                label: "解放碑街道",
                children: [
                    {
                        value: "第一社区",
                        label: "第一社区",
                    },
                    {
                        value: "第二社区",
                        label: "第二社区",
                    },
                ]
            }, {
                value: "两路口街道",
                label: "两路口街道",
                children: [
                    {
                        value: "第一社区",
                        label: "第一社区",
                    },
                    {
                        value: "第二社区",
                        label: "第二社区",
                    },
                ]
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
                children: [
                    {
                        value: "第一社区",
                        label: "第一社区",
                    },
                    {
                        value: "第二社区",
                        label: "第二社区",
                    },
                ]
            }, {
                value: '弹子石街道',
                label: '弹子石街道',
                children: [
                    {
                        value: "第一社区",
                        label: "第一社区",
                    },
                    {
                        value: "第二社区",
                        label: "第二社区",
                    },
                ]
            }, {
                value: '海棠溪街道',
                label: '海棠溪街道',
                children: [
                    {
                        value: "第一社区",
                        label: "第一社区",
                    },
                    {
                        value: "第二社区",
                        label: "第二社区",
                    },
                ]
            }, {
                value: '花园路街道',
                label: '花园路街道',
                children: [
                    {
                        value: "第一社区",
                        label: "第一社区",
                    },
                    {
                        value: "第二社区",
                        label: "第二社区",
                    },
                ]
            }, {
                value: '铜元局街道',
                label: '铜元局街道',
                children: [
                    {
                        value: "第一社区",
                        label: "第一社区",
                    },
                    {
                        value: "第二社区",
                        label: "第二社区",
                    },
                ]
            }, {
                value: '龙门浩街道',
                label: '龙门浩街道',
                children: [
                    {
                        value: "第一社区",
                        label: "第一社区",
                    },
                    {
                        value: "第二社区",
                        label: "第二社区",
                    },
                ]
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
                children: [
                    {
                        value: "第一社区",
                        label: "第一社区",
                    },
                    {
                        value: "第二社区",
                        label: "第二社区",
                    },
                ]
            }, {
                value: "人和街道",
                label: "人和街道",
                children: [
                    {
                        value: "第一社区",
                        label: "第一社区",
                    },
                    {
                        value: "第二社区",
                        label: "第二社区",
                    },
                ]
            }, {
                value: "仙桃街道",
                label: "仙桃街道",
                children: [
                    {
                        value: "第一社区",
                        label: "第一社区",
                    },
                    {
                        value: "第二社区",
                        label: "第二社区",
                    },
                ]
            }, {
                value: "双凤街街道",
                label: "双凤街街道",
                children: [
                    {
                        value: "第一社区",
                        label: "第一社区",
                    },
                    {
                        value: "第二社区",
                        label: "第二社区",
                    },
                ]
            },
        ],
    },
];
const orgOptionDirector: Option[] = [
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
    const [editingKey, setEditingKey] = useState<number>(-1);   // 正编辑行
    const [form] = Form.useForm();

    const {judgeRole, list, searchFn, updateList} = props; // 站长/主任

    sessionStorage.setItem('role', `${judgeRole ? "station" : "director"}`)

    function formFinished(data: FormVal) {
        const role: Role = {
            name: data.name,
            phone: data.phone,
            province: "重庆市",
            city: "重庆市",
            district: data.organization[0],
            street: data.organization[1],
            community: data.organization[2],
        };
        console.log(role)

        add(role, judgeRole ? "station" : "director").then(res => {
            // 成功之后更新列表
            updateList()
            return message.success((res as any).message);
        }, err => {
            return message.error(err.message);
        })
    }

    // 移除站长或主任
    const reqRemoveRole = async (id: string) => {

        let result = await removeRole(id, sessionStorage.getItem('role') as 'station' | 'director')
        // 成功之后更新列表
        updateList()

    }

    // 编辑选中行
    const editRow = (record: RoleListItem) => {
        form.setFieldsValue(record);
        setEditingKey(record.Key);
    }
    // 判断当前行是否在编辑
    const isEditing = (key: number): boolean => key === editingKey;

    // 保存编辑
    const save = async (record: RoleListItem) => {
        const row = (await form.validateFields()) as RoleListItem;
        const newList: RoleListItem[] = [...list];
        const index = newList.findIndex(item => record.key === item.key);
        const item = newList[index];    // 被编辑行
        newList.splice(index, 1, {
            ...item,
            ...row,
        });
        // 请求
        const id = getId();
        if (!id) return message.warn("Id获取失败");
        modifyInfo(id, item, judgeRole ? "station" : "director")
            .then(res => {
                console.log(res)
                updateList();
            }, err => {
                return message.error(err.response.data.message);
            })
        setEditingKey(-1);
    }

    const columns = [
        {
            title: "序号",
            dataIndex: "key",
            width: 100,
            align: 'center',
            key: "number",
            editable: false,
        }, {
            title: "姓名",
            width: 200,
            align: 'center',
            dataIndex: "Name",
            key: "name",
            editable: true,
        }, {
            title: "手机号",
            width: 500,
            align: 'center',
            dataIndex: "Phone",
            key: "phone",
            editable: true,
        }, {
            title: "省份",
            width: 300,
            align: 'center',
            dataIndex: "Province",
            key: "province",
            editable: false,
            render: () => <span>重庆</span>
        }, {
            title: "城市",
            width: 300,
            align: 'center',
            dataIndex: "City",
            key: "city",
            editable: false,
            render: () => <span>重庆</span>
        }, {
            title: "区县",
            width: 300,
            align: 'center',
            dataIndex: "District",
            key: "district",
            editable: true,
        }, {
            title: "街道",
            width: 300,
            align: 'center',
            dataIndex: "Street",
            key: "street",
            editable: true,
        }, {
            title: "操作",
            key: "op",
            width: 200,
            align: 'center',
            render: (_: any, record: RoleListItem) => <Space>
                {isEditing(record.Key)
                    ? <>
                        <Typography.Link onClick={() => save(record)} style={{marginRight: 8}}>
                            Save
                        </Typography.Link>
                        <Popconfirm title="Sure to cancel?" onConfirm={() => setEditingKey(-1)}>
                            Cancel
                        </Popconfirm></>
                    : <>
                        <Button onClick={() => editRow(record)} style={{color: 'green'}}>编辑</Button>
                        <Button onClick={() => reqRemoveRole(record.Id)} style={{color: 'red'}}> 删除</Button>
                    </>
                }
            </Space>
        },
    ];

    const mergedColumns = columns.map(col => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: RoleListItem) => ({
                record,
                inputType: 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record.Key),
            }),
        };
    })

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
                    <Button type='dashed' onClick={() => updateList()}>重置</Button>
                </div>
                <div className="right">
                    <Button type={"primary"} onClick={() => {
                        setIsModalVisible(true)
                    }}>新增{judgeRole ? "站长" : "主任"}</Button>
                </div>
            </section>

            <Form form={form} component={false}>
                <Table
                    columns={mergedColumns as ColumnsType<RoleListItem>}
                    dataSource={list}
                    pagination={{pageSize: 6}}
                    bordered
                    components={{
                        body: {
                            cell: EditableCell,
                        }
                    }}
                />
            </Form>

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
                        <Cascader options={judgeRole ? orgOptionDirector : orgOptionsStation} placeholder={"请选择"}/>
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType={"submit"} type={"primary"}>Submit</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </section>
    )
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: 'text';
    record: RoleListItem;
    index: number;
    children: React.ReactNode;
}

// 可编辑行下单元格
const EditableCell: React.FC<EditableCellProps> = ({
   editing,
   dataIndex,
   title,
   inputType,
   record,
   index,
   children,
   ...restProps
}) => {
    return <td {...restProps}>
        {editing ? (
            <Form.Item
                name={dataIndex}>
                <Input />
            </Form.Item>
        ) : children}
    </td>;
}
