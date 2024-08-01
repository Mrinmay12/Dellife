import React,{useState} from 'react'
import { FollowUser } from '../AllApi/Integrateapi';
import { useDispatch,useSelector } from 'react-redux';
import { setData } from '../redux/action/LoginAction';
export default function HandleFollow({user_follow,user_id,id}) {
    const [Follow,setFollow]=useState(user_follow)
    const dispatch=useDispatch()
    const userlogin = useSelector(state => state.myReducer.data)
  
    const handleFollowuser=async()=>{
      setFollow(!Follow)
      try{
       let res= await FollowUser(id,user_id)
       if(res){
        if(!Follow){
                dispatch(setData({...userlogin,total_following:userlogin.total_following+1}))
                setFollow(!Follow)
              }else{
                dispatch(setData({...userlogin,total_following:userlogin.total_following-1}))
                setFollow(!Follow)
              }
            }
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
