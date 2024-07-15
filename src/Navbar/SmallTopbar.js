import React, { useState, useEffect } from 'react';
import "./Topbar.css";
export default function SmallTopbar({setColor}) {
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);
  
    useEffect(() => {
      const handleScroll = () => {
        const currentScrollPos = window.pageYOffset;
        setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
        setPrevScrollPos(currentScrollPos);
      };
  
      window.addEventListener('scroll', handleScroll);
      
      return () => window.removeEventListener('scroll', handleScroll);
    }, [prevScrollPos]);

    const[show,setShow]=useState("near")
  const handleShow=(e)=>{
    setShow(e)
    if(e==="near"){
      setColor("red")
    }else if(e==="argent"){
      setColor("blue")
    }else{
      setColor("green")
    }
  }

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
    
       <div className={isMobile?"smallnavbarmobile":"smallnavbar"}  style={{top: visible ? (isMobile?"130px":'87px') : '-50px',zIndex:1}}>
        <div className='profilediv'>
        <div className='profilebottom' style={{width:"30%",backgroundColor:"#d4e2d25c"}}>
          <p  className={show==="near"?'profilebottomtext':"profilebottomtext2"} onClick={()=>handleShow("near")} style={{color:show==="near"?"red":"black"}}><img style={{height:"18px" ,marginRight:"4px"}} src={''}/>Posts</p>
          <p className={show==="argent"?'profilebottomtext':"profilebottomtext2"} style={{color:show==="argent"?"red":"black"}} onClick={()=>handleShow("argent")}><img style={{height:"18px"}} src={''}/> Saved</p>
          <p className={show==="post"?'profilebottomtext':"profilebottomtext2"} style={{color:show==="post"?"red":"black"}} onClick={()=>handleShow("post")}><img style={{height:"18px"}} src={''}/> Saved</p>
        </div>
        </div>
      </div>
  )
}
