import React,{useState,useEffect, useRef} from 'react'
import { getMessage, sendMessage } from '../../AllApi/Integrateapi';
import AutoGrowTextarea from '../AutogrowInput/AutoGrowTextarea';
import "./Message.css"
import Messageshow from './MessageShow/Messageshow';
import { useSelector } from 'react-redux';
import { useParams,useSearchParams } from 'react-router-dom';
import { encryptText } from '../../Utiles';
import { io } from "socket.io-client"
export default function ChatMessage ({ messageid}) {
  const userlogin = useSelector(state => state.myReducer.data)
  const [searchParams, setSearchParams] = useSearchParams();
  let { id } = useParams();
  const userId=useSelector(state=>state.myReducer.data)
  const [onlineusers, setOnlineUsers] = useState([])
  const scrollRef = useRef()
  const backgroundImageStyle = {
    backgroundImage: 'url(https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80)',
    // Add any additional styles if needed
  };
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  //socket Io
  const socket = useRef(); 
  
  useEffect(() => {
    if(userId.user_id){
    socket.current = io(process.env.REACT_APP_SOCKET_URL);
      socket.current.emit("add-user", userId.user_id);
    }
  
      socket.current.on('get-users', (users) => {
        console.log(users, "myUSers");
        setOnlineUsers(users)
      })
   
   
    },[userId.user_id]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [messagedata, setmessagedata] = useState([])
  const [Messagestatus, setMessagestatus] = useState("")
  const [writemessage,setMessage]=useState("")
  useEffect(() => {
    const Messageget = async () => {
      let message = await getMessage(id)
      if (message) {
        setmessagedata(message.data.message
        )
      }
    }
    if(id){
    Messageget()
    }
  }, [Messagestatus,id])

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (messagetext,messageid) => {
        if(messageid===id){
console.log(messagetext,messageid,"messagetext,messageid")
          setArrivalMessage({ fromSelf: false, messagetext: messagetext });
        }
      });
    }
  }, []);


  useEffect(() => {
    arrivalMessage && setmessagedata((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    // window.scrollTo(0, document.getElementsByClassName("chat"))
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messagedata, Messagestatus]);

  const[messageref,setMessageref]=useState("")
  const correctSecretCode = "MessageApp123";
  const base64 = encryptText(writemessage,correctSecretCode)
  const json =JSON.stringify({
    messageId:id,
      sender:userId.user_id,
      messagetext:base64
  })
  const userid = searchParams.get('userid');
  let connect_userId=window.atob(userid)
  console.log("my new and old message data",connect_userId,userId.user_id);
  const handleSend=async()=>{
    try{
      if(writemessage.trim()!==""){
        setMessageref(new Date().getMilliseconds())
        // // setDisable(true)
        socket.current.emit("send-msg", {
          to: connect_userId,
          from: userId.user_id, 
          messagetext:base64,
          messageid:id
        });
        setArrivalMessage({ messageId:id,sender:userId.user_id, messagetext: base64 });
       await sendMessage(json).then((response)=>{
        if(response.status===201){
          setMessagestatus(new Date().getMilliseconds())
          setMessage("")
          // setDisable(false)
          // UpdateLastUpdateMessage()
        }
      }).finally(()=>{
        // setDisable(false)
      })  
      
      }
     
    }catch(err){
      console.log(err)
    }
   
  }
  return (
    <div className={isMobile?"showchat":`chat`}>
    {!isMobile &&(
      <div className="header-chat">
      <i className="icon fa fa-user-o" aria-hidden="true"></i>
      <p className="name">Megan Leib</p>
      {/* <i className="icon clickable fa fa-ellipsis-h right" aria-hidden="true"></i> */}
    </div>
    )}
   
    <div className="showmessages-chat">
    {messagedata.map((item) => (
   <Messageshow own={item.sender === userlogin.user_id ? true : false} message={item.messagetext} time={item.updatedAt
              }/>
    ))}
   
  <AutoGrowTextarea  id={id} userId={userlogin.user_id} setmessagedata={setmessagedata} messagedata={messagedata} setMessagestatus={setMessagestatus} Onsubmit={handleSend} messageref={messageref} setMessage={setMessage}/>
    </div>
    <div ref={scrollRef}></div>
  </div>
  )
}
