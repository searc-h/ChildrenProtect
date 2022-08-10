import React, {useEffect, useState} from 'react'
import './Data.css'
import finished from '../../assets/icons/finished.png'
import doing from '../../assets/icons/doing.png'
import {showCardData} from "../../api/dataApi";
import {message} from "antd";

interface cardProps {
  title: string,
  img: string,
  count: number
}
interface CardsData {
  ChildrenTotal: number,
  EventTotal: number,
  PersonTotal: number,
}

function MyCard(props: cardProps) {
  // let { title, img, count } = props
  let { title, count } = props
  return (
    <div className='card'>
      <div className="title">{title}</div>
      <div className="count">{count}</div>
    </div>
  )
}

interface map {
  longitude : string | number   //经度
  latitude :   string | number // 纬度
  status  :  string  
}
interface mapProps{
  mapList : map[]
}
function MyMap(props: mapProps) {
  
  let {mapList} = props
  
  useEffect(() => {
    let map = new BMapGL.Map('mymap');
    map.centerAndZoom(new BMapGL.Point(106.5907, 29.7320), 16);
    map.enableScrollWheelZoom();
    
    let finishedIcon = new BMapGL.Icon(finished, new BMapGL.Size(45, 50));
    let doingIcon = new BMapGL.Icon(doing, new BMapGL.Size(45, 54));

    mapList.forEach((marker)=>{
      let {longitude  , latitude} = marker
      let Pointer :any
      if(marker.status === 'finished')
      {
        // 创建点标记
        Pointer = new BMapGL.Marker(new BMapGL.Point(+latitude ,+longitude ) ,{
          icon: finishedIcon
        })
      }else{
        // 创建点标记
        Pointer = new BMapGL.Marker(new BMapGL.Point(+latitude ,+longitude ) ,{
          icon: doingIcon
        })
      }

      map.addOverlay(Pointer)
    })

  }, [mapList])

  return (
    <div id='mymap' style={{ "width": "100%", "height": "100%", "textAlign": "center", "backgroundColor": "#f3f3f3", "boxShadow": "0px 0px 10px rgba(0,0,0,0.2)" , zIndex:"99" }}>
    </div>
  )
}

export default function Data() {
  const [data, setData] = useState<CardsData>({
    ChildrenTotal: 0,
    EventTotal: 0,
    PersonTotal: 0,
  });

  // cardList ， mapList 最后通过axios发到
  const cardList:cardProps[] = [
    {
      title: '强制报告事件总数',
      count: data.EventTotal,
      img: ''
    },
    {
      title: '工作人员数量',
      count: data.PersonTotal,
      img: ''
    },
    {
      title: '已帮助儿童数量',
      count: data.ChildrenTotal,
      img: ''
    }
  ]

  const mapList:map[] = [
    {
      longitude:  29.7332,  //经度
      latitude:  106.5907, // 纬度
      status: "finished" 
    },
    {
      longitude:  29.7302,  //经度
      latitude:  106.5930, // 纬度
      status: "doing" 
    },
    {
      longitude:  29.7322,  //经度
      latitude:  106.5900, // 纬度
      status: "doing" 
    },
    {
      longitude:  29.7304,  //经度
      latitude:  106.5947, // 纬度
      status: "finished" 
    }
  ]

  // 获取数据概览
  useEffect(() => {
    showCardData().then(res => {
      setData(res.data.data)
    }, err => {
      return message.error(err.response.data.message);
    })
  }, [])

  return (
    <div className='data-outer'>
      <div className="cardBox">
        {
          cardList.map((item) => {
            return <MyCard {...item} key={item.title}/>
          })
        }
      </div>
      <div className="mapBox">
        <MyMap mapList={mapList} />
      </div>
    </div>
  )
}
