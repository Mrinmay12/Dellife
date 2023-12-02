import React, { useState } from 'react'
import "./Message.css"
import {
  useNavigate,
} from "react-router-dom";
export default function Discussion({ photo, name, message, timer, isMobile }) {
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
  return (

    // <div className={`${isMobile?"discussionsmobile":"discussions"}`}>
    <div className={`${"discussions"}`}>
      <div className="discussion message-active" onClick={handleOpen}>
        <div className="photo" style={backgroundImageStyle}>
          <div className="online"></div>
        </div>
        <div className="desc-contact">
          <p className="name">Megan Leib</p>
          <p className="message">9 pm at the bar if possible 😳</p>
        </div>
        <div className="timer">12 sec</div>
      </div>

      <div className="discussion">
        <div className="photo" style={backgroundImageStyle}>
          <div className="online"></div>
        </div>
        <div className="desc-contact">
          <p className="name">Dave Corlew</p>
          <p className="message">Let's meet for a coffee or something today ?</p>
        </div>
        <div className="timer">3 min</div>
      </div>
      <div className="discussion">
        <div className="photo" style={backgroundImageStyle}>
          <div className="online"></div>
        </div>
        <div className="desc-contact">
          <p className="name">Dave Corlew</p>
          <p className="message">Let's meet for a coffee or something today ?</p>
        </div>
        <div className="timer">3 min</div>
      </div>
      <div className="discussion">
        <div className="photo" style={backgroundImageStyle}>
          <div className="online"></div>
        </div>
        <div className="desc-contact">
          <p className="name">Dave Corlew</p>
          <p className="message">Let's meet for a coffee or something today ?</p>
        </div>
        <div className="timer">3 min</div>
      </div>
      <div className="discussion">
        <div className="photo" style={backgroundImageStyle}>
          <div className="online"></div>
        </div>
        <div className="desc-contact">
          <p className="name">Dave Corlew</p>
          <p className="message">Let's meet for a coffee or something today ?</p>
        </div>
        <div className="timer">3 min</div>
      </div>
      <div className="discussion">
        <div className="photo" style={backgroundImageStyle}>
          <div className="online"></div>
        </div>
        <div className="desc-contact">
          <p className="name">Dave Corlew</p>
          <p className="message">Let's meet for a coffee or something today ?</p>
        </div>
        <div className="timer">3 min</div>
      </div>
      <div className="discussion">
        <div className="photo" style={backgroundImageStyle}>
          <div className="online"></div>
        </div>
        <div className="desc-contact">
          <p className="name">Dave Corlew</p>
          <p className="message">Let's meet for a coffee or something today ?</p>
        </div>
        <div className="timer">3 min</div>
      </div>
      <div className="discussion">
        <div className="photo" style={backgroundImageStyle}>
          <div className="online"></div>
        </div>
        <div className="desc-contact">
          <p className="name">Dave Corlew</p>
          <p className="message">Let's meet for a coffee or something today ?</p>
        </div>
        <div className="timer">3 min</div>
      </div>
      <div className="discussion">
        <div className="photo" style={backgroundImageStyle}>
          <div className="online"></div>
        </div>
        <div className="desc-contact">
          <p className="name">Dave Corlew</p>
          <p className="message">Let's meet for a coffee or something today ?</p>
        </div>
        <div className="timer">3 min</div>
      </div>
      <div className="discussion">
        <div className="photo" style={backgroundImageStyle}>
          <div className="online"></div>
        </div>
        <div className="desc-contact">
          <p className="name">Dave Corlew</p>
          <p className="message">Let's meet for a coffee or something today ?</p>
        </div>
        <div className="timer">3 min</div>
      </div>
      <div className="discussion">
        <div className="photo" style={backgroundImageStyle}>
          <div className="online"></div>
        </div>
        <div className="desc-contact">
          <p className="name">Dave Corlew</p>
          <p className="message">Let's meet for a coffee or something today ?</p>
        </div>
        <div className="timer">3 min</div>
      </div>
      <div className="discussion">
        <div className="photo" style={backgroundImageStyle}>
          <div className="online"></div>
        </div>
        <div className="desc-contact">
          <p className="name">Dave Corlew</p>
          <p className="message">Let's meet for a coffee or something today ?</p>
        </div>
        <div className="timer">3 min</div>
      </div>
      <div className="discussion">
        <div className="photo" style={backgroundImageStyle}>
          <div className="online"></div>
        </div>
        <div className="desc-contact">
          <p className="name">Dave Corlew</p>
          <p className="message">Let's meet for a coffee or something today ?</p>
        </div>
        <div className="timer">3 min</div>
      </div>
      <div className="discussion">
        <div className="photo" style={backgroundImageStyle}>
          <div className="online"></div>
        </div>
        <div className="desc-contact">
          <p className="name">Dave Corlew</p>
          <p className="message">Let's meet for a coffee or something today ?</p>
        </div>
        <div className="timer">3 min</div>
      </div>
      <div className="discussion">
        <div className="photo" style={backgroundImageStyle}>
          <div className="online"></div>
        </div>
        <div className="desc-contact">
          <p className="name">Dave Corlew</p>
          <p className="message">Let's meet for a coffee or something today ?</p>
        </div>
        <div className="timer">3 min</div>
      </div>

      <div className="discussion">
        <div className="photo" style={backgroundImageStyle}>
        </div>
        <div className="desc-contact">
          <p className="name">Jerome Seiber</p>
          <p className="message">I've sent you the annual report</p>
        </div>
        <div className="timer">42 min</div>
      </div>

      <div className="discussion">
        <div className="photo" style={backgroundImageStyle}>
          <div className="online"></div>
        </div>
        <div className="desc-contact">
          <p className="name">Thomas Dbtn</p>
          <p className="message">See you tomorrow ! 🙂</p>
        </div>
        <div className="timer">2 hour</div>
      </div>

      <div className="discussion">
        <div className="photo" style={backgroundImageStyle}>
        </div>
        <div className="desc-contact">
          <p className="name">Elsie Amador</p>
          <p className="message">What the f**k is going on ?</p>
        </div>
        <div className="timer">1 day</div>
      </div>

      <div className="discussion">
        <div className="photo" style={backgroundImageStyle}>
        </div>
        <div className="desc-contact">
          <p className="name">Billy Southard</p>
          <p className="message">Ahahah 😂</p>
        </div>
        <div className="timer">4 days</div>
      </div>


    </div>

  )
}
