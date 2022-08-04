import {MainLayout} from "../../layouts/MainLayout";
import {lazy, Suspense} from 'react'
import {Route, Routes ,Navigate , Outlet} from "react-router-dom";
import Loading from "../../components/Loading/Loading";
const Set = lazy(()=>import('../../views/Set/Set'))
const Data = lazy(()=>import('../../views/Data/Data'))
const Director = lazy(()=>import('../../views/Director/Director')) 
const Event = lazy(()=>import('../../views/Event/Event'))
const Station = lazy(()=>import('../../views/Station/Station'))
const Detail = lazy(()=>import('../../views/Detail/Detail'))
export default  function Home(){
    return  (
        <MainLayout>
            <Suspense fallback={<Loading/>}>
                <Routes>
                    
                    {/* 由于是/home的子路由，所以不需要写/data... */}
                    <Route path={"data"} element={<Data/>} />
                    <Route path="manage" element={<Outlet/>}>
                        <Route path={"station"} element={<Station/>} />
                        <Route path={"director"} element={<Director/>} />
                    </Route>
                    <Route path={"event"} element={<Event/>} />
                    {/* 这里不能把detail放进event的子路由中 */}
                    <Route path="detail" element={<Detail/>} />
                    <Route path={"set"} element={<Set />} />
                    <Route path={""} element={<Navigate to='/home/data'/>} />
                </Routes>
            </Suspense>
            
            <Outlet></Outlet>
        </MainLayout>
    )
}