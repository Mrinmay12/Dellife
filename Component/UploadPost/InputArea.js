import React,{useState} from 'react'
import "./Input.css"
export default function InputArea({ value, handleChnage ,textcolor,textstyle}) {
  const [text,setText]=useState("")
    const OnChnage = (e) => {
      setText(e.target.value)
        handleChnage(e.target.value)
    }
    console.log(textstyle,"textstylev");
  return (
    <div style={{marginLeft:"10px"}}>
<textarea  type="text" className={textstyle==="1"?"textarea" :textstyle==="2"?"textarea2":"textarea3"} style={{color:textcolor===""?"black":textcolor}} value={text}  placeholder="Enter Tittle" onChange={OnChnage}/>
    </div>
  )
}
