import React, { useState,useEffect } from 'react'
import "./Message.css"
import {
  useNavigate,
} from "react-router-dom";
import { userfriend ,userProfile} from '../../AllApi/Integrateapi';
import { useSelector } from 'react-redux';
export default function Discussion({ photo, name, message, timer, isMobile }) {
  const userId = useSelector(state => state.myReducer.data.message_id)
  const backgroundImageStyle = {
    backgroundImage: 'url(https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80)',
    // Add any additional styles if needed
  };
  const navigate = useNavigate();
  const handleOpen = () => {
    if (isMobile) {
      navigate("/chats")
    } else {
      alert("hello")
    }
  }
  const handleMesage=(e,id)=>{
    navigate("/message/"+e+"?userid="+window.btoa(id))
  }
console.log(userId,"userId");
  const [memberslist, setMemberlist] = useState([]);
  const [userProfiles, setUserProfiles] = useState({});

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
        </div>
        <div className="desc-contact">
          <p className="name">{item.user_name}</p>
          <p className="message">Let's meet for a coffee or something today ?</p>
        </div>
        <div className="timer">3 min</div>
      </div>
      ))}
      

    </div>

  )
}
