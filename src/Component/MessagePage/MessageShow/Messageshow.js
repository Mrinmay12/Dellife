import React from "react";
import "./Message.css";
import { decryptText,Date_and_Time } from "../../../Utiles";
export default function Messageshow({ message, own ,time}) {

  const correctSecretCode = "MessageApp123";  
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
    
        <p className="messageText">{decryptText(message,correctSecretCode)}</p>
        {/* <p className="messageText">{message}</p> */}
      </div>
      <div className="messageBottom">{Date_and_Time(time)}</div>
      {/* <Input/> */}
    </div>
  );
}