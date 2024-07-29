import React,{useState} from 'react'
import "./CardSetting.css"
import ArrowIcon from "./arrow.png"
export default function CardSetting({title,onClickSetting}) {
  const handleClick=()=>{
    onClickSetting()
  }
  return (
    <div>
        <div class="settingcard" onClick={()=>handleClick()}>
        <div class="settingdescription">
            <h3>{title}</h3>
        
        </div>
        <div class="arrow">
         <img width='20px' src={ArrowIcon}/>
        </div>
    </div>
    </div>
  )
}
