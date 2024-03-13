import React, { Component, useMemo, useState, useEffect, useRef } from "react";
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
import OtherUserProfile from "./Pages/OtherUserProfile";
import { useSelector, useDispatch } from 'react-redux';
import { setData } from "./redux/action/LoginAction";
import { Userdetails, verifytoken } from "./AllApi/Integrateapi"
import ErrorPage from "./Pages/ErrorPage";
//socket
import { io } from "socket.io-client"
export default function AppRoutes() {
  const dispatch = useDispatch()
  const socket = useRef();
  const refreshdata = useSelector(state => state.RefreshReducer.data)
  const[appverify,setAppverify]=useState(false)

  const[user_id,setUser_id]=useState("")

  useEffect(() => {
    const User_details = async () => {
      try {
        let user_data = await Userdetails(user_id)
        dispatch(setData(user_data.data.data))
      } catch (err) {
        console.log(err);
      }
    }
    if(user_id){
    User_details()
    }

  }, [refreshdata,appverify,user_id])

  const[token,setToken]=useState(localStorage.getItem('token'))

  useEffect(() => {
    const User_Token = async () => {
      try {
            let res= await verifytoken(token)
         if(res){
          setUser_id(res.data.user_id)
          setAppverify(true)
          // navigate("/")
         }
      } catch (err) {
        
        localStorage.removeItem('user_id');
        localStorage.removeItem("token")
        setToken("")
      
          // navigate("/login");
  
          // navigate("/register");
        
      }
    }
    User_Token()

  }, [token,user_id])
  const navigate = useNavigate()

  // useEffect(() => {
  //   if(user_id!==""){
  //   socket.current = io(process.env.REACT_APP_SOCKET_URL);
  //   socket.current.emit("add-user",user_id);
  // }
  
  // }, [user_id]);
  
  return (
    <div>
     {token ?(<Topbar /> ):""} 
      <div className="maincontant">
        <Routes>
          {token  ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/otherprofile/:post_id" element={<OtherUserProfile />} />
              <Route path="/post" element={<Post />} />
              <Route path="/message/:id" element={<Message socket={socket} />} />
              <Route path="/message" element={<Message socket={socket} />} />
              <Route path="/location" element={<Location />} />
              <Route path="/chats" element={<ChatMessage socket={socket} messageid={"hffhhghghg"}/>} />
              <Route path="*" element={<ErrorPage />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Login setToken={setToken}/>} />
              <Route path="/register" element={<Register setToken={setToken}/>} />
              <Route path="*" element={<ErrorPage />} />


            </>
          )}




        </Routes>
      </div>
    </div>
  )
}
