import React from "react";
import "./Message.css";

export default function Messageshow({ message, own ,time}) {
  function decryptText(encryptedText, secretCode) {
    let decryptedText = '';
    for (let i = 0; i < encryptedText.length; i++) { 
      const char = encryptedText[i];
      const charCode = char.charCodeAt(0);
      const secretCharCode = secretCode.charCodeAt(i % secretCode.length); // Repeating the secret code
      const decryptedCharCode = charCode - secretCharCode;
      
      // Check if the decrypted character is outside the valid character range (e.g., less than 32)
      if (decryptedCharCode < 32) {
        return ''; // Incorrect code, return an empty string
      }
  
      decryptedText += String.fromCodePoint(decryptedCharCode);
    }
    return decryptedText;
  }
  const correctSecretCode = "MessageApp123";  
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
    
        {/* <p className="messageText">{decryptText(message,correctSecretCode)}</p> */}
        <p className="messageText">{message}</p>
      </div>
      <div className="messageBottom">{time}</div>
      {/* <Input/> */}
    </div>
  );
}