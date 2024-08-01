import React,{useState} from 'react'
import "./CardSetting.css"
import ArrowIcon from "./arrow.png"
export default function CardSetting({title,onClickSetting,img,profile_lock}) {
  const handleClick=()=>{
    onClickSetting()
  }
  return (
    <div>
        <div class="settingcard" onClick={()=>handleClick()}>
        <div class="settingdescription">
          <img src={img} width='22px' style={{marginRight:"13px" }} alt=''/>
            <h3>{title}</h3>
        
        </div>
        {profile_lock && <span>{profile_lock}</span>}
        <div class="arrow">
         <img width='20px' src={ArrowIcon}/>
        </div>
    </div>
    </div>
  )
}
