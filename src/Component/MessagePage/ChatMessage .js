import React, { useState, useEffect, useRef } from "react";
import {
  BlockUser,
  getMessage,
  get_Perticular_user,
  sendMessage,
} from "../../AllApi/Integrateapi";
import AutoGrowTextarea from "../AutogrowInput/AutoGrowTextarea";
import "./Message.css";
import Messageshow from "./MessageShow/Messageshow";
import { useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { encryptText } from "../../Utiles";
import { io } from "socket.io-client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import blockIcon from "../Images/blockIcon.svg";
export default function ChatMessage({ messageid }) {
  const navigation = useNavigate();
  const userlogin = useSelector((state) => state.myReducer.data);
  const [searchParams, setSearchParams] = useSearchParams();
  let { id } = useParams();
  const userId = useSelector((state) => state.myReducer.data);
  const [onlineusers, setOnlineUsers] = useState([]);
  const scrollRef = useRef();

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  //socket Io
  const socket = useRef();

  // useEffect(() => {
  //   if(userId.message_id){
  //   socket.current = io(process.env.REACT_APP_SOCKET_URL);
  //     socket.current.emit("add-user", userId.message_id);
  //   }

  //     socket.current?.on('get-users', (users) => {
  //       console.log(users, "myUSers");
  //       setOnlineUsers(users)
  //     })

  //   },[userId.message_id]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [messagedata, setmessagedata] = useState([]);
  const [Messagestatus, setMessagestatus] = useState("");
  const [writemessage, setMessage] = useState("");
  useEffect(() => {
    const Messageget = async () => {
      let message = await getMessage(id);
      if (message) {
        setmessagedata(message.data.message);
      }
    };
    if (id) {
      Messageget();
    }
  }, [id]);

  // useEffect(() => {
  //   if (socket.current) {
  //     socket.current.on("msg-recieve", (messagetext,messageid) => {
  //       console.log(messagetext,messageid,"messagetext,messageid")
  //       if(messageid===id){

  //         setArrivalMessage({ fromSelf: false, messagetext: messagetext });
  //       }
  //     });
  //   }
  // }, []);
  useEffect(() => {
    socket.current = io(process.env.REACT_APP_SOCKET_URL); // Adjust the URL to your server

    socket.current.on("connect", () => {
      socket.current.emit("add-user", userId.message_id);

      socket.current?.on("get-users", (users) => {
        // console.log(users, "myUSers");
        setOnlineUsers(users);
      });

      console.log("Connected to socket server");
    });

    socket.current.on("msg-recieve", (messagetext, messageid, user_id) => {
      // console.log(messagetext, messageid, "messagetext,messageid");
      if (messageid === id) {
        setArrivalMessage({ fromSelf: false, messagetext, sender: user_id });
      }
    });
    console.log(arrivalMessage, "arrivalMessage");
    return () => {
      socket.current.disconnect();
    };
  }, [id]);

  useEffect(() => {
    arrivalMessage && setmessagedata((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    // window.scrollTo(0, document.getElementsByClassName("chat"))
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messagedata, Messagestatus]);

  const [messageref, setMessageref] = useState("");
  const correctSecretCode = "MessageApp123";
  const base64 = encryptText(writemessage, correctSecretCode);
  const json = JSON.stringify({
    messageId: id,
    sender: userId.message_id,
    messagetext: base64,
  });
  const userid = searchParams.get("userid");
  let connect_userId = window.atob(userid);
  // console.log("my new and old message data",connect_userId,userId.user_id);

  const handleSend = async () => {
    try {
      if (writemessage.trim() !== "") {
        // setMessageref(new Date().getMilliseconds())
        // // setDisable(true)
        socket.current.emit("send-msg", {
          to: connect_userId,
          from: userId.message_id,
          messagetext: base64,
          messageid: id,
        });

        await sendMessage(json)
          .then((response) => {
            if (response.status === 201) {
              setMessagestatus(new Date().getMilliseconds());
              // setmessagedata((prev) => [...prev, {fromSelf: true, messageId:id,sender:userId.message_id, messagetext: base64 }])
              // setArrivalMessage();
              setMessage("");
              // setDisable(false)
              // UpdateLastUpdateMessage()
            }
          })
          .finally(() => {
            // setDisable(false)
          });
      }
    } catch (err) {
      console.log(err);
    }
  };
  const [sender_info, setSenderInfo] = useState([]);
  const[block_by,setBlock_by]=useState(true)
  useEffect(() => {
    const data = async () => {
      let res = await get_Perticular_user(id, userId.message_id);
      if (res) {
        let data = res.data.data;
        setSenderInfo(data);
        setBlock_by(res.data.data.block_by)
      }
    };
    if (userId.message_id && id) {
      data();
    }
  }, [id, userId.message_id]);

  const [showModal, setShowModal] = useState(false);
 

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleBlock = async() => {
    try{
   let res=await BlockUser(id, userId.message_id)
  if(res){
    setBlock_by(!block_by)
  }
    }catch{

    }
    setShowModal(!showModal);
  };
  return (
    <>
      {id ? (
        <div className={isMobile ? "showchat" : `chat`}>
          {/* {!isMobile &&( */}
          <div className="header-chat">
            {isMobile && (
              <div
                onClick={() => navigation("/message")}
                style={{ marginLeft: "21px" }}
              >
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  style={{ color: "black" }}
                  className="iconstyle"
                />
              </div>
            )}
            {/* <i className="icon fa fa-user-o" aria-hidden="true"></i> */}
            <div>
              <img src={sender_info.user_pic} className="messageicon" />
              {/* <div className="icon" style={{ backgroundImage: `url(${sender_info.user_pic})` }}></div> */}
            </div>
            <div className="twocontent-message">
              <p className="name">{sender_info.user_name}</p>

              <button onClick={toggleModal} className="three-dot-button">
                •••
              </button>
            </div>
            {showModal && (
              <div className="messagemodal">
                <div className="" style={{ flexDirection:"column" }}>
                  <div style={{ display: "flex", }}>
                    <img src={blockIcon} width="20px" />
                    <p className="blockuser" onClick={handleBlock}>
                      {!block_by ? "Block User" : "Unblock User"}
                    </p>
                  </div>
                  <div style={{ border:"", textAlign:"center"}}>
                    <button onClick={toggleModal} className="model-close-button" 
                     style={{  display:"inline-block", padding:"4px 10px",alignSelf:"center", backgroundColor:"#fff"}}>
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
            {/* <i className="icon clickable fa fa-ellipsis-h right" aria-hidden="true"></i> */}
          </div>
          {/* )} */}

          <div className="showmessages-chat">
            {messagedata.map((item) => (
              <Messageshow
                own={item.sender === userlogin.message_id ? true : false}
                message={item.messagetext}
                time={item.updatedAt}
              />
            ))}
          {!block_by&&(
            <AutoGrowTextarea
              id={id}
              userId={userlogin.message_id}
              setmessagedata={setmessagedata}
              messagedata={messagedata}
              setMessagestatus={setMessagestatus}
              Onsubmit={handleSend}
              messageref={messageref}
              setMessage={setMessage}
            />
         
          )}
             </div>
          <div ref={scrollRef}></div>
        </div>
      ) : (
        <div
          className={isMobile ? "showchat" : `chat`}
          style={{ display: "flex", alignItems: "center" }}
        >
          <h4 className="letschat">Let's Chat</h4>
        </div>
      )}
    </>
  );
}
