import React,{useState,useEffect} from 'react'
import "./Smallmodel.css"
export default function Smallmodel() {
    const[show,setShow]=useState(false)
    const handleOpen=()=>{
        setShow(!show)
    }
  return (
    <div>
         <div class="dropdown">
    {/* <!-- three dots --> */}
    <ul class="dropbtn icons btn-right showLeft">
    <i class="icon clickable fa fa-ellipsis-h right" style={{fontSize:"24px"}} aria-hidden="true" onClick={handleOpen}></i>
    </ul>
    {/* <!-- menu --> */}
    {show &&(
        <div id="myDropdown" class="dropdown-content" >
      <a href="#home"><i class="fa fa-copy" style={{marginRight:"19px"}}></i>Open</a>
      <a href="#about"><i class="fa fa-flag-o" style={{marginRight:"19px"}}></i>Report</a>
    </div>
    )}
    
  </div>
    </div>
  )
}
