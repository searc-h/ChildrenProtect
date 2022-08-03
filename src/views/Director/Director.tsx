import React from 'react'
import { Manage } from "../../components";

interface DataType {
    key: React.Key,
    number: number,
    name: string,
    phone: string | number,
    organization: string,
    op?: string, /*操作?*/
}

export default function Director() {

    let directorList: DataType[] = [
        {
            number: 1,
            phone: '123431',
            name: 'React',
            key: '1',
            organization: '重庆市渝北区宝胜街道处',
        },
        {
            number: 2,
            phone: '123431',
            name: 'React',
            key: '2',
            organization: '重庆市渝北区宝胜街道处',
        },
        {
            number: 3,
            phone: '123431',
            name: 'React',
            key: '3',
            organization: '重庆市渝北区宝胜街道处',
        },
        {
            number: 4,
            phone: '123431',
            name: 'React',
            key: '4',
            organization: '重庆市渝北区宝胜街道处',
        }
    ]

    return <Manage role={false} list={directorList} />
}
