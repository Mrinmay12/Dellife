import React,{useState,useEffect,useRef} from 'react'
import AutoGrowTextarea from '../AutogrowInput/AutoGrowTextarea'
import Messageshow from '../MessagePage/MessageShow/Messageshow'
import { useSelector, useDispatch } from 'react-redux'; 
import { encryptText } from '../../Utiles';
import { io } from "socket.io-client"
import { getMessage, sendMessage } from '../../AllApi/Integrateapi';
import { useParams,useSearchParams } from 'react-router-dom';
import "../MessagePage/Message.css"
export default function MessageModel({onClose}) {
    const userlogin = useSelector(state => state.myReducer.data)
    const userId=useSelector(state=>state.myReducer.data) 
    const [searchParams, setSearchParams] = useSearchParams();
    const scrollRef = useRef()
    let { id } = "2303030"
    //socket Io
  const socket = useRef(); 
  
//   useEffect(() => {
//     if(userId.message_id){
//     socket.current = io(process.env.REACT_APP_SOCKET_URL);
//       socket.current.emit("add-user", userId.message_id);
//     }
  
//       socket.current?.on('get-users', (users) => {
//         console.log(users, "myUSers");
//         setOnlineUsers(users)
//       })
   
   
//     },[userId.message_id]);
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
          from: userId.message_id, 
          messagetext:base64,
          messageid:id
        });
        setArrivalMessage({ messageId:id,sender:userId.message_id, messagetext: base64 });
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
  const modalRef = useRef(null);
  const dispatch = useDispatch()
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);
  return (
    <div  className="modal-container" ref={modalRef}>
          
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