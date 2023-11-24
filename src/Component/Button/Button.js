import React from 'react'
import "./Button.css"
export default function Button({value,handleClick}) {
    // const handleClick=()=>{

    // }
  return (
    <div>
<button class="button-3" role="button" onClick={handleClick}>{value}</button>
    </div>
  )
}
