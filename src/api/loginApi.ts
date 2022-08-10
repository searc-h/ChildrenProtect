import {myAxios} from "./myAxios";

export const login = (username: string, password: string) => {
    const data = new FormData();
    data.append("username", username);
    data.append("password", password);
    return myAxios.post("/admin/login", data);
}

// 找回密码-获取验证码
export const getVerificationCode = (phone: string) => {
    const data = new FormData();
    data.append("phone", phone);
    return myAxios.post("/admin/password/getCode", data);
}

// 找回密码-验证码是否匹配
export const verifyCode = (phone: string, code: string) => {
    const data = new FormData();
    data.append("phone", phone);
    data.append("code", code);
    return myAxios.post("/admin/password/sendCode", data);
}