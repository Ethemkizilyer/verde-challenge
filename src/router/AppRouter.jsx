import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import AddPost from '../pages/AddPost'
import Home from '../pages/Home'
import Detail from "../pages/Detail";


const AppRouter = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/newPost" element={<AddPost />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default AppRouter