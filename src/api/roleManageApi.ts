import {myAxios} from "./myAxios";
import {Role, RoleListItem} from "../utils/interface";

// 显示站长人员列表
export const getStationList = () => {
    return myAxios("/station/list");
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
    // 如果有社区
    if(person.community){
        data.append("community", person.community);
    }
    return myAxios.post('/' + role + "/add", data)
}

// 移除 站长/儿童主任
export const removeRole = (id:string, role: "station" | "director") => {
    const data = new FormData();
    data.append("id", id);
    return myAxios.post('/' + role + "/remove", data)
}

// 显示儿童主任列表
export const getDirectorList = () => {
    return myAxios("/director/list");
}

// 检索儿童主任
export const searchDirector = (keyword: string) => {
    const data = new FormData();
    data.append("keyword", keyword);
    return myAxios.post("/director/search", data)
}

// 修改 站长/主任
export const modifyInfo = (id: string, person: RoleListItem, role: "station" | "director") => {
    const data = new FormData();
    data.append("id", id);
    data.append("name", person.Name);
    data.append("phone", person.Phone);
    data.append("province", "重庆市");
    data.append("city", "重庆市");
    data.append("district", person.District);
    data.append("street", person.Street);
    return myAxios.post('/' + role + "/modify", data)
}