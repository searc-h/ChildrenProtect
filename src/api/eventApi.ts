import {myAxios} from "./myAxios";

// 获取全部事件
export const getList = (page: number) => {
    const data = new FormData();
    data.append("current", page + '');
    return myAxios.post("/event/list", data)
}

// 检索事件
export const searchEvent = (keyword: string) => {
    const data = new FormData();
    data.append("keyword", keyword);
    return myAxios.post("/event/search", data);
}

