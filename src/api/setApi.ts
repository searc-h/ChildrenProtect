import {myAxios} from "./myAxios";

// 管理员获取验证码
export const verificationCode = (id: string, phone: string) => {
    const data = new FormData();
    data.append("id", id);
    data.append("newPhone", phone);
    return myAxios.post("/admin/getCode", data)
}

// 修改手机号
export const modifyPhone = (id: string, phone: string, code: string) => {
    const data = new FormData();
    data.append("id", id);
    data.append("newPhone", phone);
    data.append("code", code);
    return myAxios.post("/admin/getCode", data)
}

// 修改密码
export const modifyPwd = (id: string, pwd: string) => {
    const data = new FormData();
    data.append("id", id);
    data.append("newPassword", pwd);
    return myAxios.post("/admin/getCode", data)
}