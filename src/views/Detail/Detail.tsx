import { useLocation, useNavigate } from 'react-router-dom'
import { RightOutlined } from '@ant-design/icons'
import {Button, message,Modal} from 'antd'
import './Detail.less'
import {useRef, useEffect, useState} from 'react'
import {getDetail} from "../../api/eventApi";

interface PList {
  Name: string,
  Sex: string,
  Id: string
}
interface listProps {
  List: PList[]
}
const eventTypeMap = {
    0: "非强制事件",
    1: "未成年人乞讨",
    2: "未成年人犯罪",
    3: "未成年人被遗弃",
    4: "未成年人隐私部位损伤",
    5: "未成年人伤残、死亡",
    6: "未成年人来源不明",
    7: "未成年人怀孕、流产",
    8: "其他非强制报告事件",
}
type EventTypeIndex = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8';
interface PostInfo {
    EventType: EventTypeIndex,  // 事件类型
    PostTime: string,   // 上报时间
    Describes: string,    // 事件描述,
    PostTimeString :string, //上报时间
    LocalSite:string, //位置
    Video?: string,
    Image?: string,
    Lat: number,
    Lon: number,
}
interface ResInfo {
    BasicResolve: {
        Status: 0 | 1,  // 处置中/未完成
        Process: string,    // 事件经过
        EventType: EventTypeIndex,
        Organization: string,
        XlocalSite:string
    }
    ChildList: Array<PList>,  // 涉及到未成年人
    AdultList: Array<PList>,  // 涉及到成年人
}
function personList(props: listProps) {
  let { List } = props
  return (
    List.map((list) => {
      return (
        <div className="list" key={list.Id} style={{ display: 'flex', width: '300px', justifyContent: "space-between" }}>
          <div className="name">{list.Name}</div>
          <div className="sex">{list.Sex}</div>
          <div className="id">{list.Id}</div>
        </div>
      )
    })
  )
}

interface map {
  lon: string | number   //经度
  lat: string | number // 纬度
  status?:string
}
interface mapProps {
  mapList: map[],
  mapRef:any
}

function MyMap(props: mapProps) {
  let { mapList ,mapRef} = props
  let {lon , lat} = mapList[0]
  useEffect(() => {
    let map = new BMapGL.Map(mapRef.current);
    let pointer = new BMapGL.Point(+lon, +lat)
    let Marker = new BMapGL.Marker(pointer)
    map.addOverlay(Marker)
    map.centerAndZoom(pointer, 16);

    let scaleCtrl = new BMapGL.ScaleControl();  // 添加比例尺控件
    map.addControl(scaleCtrl);
    let zoomCtrl = new BMapGL.ZoomControl();  // 添加缩放控件
    map.addControl(zoomCtrl);

  }, [mapList, mapRef])

  return (
    <div id='mymap' style={{ "width": "100%", "height": "100%", "textAlign": "center", "boxShadow": "0px 0px 10px rgba(0,0,0,0.2)", zIndex: "99" }}>
    </div>
  )
}

export default function Detail() {
  const [postInfo, setPostInfo] = useState<PostInfo>();   // 上传信息
  const [resInfo, setResInfo] = useState<ResInfo>();   // 处置信息

  let location = useLocation()
  let state = location.state as any
  let id: string = state.id

  let map1 =  useRef(null)
  let map2 = useRef(null)

  let [mapListOld , setMapListOld] = useState<map[]>([
    {
      lon:"",
      lat:"",
    }
  ])
  let [mapListNew,  setMapListNew] = useState<map[]>([
    {
      lon:"",
      lat:"",
    }
  ])

  let navigate = useNavigate()
  let goBack = () => {
    navigate(-1)
  }

  // 请求事件详情
  useEffect(() => {
    if (!id) return message.warn("事件ID获取失败");
    getDetail(id).then(res => {
        const {PostInfo, ResolveInfo} = res.data;
        let maplist = [{lon:PostInfo.Lon  , lat:PostInfo.Lat}]
        setMapListOld(maplist)
        if(ResolveInfo.BasicResolve.Xlat && ResolveInfo.BasicResolve.Xlon){
          maplist = [{lon:ResolveInfo.BasicResolve.Xlon , lat:ResolveInfo.BasicResolve.Xlat}]
        }
        setMapListNew(maplist)
        
        setPostInfo(PostInfo);
        setResInfo(ResolveInfo);
    }, err => {
        return message.error(err.message);
    })
  }, [id])

  let [modelShow , setModelShow] = useState<boolean>(false)
  const handle = () => setModelShow(false)

  function resolveModal(){
    if(postInfo?.Image){
      return postInfo?.Image?.split(",").map((item)=>{
        return <img src={"http://"+item} key={item}/>
      })
    }
    else return <span>没有图片</span>
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
                  事件类型：<span >{eventTypeMap[postInfo?.EventType || '0']}</span>
                  <div className="right">
                    上报时间：<span>{postInfo?.PostTimeString}</span>
                  </div>
                </div>
              </div>
              <div className="line2">
                <div className="left">
                  事件描述：<span style={{ "textDecoration": "underline" }}>
                    {postInfo?.Describes}
                </span>
                </div>
              </div>
              <div className="line3">
                现场视频：<span><Button type='primary' ><span style={{ color: '#fff' }}>查看视频</span></Button></span>
              </div>
              <div className="line4">
                现场照片：<span><span><Button type='primary'><span onClick={()=>{setModelShow(true)}} style={{ color: '#fff' }}>查看照片</span></Button></span></span>
              </div>
              <div className="line5">
                事件发生位置: {postInfo?.LocalSite} <span />
              </div>

              <div className="mapSite1 mapSite" ref={map1}>
                <MyMap mapList={mapListOld} mapRef={map1}/>
              </div>
            </div>
          </div>
          {resInfo?.BasicResolve.Status === 1 && <div className="dealMes">
              <div className="title">
                  处置信息
              </div>
              <div className="content">
                  <div className="line">
                      <span className="title">事件经过：</span><span>{resInfo?.BasicResolve.Process}</span>
                  </div>
                  <div className="line">
                      <span className="title">涉及到的未成年人：</span><span>{personList({ List: resInfo?.ChildList || [] })}</span>
                  </div>
                  <div className="line">
                      <span className="title">涉及到的成年人：</span><span>{personList({ List: resInfo?.AdultList || [] })}</span>
                  </div>
                  <div className="line">
                      <span className="title">修订后的位置：</span>
                      <span>{resInfo?.BasicResolve.XlocalSite}</span>
                  </div>
                  <div className="mapSite2 mapSite" ref={map2}>
                      <MyMap mapList={mapListNew} mapRef={map2}/>
                  </div>
              </div>
          </div>}
        </div>
      </div>
        <Modal
            centered
            visible={modelShow}
            title={"查看图片"}
            onOk={handle}
            onCancel={handle}
        >
          <p style={{"width":"100%" , "overflowY":"scroll"}}>
            {
              resolveModal()
            }
          </p>
        </Modal>
    </>
  )
}
