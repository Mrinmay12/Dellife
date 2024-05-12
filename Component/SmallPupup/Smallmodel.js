import React,{useState,useEffect} from 'react'
import "./Smallmodel.css"
import save from "../../Images/save.jpg"
import { UserSavePost ,User_post_save_or_not} from '../../AllApi/Integrateapi'
import { useSelector } from 'react-redux';
export default function Smallmodel({post_id}) {
  const userlogin = useSelector(state => state.myReducer.data)
    const[show,setShow]=useState(false)
    const handleOpen=()=>{
        setShow(!show)
    }
    const[usersavepost,setUsersavepost]=useState(false)
    const handleSave=async()=>{
      setUsersavepost(!usersavepost)
      try {
        let json = JSON.stringify({
          user_id: userlogin.user_id
        })
        await UserSavePost(post_id, json)
      } catch (err) {
  
      }
    }

   
  useEffect(()=>{
    const Postsave=async()=>{
      let res=await User_post_save_or_not(post_id,userlogin.user_id)
      if(res){
        setUsersavepost(res.data.user_post_save)
      }
    }
    if(post_id){
      Postsave()
    }
  },[post_id])
  return (
    <div class="dropdown">
    <div class="dropdown-btn icon clickable fa fa-ellipsis-h right"></div>
    <div class="dropdown-content">
    <a onClick={handleSave}><img style={{height:"17px",marginRight:"19px"}} src={save}/>{usersavepost?"Unsave":"Saved"}</a>
    <a href="#about"><i class="fa fa-copy" style={{marginRight:"19px"}}></i>copy</a>
<a href="#about"><i class="fa fa-flag-o" style={{marginRight:"19px"}}></i>Report</a>
    </div>
  </div>
  )
}
