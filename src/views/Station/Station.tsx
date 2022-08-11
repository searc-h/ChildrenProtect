import React, {useEffect, useState} from 'react'
import {Manage} from "../../components";
import {getStationList, searchStation} from "../../api/roleManageApi";
import {message} from "antd";
import {RoleListItem} from "../../utils/interface";

export default function Station() {
    const [stationList, setStationList] = useState<RoleListItem[]>([]);
    const [requestPage, setRequestPage] = useState<number>(1);  // 请求页
    const [keyword, setKeyword] = useState<string>("");

    // 请求站长人员列表
    useEffect(() => {
        getStationList(requestPage).then(res => {
            const list :RoleListItem[] = res.data.data.stationList;
            list.map(item => {  // add key prop
                item = {
                    ...item,
                    key: item.Number,
                }
                return item;
            })
            setStationList(res.data.data.stationList);
        }, err => {
            return message.error(err.response.data.message);
        });
    }, [requestPage])

    // 搜索
    useEffect(() => {
        if (keyword === "") {
            return;
        }
        searchStation(keyword).then(res => {
            console.log(res)
            setStationList(res.data.message.data.directorList);
        }, err => {
            return message.error(err.response.data.message);
        })
    }, [keyword])

    // 作为回调传给子组件获取搜索词
    function search(keyWord: string) {
        setKeyword(keyWord);
    }

    return <Manage role={true} list={stationList} searchFn={search} />
}
