import { useLocation, useNavigate } from 'react-router-dom'
import { RightOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import './Detail.css'
import { useRef, useEffect } from 'react'
import marker from '../../assets/icons/marker.png'

interface PList {
  name: string,
  sex: string,
  id: string
}
interface listProps {
  List: PList[]
}
function personList(props: listProps) {
  let { List } = props
  return (
    List.map((list) => {
      return (
        <div className="list" key={list.id} style={{ display: 'flex', width: '300px', justifyContent: "space-between" }}>
          <div className="name">{list.name}</div>
          <div className="sex">{list.sex}</div>
          <div className="id">{list.id}</div>
        </div>
      )
    })
  )
}

interface map {
  longitude: string | number   //经度
  latitude: string | number // 纬度
  status?:string
}
interface mapProps {
  mapList: map[],
  mapRef:any
}
function MyMap(props: mapProps) {

  let { mapList ,mapRef} = props
  useEffect(() => {
    let map = new BMapGL.Map(mapRef.current);
    map.centerAndZoom(new BMapGL.Point(106.5907, 29.7320), 16);
    map.enableScrollWheelZoom();

    let markerIcon = new BMapGL.Icon(marker, new BMapGL.Size(52, 26));

    mapList.forEach((marker) => {
      let { longitude, latitude } = marker
      let Pointer: any
      // 创建点标记
      Pointer = new BMapGL.Marker(new BMapGL.Point(+latitude, +longitude),{
        icon:markerIcon
      })
      map.addOverlay(Pointer)
    })

  }, [mapList])

  return (
    <div id='mymap' style={{ "width": "100%", "height": "100%", "textAlign": "center", "boxShadow": "0px 0px 10px rgba(0,0,0,0.2)", zIndex: "99" }}>
    </div>
  )
}

export default function Detail() {

  let location = useLocation()
  let state = location.state as any
  let id: number | string = state.id
  console.log(id)

  let map1 =  useRef(null)
  let map2 = useRef(null)

  let childList: PList[] = [
    {
      name: "张勇",
      sex: "男",
      id: "521101200010092837"
    },
    {
      name: "王丽",
      sex: "女",
      id: "521104200010092837"
    }
  ]
  let adultList: PList[] = [
    {
      name: "张超勇",
      sex: "男",
      id: "521101200010092837"
    },
    {
      name: "王美丽",
      sex: "女",
      id: "521104200010092837"
    }
  ]

  let mapListOld: map[] = [
    {
      longitude: "106.5907",
      latitude: "29.7320"
    }
  ]
  let mapListNew:map[] = [
    {
      longitude: "106.5908",
      latitude: "29.7330"
    }
  ]

  let navigate = useNavigate()
  let goBack = () => {
    navigate(-1)
  }
  return (
    <>
      <div className='detail-outer'>
        <div className="title"> <span className='back' onClick={goBack}>事件管理</span> <span ><RightOutlined /></span> 详情</div>
        <div className="details">
          <div className="upMes">
            <div className="title">
              上传信息
            </div>
            <div className="content">
              <div className="line1">
                <div className="left">
                  事件类型：<span >发现未成年人被组织乞讨</span>
                  <div className="right">
                    上报时间：<span>2022-07-19 11:30:32</span>
                  </div>
                </div>
              </div>
              <div className="line2">
                <div className="left">
                  事件描述：<span style={{ "textDecoration": "underline" }}>下午2点左右，在宝圣湖小学大门外100米处，一个年纪在15岁左右的未成年人在乞讨，希望可以派工作人员前往了解情况一个年纪在15岁左右的未成年人在乞讨，希望可以派工作人员前往了解情况一个年纪在15岁左右的未成年人在乞讨，希望可以派工作人员前往了解情况一个年纪在15岁左右的未成年人在乞讨，希望可以派工作人员前往了解情况一个年纪在15岁左右的未成年人在乞讨，希望可以派工作人员前往了解情况</span>
                </div>
              </div>
              <div className="line3">
                现场视频：<span><Button type='primary' ><span style={{ color: '#fff' }}>查看视频</span></Button></span>
              </div>
              <div className="line4">
                现场照片：<span><span><Button type='primary'><span style={{ color: '#fff' }}>查看照片</span></Button></span></span>
              </div>
              <div className="line5">
                事件发生位置： <span>渝北区宝圣湖小学校</span>
              </div>

              <div className="mapSite1 mapSite" ref={map1}>
                <MyMap mapList={mapListOld} mapRef={map1}/>
              </div>
            </div>
          </div>
          <div className="dealMes">
            <div className="title">
              处置信息
            </div>
            <div className="content">
              <div className="line">
                <span className="title">事件经过：</span><span>下午两点左右，在宝圣湖小学大门外100米处，一个年级在15岁左右的未成年人在乞讨</span>
              </div>
              <div className="line">
                <span className="title">设计到的未成年人：</span><span>{personList({ List: childList })}</span>
              </div>
              <div className="line">
                <span className="title">涉及到的成年人：</span><span>{personList({ List: adultList })}</span>
              </div>
              <div className="line">
                <span className="title">修订后的位置：</span><span>渝北区宝圣湖小学校</span>
              </div>
              <div className="mapSite2 mapSite" ref={map2}>
                <MyMap mapList={mapListNew} mapRef={map2}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
