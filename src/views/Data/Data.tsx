import React from 'react'
import './Data.css'

interface cardProps {
  title: string,
  img: string,
  count: number
}
function MyCard(props: cardProps) {
  let { title, img, count } = props
  return (
    <div className='card'>
      <div className="title">{title}</div>
      <div className="count">{count}</div>
    </div>
  )
}

function MyMap() {

}

export default function Data() {
  const cardList = [
    {
      title: '强制报告时间总数',
      count: 2731,
      img: ''
    },
    {
      title: '工作人员数量',
      count: 128,
      img: ''
    },
    {
      title: '已帮助儿童数量',
      count: 678,
      img: ''
    }
  ]
  return (
    <div className='data-outer'>
      <div className="cardBox">
        {
          cardList.map((item)=>{
            return <MyCard {...item} key={item.title}></MyCard>
          })
        }
      </div>
      <div className="mapBox">
        百度地图
      </div>
    </div>
  )
}
