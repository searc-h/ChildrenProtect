import { lazy,Suspense } from 'react';

import { BrowserRouter, Navigate, Route, Routes  } from "react-router-dom"; 
import './App.css';
// import 'antd/dist/antd.css';

import Loading from './components/Loading/Loading';
import Auth from './components/auth/Auth' //不知道为啥这里 通过./component/index不能引入

const Home = lazy(()=>import('./pages/home/Home'))
const Login = lazy(()=>import('./pages/login/Login'))
const GetBack = lazy(()=>import('./pages/geback/GetBack'))
const SetPassword = lazy(()=>import('./pages/setpassword/SetPassword'))
function App() {


    return (
        <BrowserRouter>
            <Suspense fallback={<Loading/>}>
                <Routes>
                    {/* 这里的加了鉴权组件，把需要鉴权后才展示的组件放进去 */}
                    <Route path='/home/*' element={
                        <Auth>
                            <Home/>
                        </Auth>}
                    />
                    <Route path={"/login"} element={<Login />} />
                    <Route path='/getback' element={<GetBack/>}/>
                    <Route path='/setpassword' element={<SetPassword/>}/>
                    <Route path='/' element={<Navigate to={'/home'}/>}/>

                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}

export default App;
