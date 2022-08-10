import {myAxios} from "./myAxios";

export const login = (username: string, password: string) => {
    const data = new FormData();
    data.append("username", username);
    data.append("password", password);
    return myAxios.post("/admin/login", data);
}