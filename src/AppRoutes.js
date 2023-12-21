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
import Register from "./Pages/LoginPage/Register";
import { useSelector, useDispatch } from 'react-redux';
import { setData } from "./redux/action/LoginAction";

import {Userdetails} from "./AllApi/Integrateapi"
export default function AppRoutes() {
  const dispatch=useDispatch()

  const refreshdata = useSelector(state => state.RefreshReducer.data)
console.log(refreshdata,"refreshdata");
  useEffect(()=>{
    const User_details=async()=>{
      try{
   let user_data=await   Userdetails("MMMlqdw3gbivck15")
   dispatch(setData(user_data.data.data))
      }catch(err){
        console.log(err);
      }
    }
    User_details()
     
        },[refreshdata])
const navigate=useNavigate()
  return (
    <div>
    <Topbar/>
    <div className="maincontant">
      <Routes>
     
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/" element={<Home />} />
          
            <Route path="/profile" element={<Profile />}/>  
            <Route path="/profile/:post_id" element={<Profile />}/>  
            <Route path="/post" element={<Post />}/>  
            <Route path="/message" element={<Message />}/>  
            <Route path="/location" element={<Location />}/>  
            <Route path="/chats" element={<ChatMessage />}/>  
       
      </Routes>
    </div>
    </div>
  )
}
