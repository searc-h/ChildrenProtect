import React from 'react'
import {Manage} from "../../components";

export default function Station() {
    interface DataType {
        key: React.Key,
        number: number,
        name: string,
        phone: string | number,
        organization:string,
        op?: string, /*操作?*/
      }

      
    // 发请求拿站长数据
      let stationList:DataType[] = [
        {
          number: 1,
          phone:'123431',
          name:'Vue',
          key:'1',
          organization:'重庆市渝北区宝胜街道处',
        },
        {
          number: 2,
          phone:'123431',
          name:'Vue',
          key:'2',
          organization:'重庆市渝北区宝胜街道处',
        },
        {
          number: 3,
          phone:'123431',
          name:'Vue',
          key:'3',
          organization:'重庆市渝北区宝胜街道处',
        },
        {
          number: 4,
          phone:'123431',
          name:'Vue',
          key:'4',
          organization:'重庆市渝北区宝胜街道处',
        }
      ]

    return <Manage role={true} list={stationList} />
}
