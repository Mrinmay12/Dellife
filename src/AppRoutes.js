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
import { setUserLocationData} from './redux/action/UserLocationAction'
import { GetJob, Userdetails, UserLocation, verifytoken } from "./AllApi/Integrateapi"
import ErrorPage from "./Pages/ErrorPage";
//socket
import { io } from "socket.io-client"
import Perticularpost from "./Pages/Perticularpost";
import WebSocket from "./SocketServer/WebSocket";
import ForgetPassword from "./Pages/LoginPage/ForgetPassword";
import SearchPage from "./Pages/SearchPage";
import LandingPage from "./Component/Landing/LandingPage";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import { setJobData } from "./redux/action/JobAction";
import TermsPage from "./Pages/TermsPage";
export default function AppRoutes() {
  const dispatch = useDispatch()
  const location = useLocation();
  const socket = useRef();
  const refreshdata = useSelector(state => state.RefreshReducer.data)
  const[appverify,setAppverify]=useState(false)  
  const { pathname } = location;
  const splitLocation = pathname.split("/");
  const[user_id,setUser_id]=useState("")
  const[message_id,setMessage_id]=useState("")
   const[Landing_show,setLanding_show]=useState(true)
   const[token,setToken]=useState(localStorage.getItem('token'))
   const [locationName1, setLocationName1] = useState("");
   console.log(locationName1,'locationName1');
   
  useEffect(() => {
    const User_details = async () => {
      try {
        
        let user_data = await Userdetails(user_id,locationName1)
        dispatch(setData(user_data.data.data))
        setMessage_id(user_data.data.data.message_id)
        setTimeout(()=>{
          setLanding_show(false)
           },3000)
      } catch (err) {
        window.location.reload()
        setTimeout(()=>{
          setLanding_show(false)
           },3000)
        // localStorage.removeItem('user_id');
        // localStorage.removeItem("token")
    
        console.log(err);
      }
    }
    if(user_id && token){
      if(splitLocation[1]!=='Privacy-policy'||splitLocation[1]!=='terms-and-conditions'){
    User_details()
      }
    }

  // }, [refreshdata,appverify,user_id])
  }, [appverify,user_id,locationName1])

useEffect(()=>{
  if(!token){
    setTimeout(()=>{
      setLanding_show(false)
       },3000)
  }
},[])
// console.log(token,"this is token");

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
        // setToken("")
      
          // navigate("/login");
  
          // navigate("/register");
        
      }
    }
    if(splitLocation[1]!=='Privacy-policy'||splitLocation[1]!=='terms-and-conditions'){
    User_Token()
    }
  }, [token,user_id,refreshdata])
  const navigate = useNavigate()

  // useEffect(() => {
  //   if(user_id!==""){
  //   socket.current = io(process.env.REACT_APP_SOCKET_URL);
  //   socket.current.emit("add-user",user_id);
  // }
  
  // }, [user_id]);
  

  //Location get geolocation

  function useCoordinates() {
    const [coordinate, setCoordinate] = useState({
      lat: 0,
      long: 0
    });
    const [locationName, setLocationName] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
      const successCallback = (position) => {
        setCoordinate({
          lat: position.coords.latitude,
          long: position.coords.longitude
        });
      };

      const errorCallback = (error) => {
        setError(error);
      };

      // Prompt for geolocation access when the component mounts
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

      // Watch for changes in geolocation
      const geoId = window.navigator.geolocation.watchPosition(successCallback, errorCallback);

      return () => {
        navigator.geolocation.clearWatch(geoId);
      };
    }, []);

    useEffect(() => {
      // Fetch location name using reverse geocoding if coordinates are available
      if (coordinate.lat !== 0 && coordinate.long !== 0) {
        const fetchData = async () => {
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coordinate.lat}&lon=${coordinate.long}&zoom=18&addressdetails=1`
            );
            const data = await response.json();
            if (data) {
              // setLocationName(data.display_name);
              setLocationName(data.address.suburb||data.address.address);
              setLocationName1(data.address.suburb ||data.address.address);
              
            }
          } catch (error) {
            console.error("Error fetching location name:", error);
          }
        };

        fetchData();
      }
    }, [coordinate]);

    return { coordinate, locationName, error };
  }
  const { coordinate, locationName, error } = useCoordinates();


  // console.log(coordinate.lat,coordinate.long,locationName,"mrinmay1")

  //Near user geolocation & socket Io
  const[location_data,setlocation_data]=useState({})
//   useEffect(()=>{
//     if(location_data && message_id){
//         socket.current = io("http://localhost:9001");
//         socket.current.emit("userLocation", location_data);
//     }
// },[location_data,message_id])


    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const userLocation = { latitude: latitude,
                    longitude:longitude,locationName:locationName};
                userLocation.user_id = message_id;
                setlocation_data(userLocation)
               dispatch(setUserLocationData(userLocation))
               
            },
            (error) => {
                console.error("Error getting user location:", error);
            }
        );
    }, [message_id,locationName]);


// console.log(location_data,"mrinmay2")
  useEffect(()=>{
const Location=async()=>{
  let json=JSON.stringify({
    location:locationName,
    latitude:coordinate.lat,
    longitude:coordinate.long,
    user_id:user_id,
  })
let res=await UserLocation(user_id,json)
if(res){
  console.log(res.data.message);
}
}
if (user_id) {
  if (typeof coordinate.lat === 'number' && typeof coordinate.long === 'number') {
    Location();
  }
}
  },[user_id,locationName])


  const Get_job=async()=>{
    try{
      let res=await GetJob()
      dispatch(setJobData(res.data.data1))
 
      
    }catch(err){

    }
  }
  useEffect(()=>{
    Get_job()
  },[])
  console.log(Landing_show,"Landing_show");
  
  return (
    <div>
      {Landing_show ? <LandingPage/>:(
        <>
      {token ?(<Topbar /> ):""} 
      <div className="maincontant">
      <WebSocket locationData={location_data} userId={user_id} message_id={message_id}/>
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
              <Route path="/searchuser/:title" element={<SearchPage />} />
              <Route path="/chats/:id" element={<ChatMessage socket={socket} />} />
              <Route path="*" element={<ErrorPage />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Login setToken={setToken}/>} />
              <Route path="/register" element={<Register setToken={setToken} setLanding_show={setLanding_show}/>} />
              <Route path="/resetpassword" element={<ForgetPassword setToken={setToken}/>} />
            

              <Route path="*" element={<ErrorPage />} />


            </>
          )}

          <Route path="/sharepost/:post_id" element={<Perticularpost/>} />
          <Route path="/Privacy-policy" element={<PrivacyPolicy/>} />
          <Route path="/terms-and-conditions" element={<TermsPage/>} />

        </Routes>
      </div>
      </>)}
     
    </div>
  )
}
