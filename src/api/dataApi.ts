import {myAxios} from "./myAxios";

export const showCardData = () => {
    return myAxios("admin/showDataCard");
}