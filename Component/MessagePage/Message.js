import React,{useState,useEffect} from 'react'
import "./Message.css"
import Discussion from './Discussion '
import ChatMessage from './ChatMessage '
export default function Message({socket}) {
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

  const [screenHeight, setScreenHeight] = useState(window.innerHeight);

  useEffect(() => {
    const updateScreenHeight = () => {
      setScreenHeight(window.innerHeight);
    };
    window.addEventListener('resize', updateScreenHeight);
    return () => {
      window.removeEventListener('resize', updateScreenHeight);
    };
  }, []);

  return (
  
    <>

      <div class="massagecontainer" style={{marginTop:!isMobile?"-39px":""}}> 
        <Discussion isMobile={isMobile}/>
        {!isMobile &&(
          <ChatMessage socket={socket} />
        )}
        

      </div>


    </>
  )
}
