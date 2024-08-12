import React, { useState,useEffect } from 'react'
import "./Message.css"
import {
  useNavigate,
} from "react-router-dom";
import { userfriend ,userProfile} from '../../AllApi/Integrateapi';
import { useSelector } from 'react-redux';
import { decryptText,UserTime } from "../../Utiles";
export default function Discussion({ photo, name, message, timer }) {
  const userId = useSelector(state => state.myReducer.data.message_id)

  const navigate = useNavigate();
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

  const handleMesage=(e,id)=>{
    if(isMobile){
      navigate("/chats/"+e+"?userid="+window.btoa(id))
    }else{
navigate("/message/"+e+"?userid="+window.btoa(id))
    }
    
    
  }
// console.log(userId,"userId");
  const [memberslist, setMemberlist] = useState([]);


  useEffect(() => {
    const data = async () => {
      try {
        const response = await userfriend(userId);
        if (response) {
          let dataarray = Array.isArray(response.data.data);
          if (dataarray) {
            let data = response.data.data;
            setMemberlist(data);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (userId !== null &&  userId!==undefined && userId !=="undefined") {
      data();
    }
  }, [userId]);
  const correctSecretCode = "MessageApp123"; 
  // useEffect(() => {
  //   const fetchUserProfile = async (memberId) => {
  //     try {
  //       // Make the API call to userProfile with memberId
  //       const userResponse = await userProfile(memberId);
  //       if (userResponse) {
  //         // Store the user profile data in userProfiles state using memberId as the key
  //         setUserProfiles((prevProfiles) => ({
  //           ...prevProfiles,
  //           [memberId]: userResponse.data.user_details,
  //         }));
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  //   // Loop through memberslist and fetch user profile for each member
  //   memberslist.forEach((item) => {
  //     const memberId = item.members?.find((item) => item !== userId);
  //     if (memberId) {
  //       fetchUserProfile(memberId);
  //     }
  //   });
  // }, [memberslist, userId]); 
  return (

    // <div className={`${isMobile?"discussionsmobile":"discussions"}`}>
    <div className={`${"discussions"}`}>
      {/* <div className="discussion message-active" onClick={handleOpen}>
        <div className="photo" style={backgroundImageStyle}>
          <div className="online"></div>
        </div>
        <div className="desc-contact">
          <p className="name">Megan Leib</p>
          <p className="message">9 pm at the bar if possible 😳</p>
        </div>
        <div className="timer">12 sec</div>
      </div> */}
      {memberslist.map((item) => (
      <div className="discussion" key={item._id} onClick={()=>handleMesage(item._id,item.sender_message_id)} style={{cursor:"pointer"}}>
        {/* <div className="photo" style={backgroundImageStyle}> */}
        <div className="photo" style={{ backgroundImage: `url(${item.user_pic})` }}>
          <div className="online"></div>
          {item.unseen_message!==0&&(
          <div className="online1">{item.unseen_message>9?'9+':item.unseen_message}</div>

          )}
        </div>
        <div className="desc-contact">
          <p className="name">{item.user_name}</p>
          <p className="message" style={{ marginLeft:"22px" }}>{decryptText(item.last_message,correctSecretCode)}</p>
        </div>
        <div className="timer">{UserTime(item.last_message_time)}</div>
      </div>
      ))}
      

    </div>

  )
}
