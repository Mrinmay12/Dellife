import React from 'react';
import './MessageCard.css'; // Make sure this path is correct
import { useNavigate } from 'react-router-dom';
const MessageCard = ({ title, imgSrc,post_id }) => {
  const navigate=useNavigate()
  const hasImage = imgSrc ? true : false;
   const handleRedirect=()=>{
    navigate(`/sharepost/${post_id}`)
   }

   
  return (
    <div className={`message_card ${!hasImage ? 'no-image' : ''}`} onClick={()=>handleRedirect()} style={{ cursor:"pointer" }}>
      {hasImage && <img src={`${process.env.REACT_APP_FIREBASE}${process.env.REACT_APP_BUCKET}/o/${imgSrc}?alt=media`} alt="Image" />}
      <div className="title">{title}</div>
    </div>
  );
};

export default MessageCard;
