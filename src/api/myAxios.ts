import axios from "axios";
import getToken from "../utils/getToken";

export const myAxios = axios.create({
    baseURL: "http://124.223.99.4:8080",
    // timeout: 2000,
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

// 添加响应拦截器  返回的直接就是data里面的内容
myAxios.interceptors.response.use(
	(response) => {
		// 对响应数据做点什么
		const res = response.data

        if(res.code === 200)
            return response.data
        else {
            alert('网络繁忙')
        }
	},


	(error) => {
        let errorMes = error.response.data
		// 对响应错误做点什么
		throw(new Error(errorMes.message))
	}
);