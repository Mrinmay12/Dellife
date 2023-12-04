import React, { useState,useEffect } from 'react';
import "./Button.css"
const Button = ({loader,handleClickbtn}) => {
  const [loading, setLoading] = useState(false);
const[disabled,setdisabled]=useState(false)
  const handleClick = () => {
    setLoading((prevLoading) => !prevLoading);
    handleClickbtn()
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
      <button className={loading ? 'button loading' : 'button'} onClick={handleClick} disabled={disabled}>
        {loading ? <span className="spinner"></span> :<span className='clickbtn'>Register</span> }
      </button>
    </div>
  );
};

export default Button;
