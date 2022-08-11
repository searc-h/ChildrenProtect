import {myAxios} from "./myAxios";
import {Role} from "../utils/interface";

// 显示站长人员列表
export const getStationList = (current: number) => {
    const data = new FormData();
    data.append("current", current + '');
    return myAxios("/station/list", {
        data,
    });
}

// 检索站长
export const searchStation = (keyword: string) => {
    const data = new FormData();
    data.append("keyword", keyword);
    return myAxios.post("/station/search", data)
}

// 添加站长
export const addStation = (person: Role) => {
    const data = new FormData();
    data.append("name", person.name);
    data.append("phone", person.phone);
    data.append("province", person.province);
    data.append("city", person.city);
    data.append("district", person.district);
    data.append("street", person.street);
    return myAxios.post("/station/add", data)
}