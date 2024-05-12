import React from 'react'
import "./Button.css"
export default function Button({value,handleClick,backcolor,icon}) {
    // const handleClick=()=>{

    // }
  return (
    <div>
<button style={{backgroundColor:backcolor}} className="button-3" role="button" onClick={handleClick}>{icon||""} {value}</button>
    </div>
  )
}
