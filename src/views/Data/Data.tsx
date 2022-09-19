import React, {useEffect, useState} from 'react'
import './Data.less'
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
      title: '事件报告数量',
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
      setData(res.data)
    }, err => {
      return message.error(err.message);
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
      const {Doing, Finished} = res.data as Res;
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
      
      setMapList(obj);
    }, err => {
      return message.error(err.message);
    })
  }, [])

  function MyMap(props: mapProps) {
    let {mapList} = props
    

    interface Coordinate {  // 坐标
      ing: number,
      lat: number,
      status:string
    }
    const [center, setCenter] = useState<Coordinate>({
      ing: 106.5507,
      lat: 29.57320,
      status:"doing"
    }); // 地图中心点

    useEffect(() => { // 已返回任一点为中心点
      if (mapList[0]) {
        setCenter({
          ing: mapList[0].longitude,
          lat: mapList[0].latitude,
          status:mapList[0].status
        })
      }
    }, [mapList])

    useEffect(() => {

      // console.log(center)

      let map = new BMapGL.Map('mymap');
      let centerPoint = new BMapGL.Point(center.ing, center.lat)
      map.centerAndZoom(centerPoint, 6);
      map.enableScrollWheelZoom();

      let zoomCtrl = new BMapGL.ZoomControl();  // 添加缩放控件
      map.addControl(zoomCtrl);

      let finishedIcon = new BMapGL.Icon(finished, new BMapGL.Size(45, 50));
      let doingIcon = new BMapGL.Icon(doing, new BMapGL.Size(45, 54));

      mapList.forEach((marker)=>{
        // console.log(marker)
        let {longitude  , latitude} = marker
        let Pointer :any
        if(marker.status === 'finished')
        {
          // 创建点标记
          Pointer = new BMapGL.Marker(new BMapGL.Point(+longitude,+latitude ) ,{
            icon: finishedIcon
          })
        }else{
          // 创建点标记
          Pointer = new BMapGL.Marker(new BMapGL.Point(+longitude ,+latitude ) ,{
            icon: doingIcon
          })
        }

        map.addOverlay(Pointer)
      })

    }, [center, mapList])

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
