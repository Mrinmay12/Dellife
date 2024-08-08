import React, { useState,useEffect } from 'react';
import "./Button.css"
const Button = ({loader,handleClickbtn,name}) => {
  const [loading, setLoading] = useState(loader);
const[disabled,setdisabled]=useState(loader)
  const handleClick = () => {
    
 
    handleClickbtn()
  }; 
  const handleKeyPress = (e) => { 
    if (e.key === 'Enter') {
      handleClick();
    }
  };

useEffect(()=>{
  if(loader){
    setdisabled(true) 
    setLoading(true)
  }else{
    setdisabled(false) 
    setLoading(false) 
  }
},[loader])
  return (
    <div style={{marginTop:"4px"}}>
      <button className={loading ? 'button loading' : 'button'} onClick={handleClick} disabled={disabled} onKeyPress={handleKeyPress}>
        {loading ? <span className="spinner"></span> :<span className='clickbtn'>{name}</span> }
      </button>
    </div>
  );
};

export default Button;
