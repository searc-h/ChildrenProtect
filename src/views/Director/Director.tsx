import React, {useEffect, useState} from 'react'
import { Manage } from "../../components";
import {RoleListItem} from "../../utils/interface";
import {getDirectorList, searchDirector} from "../../api/roleManageApi";
import {message} from "antd";

export default function Director() {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [list, setList] = useState<RoleListItem[]>([]);
    const [keyword, setKeyword] = useState<string>("");

    function search(keyWord: string) {
        setKeyword(keyWord);
    }

    // 请求列表
    useEffect(() => {
        getDirectorList(currentPage).then(res => {
            setList(res.data.data.stationList);
        }, err => {
            return message.error(err.response.data.message);
        })
    }, [currentPage])

    // 检索
    useEffect(() => {
        if (keyword === "") return;
        searchDirector(keyword).then(res => {
            setList(res.data.message.data.directorList);
        }, err => {
            return message.error(err.response.data.message);
        })
    }, [keyword])

    return <Manage judgeRole={false} list={list} searchFn={search}/>
}
