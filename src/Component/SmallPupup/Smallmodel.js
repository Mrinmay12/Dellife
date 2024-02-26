import React,{useState,useEffect} from 'react'
import "./Smallmodel.css"
import save from "../../Images/save.jpg"
export default function Smallmodel({post_id}) {
    const[show,setShow]=useState(false)
    const handleOpen=()=>{
        setShow(!show)
    }
    const handleSave=()=>{
      alert(post_id)
    }
  return (
    <div class="dropdown">
    <div class="dropdown-btn icon clickable fa fa-ellipsis-h right"></div>
    <div class="dropdown-content">
    <a onClick={handleSave}><img style={{height:"17px",marginRight:"19px"}} src={save}/>Saved</a>
<a href="#about"><i class="fa fa-flag-o" style={{marginRight:"19px"}}></i>Report</a>
    </div>
  </div>
  )
}
