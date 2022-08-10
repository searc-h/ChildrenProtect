import React, {useEffect, useState} from 'react'
import './Data.css'
import finished from '../../assets/icons/finished.png'
import doing from '../../assets/icons/doing.png'
import {showCardData, showDataMap} from "../../api/dataApi";
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
  longitude : number   //经度
  latitude : number // 纬度
  status  :  string
}
interface mapProps{
  mapList : map[]
}

export default function Data() {
  const [data, setData] = useState<CardsData>({
    ChildrenTotal: 0,
    EventTotal: 0,
    PersonTotal: 0,
  });
  const [mapList, setMapList] = useState<map[]>([]);

  // 卡片显示内容
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

  // 获取数据概览
  useEffect(() => {
    showCardData().then(res => {
      setData(res.data.data)
    }, err => {
      return message.error(err.response.data.message);
    })
  }, [])

  // 获取地图数据
  useEffect(() => {
    showDataMap().then(res => {
      interface ResData {
        Lon: number,
        Lat: number,
      }
      interface Res {
        Doing: Array<ResData>,
        Finished: Array<ResData>,
      }
      const {Doing, Finished} = res.data.data as Res;
      const obj: map[] = [];
      Doing.forEach(item => {
        obj.push({
          latitude: item.Lat,
          longitude: item.Lon,
          status: "doing",
        })
      })
      Finished.forEach(item => {
        obj.push({
          latitude: item.Lat,
          longitude: item.Lon,
          status: "finished",
        })
      })
      obj.push(
            {
              longitude:  29.7302,  //经度
              latitude:  150, // 纬度
              status: "finished"
            },
      )
      setMapList(obj);
    }, err => {
      return message.error(err.response.data.message);
    })
  }, [])

  function MyMap(props: mapProps) {
    let {mapList} = props
    interface Coordinate {  // 坐标
      ing: number,
      lat: number,
    }
    const [center, setCenter] = useState<Coordinate>({
      ing: 106.5907,
      lat: 29.7320,
    }); // 地图中心点

    useEffect(() => { // 已返回任一点为中心点
      if (mapList[0]) {
        setCenter({
          ing: mapList[0].longitude,
          lat: mapList[0].latitude,
        })
      }
    }, [mapList])

    useEffect(() => {
      let map = new BMapGL.Map('mymap');
      map.centerAndZoom(new BMapGL.Point(center.ing, center.lat), 16);
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

    }, [center.ing, center.lat, mapList])

    return (
        <div id='mymap' style={{ "width": "100%", "height": "100%", "textAlign": "center", "backgroundColor": "#f3f3f3", "boxShadow": "0px 0px 10px rgba(0,0,0,0.2)" , zIndex:"99" }}>
        </div>
    )
  }

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
