import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import {Home, Login} from "./pages";
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path={"/home/*"} element={<Home />} />
              <Route path={"/login"} element={<Login />} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
