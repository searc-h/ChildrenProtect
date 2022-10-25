import React, {useEffect, useState} from 'react'

import {Button, message, Modal, Table} from "antd";
import {ColumnsType} from "antd/es/table";
import {Link} from 'react-router-dom';
import {getList} from "../../api/eventApi";

interface DataType {
    key: React.Key,
    Key: number,
    Id: string, // 事件id
    EventTypeType: string,
    Phone: string,
    Describes: string,
    Image: string,
    Video: string,
    Status: string,
    Time: string,
}
interface ModalContent {
    visible: boolean,
    title: string,
    content: string,
    image:string[],
    video: string,  // 因为一定存在即使空字符串
    type: "content" | "image" | "video",    // modal所显示内容类型
}

const stateMap = {
    0: "已处理",
    1: "处理中",
    2: "处理中",
}

export default function Event() {

    const columns: ColumnsType<DataType> = [
        {
            title: "序号",
            dataIndex: "Key",
            key: "key",
            align:'center'
        }, 
         {
            title: "事件类型",
            dataIndex: "Type",
            key: "type",
            align:'center',
            render:()=>{
                return <h1>非强制事件</h1>
            }
        }, {
            title: "报告人手机号",
            dataIndex: "Phone",
            key: "phone",
            align:'center'
        }, {
            title: "事件描述",
            dataIndex: "Describes",
            key: "detail",
            align:'center',
            render: (text, record) => <Button
                type={"link"}
                onClick={() => showModal({
                    type: "content", video: "", image:[],
                    title:"查看事件描述",content:record.Describes,visible:true
                })}>查看内容</Button>,
        }, {
            title: "事件图片",
            dataIndex: "Image",
            key: "picture",
            align:'center',
            render: (text, record) => <Button
                type={"link"}
                onClick={() => showModal({
                    title:"查看图片", content:"" , visible:true,
                    type: "image", video: "",
                    image:record.Image.split(",")||[]
                })}>查看图片</Button>,
        }, {
            title: "事件视频",
            dataIndex: "Video",
            key: "VidUrl",
            align:'center',
            render: (text, record) => <Button
                type={"link"}
                onClick={() => showModal({
                    type: "video", video: record.Video, title:"查看视频",
                    content:"没有视频", visible:true,
                    image:[]})}>查看视频</Button>,
        }, {
            title: "处理状态",
            dataIndex: "Status",
            key: "state",
            align:'center',
            render: (state: "1" | "0" | "2") => <span
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
        }, {
            title: "上报时间",
            key: "time",
            align:'center',
            dataIndex: "Created",
        }
    ];

    const [data, setData] = useState<DataType[]>([]);

    const [modalContent, setModalContent] = useState<ModalContent>({
        visible: false,
        title: "",
        content: "",
        video: "",
        type: "content",    // 默认
        image:[""]
    });

    const showModal = (model: ModalContent & {type: "content" | "video" | "image"}) => {
        setModalContent({
            image:model.image,
            content: model.content,
            title: model.title || "查看",
            visible: true,
            type: model.type,
            video: model.video,
        })
    }
    const handle = () => setModalContent({
        visible: false,
        content: "暂无",
        title: "查看",
        type: "content", 
        image: [""], 
        video: ""  // 回到默认
    })

    // 请求事件列表
    useEffect(() => {
        getList(1).then(res => {

            const list: DataType[] = res.data.eventList;
            list.forEach(item => {
                item.key = item.Id as React.Key; 
            })
            setData(list)
        }, err => {
            return message.error(err.message);
        })
    }, [])

    function resolveModal(){
        switch (modalContent.type) {
            case "content": return <p>{modalContent.content}</p>
            case "image":
                if((modalContent.image as string[])?.length>0){
                    if((modalContent.image as string[])[0].length>2)
                        return <p style={{"overflowY":"scroll" , width:"100%"}}>{
                            modalContent.image?.map((img)=>{
                                return <img style={{width:"300px"}} key={img} src={img} alt={"相关图片"}/>
                            })
                        }</p>
                    else{
                        return <p>没有图片</p>
                    }
                }
                break;
            case "video":
                if (modalContent.video.length > 0) {
                    return <video controls width={"450"}>
                        <source src={"http://" + modalContent.video} type={"video/mp4"}/>
                    </video>
                } else {
                    return <p>没有视频</p>
                }
        }
    }

    return (
        <>
            <Table columns={columns} dataSource={data}/>
            <Modal
                centered
                visible={modalContent.visible}
                title={modalContent.title}
                onCancel={handle}
                footer={null}
            >
               {
                    resolveModal()
               }
            </Modal>
        </>
    )
}
