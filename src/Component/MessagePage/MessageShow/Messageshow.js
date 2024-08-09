import React from "react";
import "./Message.css";
import { decryptText,Date_and_Time } from "../../../Utiles";
import MessageCard from "../MessageDetails/MessageCard";
export default function Messageshow({ message, own ,time}) {

  const correctSecretCode = "MessageApp123";  
  return (
    <div className={own ? "message own" : "message"}>
      {/* <MessageCard title="Card Title" imgSrc="https://via.placeholder.com/30" />
      <MessageCard title="Card Title" /> */}
      <div className="messageTop">
      
        <p className="messageText">{decryptText(message,correctSecretCode)}</p>
        {/* <p className="messageText">{message}</p> */}
      </div>
      <div className="messageBottom">{Date_and_Time(time)}</div>
      {/* <Input/> */}
    </div>
  );
}