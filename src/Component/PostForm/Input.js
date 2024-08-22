
import React,{useState,useEffect} from 'react'
import "./PostForm.css"
export default function Input({placeholder,onchange,value,inputtype,title,disabled}) {
    const[text,setText]=useState("")
    const handleText=(e)=>{
        setText(e.target.value)
        onchange(e.target.value)
    }
    useEffect(()=>{
      setText(value)
    },[value])
  return (
    <div style={{marginTop:"20px"}}>
       {/* <div id="form"> */}
     {/* <form id="waterform">  */}
        {/* <div class="formgroup" id="name-form"> */}
        <h3>{title}</h3>
                        {/* <label className='editlabel' for="name">Title</label> */}
                        <input className='editinput' placeholder={placeholder} value={text} onChange={handleText} inputMode={inputtype?inputtype:"text"} disabled={disabled}/>
                        {/* <input type="text" id="name" name="name" placeholder={placeholder} className='input' value={text} onChange={handleText} inputMode={inputtype?inputtype:"text"}/> */}
                    {/* </div> */}
                    {/* </form> */}
                    {/* </div> */}
    </div>
  )
}
