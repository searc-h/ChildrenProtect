import axios from "axios";
import getToken from "../utils/getToken";

export const myAxios = axios.create({
    baseURL: "http://124.223.99.4:8080",
    timeout: 2000,
    method: "POST",  // 默认POST
})

myAxios.interceptors.request.use((config) => {
        const token = getToken();
        if (token && config.headers) {
            config.headers.token = token;
        }
        return config;
    }, (err) => {
        return Promise.reject((err));
    }
)