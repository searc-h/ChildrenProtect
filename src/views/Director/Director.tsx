import React, {useEffect, useState} from 'react'
import { Manage } from "../../components";
import {RoleListItem} from "../../utils/interface";
import {getDirectorList, searchDirector} from "../../api/roleManageApi";
import {message} from "antd";

export default function Director() {
    const [list, setList] = useState<RoleListItem[]>([]);
    const [keyword, setKeyword] = useState<string>("");

    function search(keyWord: string) {
        setKeyword(keyWord);
    }

    // 更新列表
    function updateList(){
        getDirectorList().then(res => {
            const list :RoleListItem[] = res.data.stationList;
            list.forEach(item => {
                item.key = item.Key;
            })
            setList(list);
        }, err => {
            return message.error(err.response.message);
        })
    }

    // 请求列表
    useEffect(() => {
        updateList()
    }, [])

    // 检索
    useEffect(() => {
        if (keyword === "" || !keyword) return;
        searchDirector(keyword).then(res => {
            setList(res.data.message.data.directorList);
        }, err => {
            return message.error(err.response.data.message);
        })
    }, [keyword])

    return <Manage judgeRole={false} list={list} updateList={updateList} searchFn={search}/>
}
