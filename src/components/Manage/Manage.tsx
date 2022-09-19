import React, {useEffect, useState} from 'react'
import {Button, Input, Space, Table, Modal, Form, Cascader, message,} from "antd";
import {ColumnsType} from "antd/es/table";
import './Manage.less'
import {Role, RoleListItem} from "../../utils/interface";
import {add, addCommunity, getCommunity, getDistinct, modifyInfo, removeRole} from "../../api/roleManageApi";
import getId from "../../utils/getId";
import setId from '../../utils/setId'

interface Option {
    value: string;
    label: string;
    children?: Option[];
    isLeaf?: boolean,
    loading?: boolean,
    disabled?: boolean,
}   // 级联选项
interface Props {
    list: RoleListItem[]
    judgeRole: boolean,  // true表站长管理, false表儿童主任管理
    updateList: () => void // 重新刷新list
    searchFn: (keyWord: string) => void,
}
interface Districts {
    Name: string,
    Level: "province" | "city" | "district" | "street" | "Community",
    Districts: Districts[] | [],
}

type FormVal = {
    name: string,
    phone: string,
    organization: [string, string, string],
}   // 表格数据

export const Manage = (props: Props) => {
    const [searchKeyword, setSearchKeyword] = useState<string>("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [isStreetModalVisible, setIsStreetModalVisible] = useState<boolean>(false);
    const [districts, setDistricts] = useState<Districts>(); // 地区
    const [districtOption, setDistrictOption] = useState<Option>({value: '', label: '', loading: true});   // 地区选项

    const [form] = Form.useForm();

    const {judgeRole, list, searchFn, updateList} = props; // 站长/主任

    sessionStorage.setItem('role', `${judgeRole ? "station" : "director"}`)

    // 提交
    function formFinished(data: FormVal) {
        let organization = data.organization.slice(2) 
        if(organization[2] === 'false'){
            message.error("请选择正确的社区，或者添加社区在进行选择");
            return
        }
        const role: Role = {
            name: data.name,
            phone: data.phone,
            province: "重庆市",
            city: "重庆市",
            district: organization[0],
            street: organization[1],
            community: organization[2],
        };

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
        type Response = {
            code: number,
            message: string
        };
        let result = (await removeRole(id, sessionStorage.getItem('role') as 'station' | 'director')) as unknown as Response ;
        if (result.code === 200) {
            updateList();   // 成功之后更新列表
            return message.success(result.message);
        } else {
            return message.error(result.message);
        }
    }

    // 编辑选中行
    const edit = (record: RoleListItem) => {
        setId(record.Id)
        setEditModalVisible(true);
        form.setFieldsValue({
            ...record
        })
    }

    // 保存编辑
    const save = async () => {
        form.validateFields().then(val => {
            const id = getId();
            if (!id) return message.warn("Id获取失败");
            val.District = val.organization[2];
            val.Street = val.organization[3];
            if (val.organization[4]) {
                val.Community = val.organization[4];
            }
            modifyInfo(id, val, judgeRole ? "station" : "director")
            .then(res => {
                message.success((res as any).message)
                updateList();
            }, err => {
                return message.error(err.message);
            })
        })
        setEditModalVisible(false);
    }

    // 重置搜索
    const reSetSearch = ()=>{
        setSearchKeyword("")
        updateList()
    }

    // 获取地区选项
    useEffect(() => {
        getDistinct().then(res => {
            setDistricts(res.data);
        }, err => {
            return message.error(err.message);
        })
    }, [])
    // 处理地区级联选项
    useEffect(() => {
        if (!districts) return;
        const getOption = (distinct: Districts): Option => {
            return {
                value: distinct.Name,
                label: distinct.Name,
                children: distinct.Districts?.map(item => getOption(item)),
                isLeaf: false,
                loading: false,
            };
        }
        setDistrictOption(getOption(districts));
    }, [districts])

    // 地区选项动态加载
    const loadCommunity = (selectedOption: Option[]) => {
        if (judgeRole || selectedOption.length < 4) return;  // 街道以前不需动态加载
        const targetOption = selectedOption[selectedOption.length - 1];
        targetOption.loading = true;
        const options: string[] = new Array(4);
        for (let i = 0; i < 4; i++) {
            options[i] = selectedOption[i].value;
        }
        getCommunity(options[0], options[1], options[2], options[3]).then(res => {

            interface Response {
                code: number,
                message: {community: Array<{Community: string}>}
            }
            const list = (res as unknown as Response).message.community?.map(item => {
                return {
                    value: item.Community,
                    label: item.Community,
                }
            })
            // @ts-ignore
            if(list.length<1){
                targetOption.children = [
                    {
                        value: "false",
                        label: "请添加社区",
                        disabled: true,
                    }
                ];
            }
            else targetOption.children = list 

            setDistrictOption({...districtOption})
            targetOption.loading = false;
        })
    }

    // 添加社区
    const finishCommunityForm = (values: {organization: string[], community: string}) => {
        addCommunity(values.organization, values.community).then(res => {
            // @ts-ignore
            return message.success(res.message);
        }, err => {
            return message.error(err.message);
        })
    }

    const StationColumns = [
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
            title: "省市",
            width: 250,
            align: 'center',
            dataIndex: "Province",
            key: "province",
            editable: false,
            render: () => <span>重庆市</span>
        }, {
            title: "城市",
            width: 250,
            align: 'center',
            dataIndex: "City",
            key: "city",
            editable: false,
            render: () => <span>重庆市</span>
        }, {
            title: "区县",
            width: 300,
            align: 'center',
            dataIndex: "District",
            key: "district",
            editable: true,
        }, {
            title: "街道",
            width: 250,
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
                <Button onClick={() => edit(record)} style={{color: 'green'}}>编辑</Button>
                <Button onClick={() => reqRemoveRole(record.Id)} style={{color: 'red'}}> 删除</Button>
            </Space>
        },
    ];

    const DirectorColumns = [
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
            title: "省市",
            width: 250,
            align: 'center',
            dataIndex: "Province",
            key: "province",
            editable: false,
            render: () => <span>重庆市</span>
        }, {
            title: "城市",
            width: 250,
            align: 'center',
            dataIndex: "City",
            key: "city",
            editable: false,
            render: () => <span>重庆市</span>
        }, {
            title: "区县",
            width: 300,
            align: 'center',
            dataIndex: "District",
            key: "district",
            editable: true,
        }, {
            title: "街道",
            width: 250,
            align: 'center',
            dataIndex: "Street",
            key: "street",
            editable: true,
        }, {
            title: "社区",
            width: 250,
            align: 'center',
            dataIndex: "Community",
            key: "Community",
            editable: true,
        },{
            title: "操作",
            key: "op",
            width: 200,
            align: 'center',
            render: (_: any, record: RoleListItem) => <Space>
                <Button onClick={() => edit(record)} style={{color: 'green'}}>编辑</Button>
                <Button onClick={() => reqRemoveRole(record.Id)} style={{color: 'red'}}> 删除</Button>
            </Space>
        },
    ];

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
                    <Button type='dashed' onClick={reSetSearch}>重置</Button>
                </div>
                <div className="right">
                    <Button type={"primary"} onClick={() => {
                        setIsModalVisible(true)
                    }}>新增{judgeRole ? "站长" : "主任"}</Button>

                    {!judgeRole && <Button
                        type={"primary"}
                        onClick={() => {setIsStreetModalVisible(true)}}
                    >新增社区选项</Button>}
                </div>
                
            </section>

            <Form form={form} component={false}>
                <Table
                    columns={judgeRole ? StationColumns as ColumnsType<RoleListItem> : DirectorColumns as ColumnsType<RoleListItem>}
                    dataSource={list}
                    pagination={{pageSize: 6}}
                    bordered
                />
            </Form>

            <Modal
                centered
                title={"新增" + judgeRole ? "未成年人保护站站长" : "社区儿童主任"}
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
                        <Cascader options={[districtOption]} placeholder={"请选择"}
                            // @ts-ignore
                            loadData={loadCommunity} changeOnSelect />
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType={"submit"} type={"primary"}>Submit</Button>
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                centered
                title={"修改" + (judgeRole ? "未成年人保护站站长信息" : "社区儿童主任信息")}
                visible={editModalVisible}
                onCancel={() => setEditModalVisible(false)}
                onOk={save}
            >
                <Form  form={form}>
                    <Form.Item
                        label={"姓名"}
                        name={"Name"}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label={"手机"}
                        name={"Phone"}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label={"区域"} name={"organization"}>
                        <Cascader options={[districtOption]} placeholder={"请选择"}
                            // @ts-ignore
                            loadData={loadCommunity} changeOnSelect />
                    </Form.Item>
                </Form>
            </Modal>

            <Modal 
                centered
                title={"新增社区选项"} 
                visible={isStreetModalVisible}
                onCancel={() => setIsStreetModalVisible(false)}
                onOk={() => setIsStreetModalVisible(false)}
            >
                <Form onFinish={finishCommunityForm}>
                    <Form.Item label={"区域"} name={"organization"}>
                        <Cascader options={[districtOption]} placeholder={"请选择"} changeOnSelect />
                    </Form.Item>
                    <Form.Item label={"社区"} name={"community"}>
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button type={"primary"} htmlType={"submit"}>Submit</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </section>
    )
}