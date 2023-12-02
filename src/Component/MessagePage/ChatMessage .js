import React,{useState,useEffect} from 'react'
import "./Message.css"
import Messageshow from './MessageShow/Messageshow';
export default function ChatMessage ({ photo, text, time }) {
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
   <Messageshow own={true} message={"hi gfdfffffffffffffffffffffffffffffffffffffffffffffffffffffffddddddddddddddddddddddddddddddddd"} time={"3/34/4"}/>
   <Messageshow own={true} message={"hi"} time={"3/34/4"}/>
   <Messageshow own={true} message={"hi"} time={"3/34/4"}/>
   <Messageshow own={false} message={"hi"} time={"3/34/4"}/>
   <Messageshow own={false} message={"hi"} time={"3/34/4"}/>
   <Messageshow own={true} message={"hi"} time={"3/34/4"}/>
   <Messageshow own={false} message={"hi"} time={"3/34/4"}/>
   <Messageshow own={true} message={"hi"} time={"3/34/4"}/>
   <Messageshow own={true} message={"hi"} time={"3/34/4"}/>
   <Messageshow own={true} message={"hi"} time={"3/34/4"}/>
   <Messageshow own={true} message={"hi"} time={"3/34/4"}/>
   <Messageshow own={true} message={"hi"} time={"3/34/4"}/>
   <Messageshow own={true} message={"hi"} time={"3/34/4"}/>
   <Messageshow own={true} message={"hi"} time={"3/34/4"}/>
   <Messageshow own={true} message={"hi"} time={"3/34/4"}/>
   <Messageshow own={true} message={"hi"} time={"3/34/4"}/>
   <Messageshow own={true} message={"hi"} time={"09/06/2001"}/>
    
    </div>
  
  </div>
  )
}
