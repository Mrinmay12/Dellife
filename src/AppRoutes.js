import React, { Component, useMemo, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
  Navigate,
  useNavigate,
} from "react-router-dom"; 
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import Topbar from "./Navbar/Topbar";
import Post from "./Pages/Post";
import Message from "./Pages/Message";
import Location from "./Pages/Location";
import "./Style.css"
import Login from "./Pages/LoginPage/Login";
import ChatMessage from "./Component/MessagePage/ChatMessage ";
export default function AppRoutes() {
const navigate=useNavigate()
  return (
    <div>
    <Topbar/>
    <div className="maincontant">
      <Routes>
     
            <Route path="/login" element={<Login/>} />
            <Route path="/" element={<Home />} />
          
            <Route path="/profile" element={<Profile />}/>  
            <Route path="/post" element={<Post />}/>  
            <Route path="/message" element={<Message />}/>  
            <Route path="/location" element={<Location />}/>  
            <Route path="/chats" element={<ChatMessage />}/>  
       
      </Routes>
    </div>
    </div>
  )
}
