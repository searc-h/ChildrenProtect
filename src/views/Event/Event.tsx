import React, {useEffect, useState} from 'react'

import {Button, message, Modal, Table} from "antd";
import {ColumnsType} from "antd/es/table";
import {Link} from 'react-router-dom';
import {getList} from "../../api/eventApi";

interface DataType {
    key: React.Key,
    Number: number,
    Id: string, // 事件id
    Type: string,
    Phone: string,
    Detail: string,
    ImgUrl: string,
    VidUrl: string,
    Status: string
}
interface ModalContent {
    visible: boolean,
    title: string,
    content: string,
}

const stateMap = {
    0: "已处理",
    1: "未处理",
}

export default function Event() {

    const columns: ColumnsType<DataType> = [
        {
            title: "序号",
            dataIndex: "key",
            key: "key",
            align:'center'
        }, {
            title: "事件Id",
            dataIndex: "Id",
            key: "id",
            align: "center",
        }, {
            title: "事件类型",
            dataIndex: "Type",
            key: "type",
            align:'center'
        }, {
            title: "报告人手机号",
            dataIndex: "Phone",
            key: "phone",
            align:'center'
        }, {
            title: "事件描述",
            dataIndex: "Detail",
            key: "detail",
            align:'center',
            render: (text, record) => <Button
                type={"link"}
                onClick={() => showModal("事件描述", record.Detail)}>查看内容</Button>,
        }, {
            title: "事件图片",
            dataIndex: "ImgUrl",
            key: "picture",
            align:'center',
            render: (text, record) => <Button
                type={"link"}
                onClick={() => showModal("查看图片", record.VidUrl)}>查看图片</Button>,
        }, {
            title: "事件视频",
            dataIndex: "video",
            key: "VidUrl",
            align:'center',
            render: (text, record) => <Button
                type={"link"}
                onClick={() => showModal("查看视频", record.VidUrl)}>查看视频</Button>,
        }, {
            title: "处理状态",
            dataIndex: "Status",
            key: "state",
            align:'center',
            render: (state: "1" | "0") => <span
                style={state === '0'
                    ? {color:"green"}
                    : {color:"red"}}
            >{stateMap[state]}</span>
        }, {
            title: "操作",
            key: "op",
            align:'center',
            render: (text, record) => <Link
                to={"/home/detail"}
                state={{
                    id: record.Id,
                }}
            >查看详情</Link>
        },
    ];

    const [data, setData] = useState<DataType[]>([]);
    const [modalContent, setModalContent] = useState<ModalContent>({
        visible: false,
        title: "",
        content: "",
    });

    const showModal = (title: string, content?: string) => {
        setModalContent({
            content: content || "暂无内容",
            title: title || "查看",
            visible: true,
        })
    }
    const handle = () => setModalContent({
        visible: false,
        content: "暂无",
        title: "查看",
    })

    // 请求事件列表
    useEffect(() => {
        getList(1).then(res => {
            const list: DataType[] = res.data.data.stationList;
            list.forEach(item => {
                item.key = item.Number;
            })
            setData(list)
        }, err => {
            return message.error(err.response.data.message);
        })
    }, [])

    return (
        <>
            <Table columns={columns} dataSource={data}/>
            <Modal
                centered
                visible={modalContent.visible}
                title={modalContent.title}
                onOk={handle}
                onCancel={handle}
            >
                <p>{modalContent.content}</p>
            </Modal>
        </>
    )
}
