import React, {useState} from 'react'

import {Modal, Table} from "antd";
import {ColumnsType} from "antd/es/table";
import { useNavigate } from 'react-router-dom';

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

    let navigate = useNavigate()

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
            render: (text, record, index) => <a onClick={() => showModal({record,text,index ,order:0})}>查看内容</a>,
        }, {
            title: "事件图片",
            dataIndex: "ImgUrl",
            key: "picture",
            align:'center',
            render: (text, record, index) => <a onClick={() => showModal({record,text,index ,order:0})}>查看内容</a>,
        }, {
            title: "事件视频",
            dataIndex: "video",
            key: "VidUrl",
            align:'center',
            render: (text, record, index) => <a onClick={() => showModal({record,text,index ,order:0})}>查看内容</a>,
        }, {
            title: "处理状态",
            dataIndex: "Status",
            key: "state",
            align:'center',
            render: (state: "1" | "2" | "3") => <span style={state==='1'?{'color':"green"}:state==='2'?{color:"#f9d217"}:{color:"red"}}>{stateMap[state]}</span>
        }, {
            title: "操作",
            key: "op",
            align:'center',
            render: () => <a onClick={() => {navigate('/home/detail' , {replace:false, state:{id:1001}})}}>查看详情</a>,
        },
    ];

    const [data, setData] = useState<DataType[]>([]);
    const [modalContent, setModalContent] = useState<ModalContent[]>(new Array(3).fill({visible: false,title:<span style={{color:"red"}}>我试试</span>}));

    interface itemType {
        order:number,
        text?:string,
        record:DataType,
        index?:number
    }
    function showModal(item:itemType) {
        let {order ,record} = item

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
                    centered
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
