import React, {useEffect, useState} from 'react'
import {Manage} from "../../components";
import {getStationList, searchStation} from "../../api/roleManageApi";
import {message} from "antd";
import {RoleListItem} from "../../utils/interface";

export default function Station() {
    const [stationList, setStationList] = useState<RoleListItem[]>([]);
    const [keyword, setKeyword] = useState<string>("");

    // 请求站长人员列表
    useEffect(() => {
        getStationList().then(res => {
            const list :RoleListItem[] = res.data.data.stationList;
            list.forEach(item => {
                item.key = item.Key;
            })
            setStationList(list);
        }, err => {
            return message.error(err.response.data.message);
        });
    }, [])

    // 搜索
    useEffect(() => {
        if (keyword === "" || !keyword) return;
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

    return <Manage judgeRole={true} list={stationList} searchFn={search} />
}
