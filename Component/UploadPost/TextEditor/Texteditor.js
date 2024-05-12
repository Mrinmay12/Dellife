import React,{useState,useEffect} from 'react'
import "./Texteditor.css"
export default function Texteditor({setTextcolorget,settextstyle}) {
    const [textcolor,setTextcolor]=useState("black") 
const [textstyle,setTextstyle]=useState("1") 
    const handleColor=(e)=>{
        setTextcolor(e)
        setTextcolorget(e)
      }
      const handleTextstyle=(e)=>{
        setTextstyle(e)
        settextstyle(e)
      }
      
  return (
    <div>
        <div className="texteditor">
      <div className='colorchange3' value={textcolor} onClick={()=>handleColor("black")}></div>
      <div className='colorchange' value={textcolor} onClick={()=>handleColor("red")}></div>
      <div className='colorchange1' value={textcolor} onClick={()=>handleColor("green")}></div>
      <div className='colorchange2' value={textcolor} onClick={()=>handleColor("blue")}></div>
      <div className='textmanustyle'>
        <p className='manutext' value={textstyle} onClick={()=>handleTextstyle("1")}>Text</p>
        <p className='manutext1' value={textstyle} onClick={()=>handleTextstyle("2")}>Text</p>
        <p className='manutext2'  value={textstyle} onClick={()=>handleTextstyle("3")}>Text</p>
      </div>
      </div>
    </div>
  )
}
