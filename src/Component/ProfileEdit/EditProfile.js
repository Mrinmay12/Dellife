import React,{useState} from 'react'
import Input from '../PostForm/Input'
export default function EditProfile() {
    const[about,setAbout]=useState("")
    const[phone,setPhone]=useState("") 
    const [link,setLink]=useState("")
    const Json={ 
        about,
        phone,
        link
    }
    console.log(Json,"JsonJson");
  return (
    <div>
     {/* <textarea id="message" className="input" value={about} placeholder="About" onChange={(e)=>setAbout(e.target.value)}></textarea> */}
        <Input placeholder="About" onchange={setAbout}/>
        <Input placeholder="link" onchange={setLink}/>
        <Input placeholder="phone" onchange={setPhone}/>
    </div>
  )
}
