import React,{useState,useEffect} from 'react'
import "./Smallmodel.css"
export default function Smallmodel() {
    const[show,setShow]=useState(false)
    const handleOpen=()=>{
        setShow(!show)
    }
  return (
    <div class="dropdown">
    <div class="dropdown-btn icon clickable fa fa-ellipsis-h right"></div>
    <div class="dropdown-content">
    <a href="#home"><i class="fa fa-copy" style={{marginRight:"19px"}}></i>Open</a>
<a href="#about"><i class="fa fa-flag-o" style={{marginRight:"19px"}}></i>Report</a>
    </div>
  </div>
  )
}
