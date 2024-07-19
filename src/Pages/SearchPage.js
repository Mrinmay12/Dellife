import React,{useState,useEffect} from 'react'
import UserCard from '../Component/UserInfoCard/UserCard'

export default function SearchPage() {

  const[searchby_data,setsearchby_data]=useState("profile")
const handleSearch=(e)=>{
  setsearchby_data(e)
}

  return (
    <div>
    <div style={{ position:"relative" }}>
<div className='profilediv'>
        <div  style={{width:"30%",display:"flex",flexDirection:"row",justifyContent:"center"}}>
          <p  className={searchby_data==="profile"?'profilebottomtext':"profilebottomtext2"}  style={{color:searchby_data==="profile"?"red":"black"}} onClick={()=>handleSearch("profile")}><img style={{height:"18px" ,marginRight:"4px"}} src={''} />Profile</p>

          <p className={searchby_data==="post"?'profilebottomtext':"profilebottomtext2"} style={{color:searchby_data==="post"?"red":"black"}} onClick={()=>handleSearch("post")}><img style={{height:"18px"}} src={''}/> Post</p>
         
        </div>
        </div>
    </div>
    <UserCard searchby_data={searchby_data}/>
    </div>
  )
}
