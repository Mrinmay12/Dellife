import React ,{useState}from 'react'
import { Profile_Lock_Unlock } from '../../AllApi/Integrateapi'
import { useSelector } from 'react-redux'
import Button from '../Button/Button'

export default function AccountPoliceModel({isOpen, onClose}) {
    const userlogin = useSelector(state => state.myReducer.data)
    const [lock_unlock,setLock_Unlock]=useState(userlogin.profile_lock)
    const handle_Lock_Unlock_Profile=async()=>{
      let res= await  Profile_Lock_Unlock(userlogin?.user_id)
   if(res){
    setLock_Unlock((pre)=>!pre)

      // navigate("/")
   }
    }
  return (
    <div className={`modal-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}>
    <div
      className={`modal-content ${isOpen ? 'slide-up' : 'slide-down'}`}
      onClick={e => e.stopPropagation()}
    >
        <h2 style={{ paddingBottom:"13px" }}>Account Privacy</h2>
        <span >To ensure your photos are only visible to approved followers, please set your account to private. By doing this, only users you approve will be able to see your posts, including photos and details.</span>
        <div style={{marginTop:"20px"}}>
        <Button value={`Make profile ${lock_unlock?"public":"private"}`} handleClick={handle_Lock_Unlock_Profile} backcolor={"#2BD27E"} icon={lock_unlock?<i class="fa fa-lock"></i>:<i class="fa fa-unlock"></i>}/>
        </div>
       
       
       
        </div>
        </div>
  )
}
