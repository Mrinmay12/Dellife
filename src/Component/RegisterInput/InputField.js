import React,{useState} from 'react'
import "./Input.css"
export default function InputField({name,onChange}) {
  const[value,setValue]=useState("")
  const handleChnage=(e)=>{
    setValue(e.target.value)
    onChange(e.target.value)
  }
  return (
    <div>
    <div className="form__group">
    {/* <div className="form__group field"> */}
      <input type="text" className="form__field" placeholder="Name" name="name" id='name' value={value} onChange={(e)=>handleChnage(e)} />
      <label htmlFor="name" className="form__label">{name}</label>
    </div>
  </div>
  )
}
