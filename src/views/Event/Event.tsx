import React, {useState} from 'react'
import {Modal, Table} from "antd";
import {ColumnsType} from "antd/es/table";

interface DataType {
    key: React.Key,
    number: number,
    type: string,
    phone: number,
    detail?: string,
    picture?: string,
    video?: string,
    state: string,
    op?: string, /*操作?*/
}
interface ModalContent {
    visible: boolean,
    title: string,
    content: string,
}

const stateMap = {
    1: "已处理",
    2: "正在处理",
    3: "未处理",
}

export default function Event() {
    const columns: ColumnsType<DataType> = [
        {
            title: "序号",
            dataIndex: "number",
            key: "number",
        }, {
            title: "事件类型",
            dataIndex: "type",
            key: "type",
        }, {
            title: "报告人手机号",
            dataIndex: "phone",
            key: "phone",
        }, {
            title: "事件描述",
            dataIndex: "detail",
            key: "detail",
            render: () => <a onClick={() => showModal(0)}>查看内容</a>,
        }, {
            title: "事件图片",
            dataIndex: "picture",
            key: "picture",
            render: () => <a onClick={() => showModal(1)}>查看内容</a>,
        }, {
            title: "事件视频",
            dataIndex: "video",
            key: "video",
            render: () => <a onClick={() => showModal(2)}>查看内容</a>,
        }, {
            title: "处理状态",
            dataIndex: "state",
            key: "state",
            render: (state: "1" | "2" | "3") => <span>{stateMap[state]}</span>
        }, {
            title: "操作",
            key: "op",
            render: () => <a onClick={() => showModal(3)}>查看详情</a>,
        },
    ];

    const [data, setData] = useState([
        {key: 1, number: 1, type: "非强制报告事件", phone: 111111111, state: "1"}
    ]);
    const [modalContent, setModalContent] = useState<ModalContent[]>(new Array(4).fill({visible: false,title:<span style={{color:"red"}}>我试试</span>}));

    function showModal(order: number) {
        setModalContent(arr => {
            const res = [...arr];
            res[order].visible = true;
            return res;
        })
    }
    function handle() {
        setModalContent(arr => {
            return arr.map(item => {
                item.visible = false;
                return item;
            });
        })
    }

    return (
        <>
            <Table columns={columns} dataSource={data}/>
            {modalContent?.map((item, index) =>
                <Modal
                    visible={item.visible}
                    title={item.title}
                    onOk={handle}
                    onCancel={handle}
                    key={index}
                >
                    <p>{item.content}</p>
                </Modal>)
            }
        </>
    )
}
