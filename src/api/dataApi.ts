import {myAxios} from "./myAxios";

// 数据概览
export const showCardData = () => {
    return myAxios("admin/showDataCard");
}

// 地图数据
export const showDataMap = () => {
    return myAxios("admin/showDataMap");
}