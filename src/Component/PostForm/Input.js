
import React,{useState} from 'react'
import "./PostForm.css"
export default function Input({placeholder,onchange}) {
    const[text,setText]=useState("")
    const handleText=(e)=>{
        setText(e.target.value)
        onchange(e.target.value)
    }
  return (
    <div style={{marginTop:"20px"}}>
       {/* <div id="form"> */}
     {/* <form id="waterform">  */}
        {/* <div class="formgroup" id="name-form"> */}
                        {/* <label className='label' for="name">Title</label> */}
                        <input type="text" id="name" name="name" placeholder={placeholder} className='input' value={text} onChange={handleText}/>
                    {/* </div> */}
                    {/* </form> */}
                    {/* </div> */}
    </div>
  )
}
