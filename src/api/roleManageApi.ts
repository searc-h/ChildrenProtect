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

// 添加 站长/儿童主任
export const add = (person: Role, role: "station" | "director") => {
    const data = new FormData();
    data.append("name", person.name);
    data.append("phone", person.phone);
    data.append("province", person.province);
    data.append("city", person.city);
    data.append("district", person.district);
    data.append("street", person.street);
    return myAxios.post('/' + role + "/add", data)
}

// 显示儿童主任列表
export const getDirectorList = (page: number = 1) => {
    const data = new FormData();
    data.append("current", page + '');
    return myAxios("/director/list", {
        data,
    })
}

// 检索儿童主任
export const searchDirector = (keyword: string) => {
    const data = new FormData();
    data.append("keyword", keyword);
    return myAxios.post("/director/search", data)
}