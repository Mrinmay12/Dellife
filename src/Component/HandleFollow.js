import React,{useState} from 'react'
import { FollowUser } from '../AllApi/Integrateapi';

export default function HandleFollow({user_follow,user_id,id}) {
    const [Follow,setFollow]=useState(user_follow)
      console.log(Follow,"my_follow");
    const handleFollowuser=async()=>{
      setFollow(!Follow)
      try{
        await FollowUser(id,user_id)
      }catch(err){
        setFollow(false)
      }
    
    }
  return (
    <div>
        <div className="btn-theme icon-left" onClick={()=>handleFollowuser()}>{Follow?('Following' ):"+Follow"}</div>
    </div>
  )
}
