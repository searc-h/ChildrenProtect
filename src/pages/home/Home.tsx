import {MainLayout} from "../../layouts/MainLayout";
import {Route, Routes} from "react-router-dom";
import {Set} from "../../components";

export const Home = () => {
    return  <MainLayout>
        <Routes>
            <Route path={"/data"} element={<h1>数据概览组件</h1>} />
            <Route path={"/station"} element={<h1>站长管理</h1>} />
            <Route path={"/director"} element={<h1>儿童主任管理</h1>} />
            <Route path={"/event"} element={<h1>事件管理</h1>} />
            <Route path={"/set"} element={<Set />} />
        </Routes>
    </MainLayout>
}