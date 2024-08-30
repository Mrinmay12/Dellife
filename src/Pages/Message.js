import React,{useEffect, useRef, useState} from 'react'
import MessageComponent from '../Component/MessagePage/Message'
import SearchUserIcon from "../Component/Images/SearchUser.svg"
import { useSelector } from 'react-redux';
import { userfriend } from '../AllApi/Integrateapi';
import Button from '../Component/Button/Button';
import PageLoder from '../Component/LoderComponent/PageLoder';
import { useNavigate } from 'react-router-dom';
import UserCards from '../Component/NoUserList/UserCards';
export default function Message({socket}) {
//User message connect
const navigator=useNavigate()
const userId = useSelector((state) => state.myReducer.data);
const usermemberslist = useSelector((state) => state.MessageReducer.data);
const [memberslist, setMemberlist] = useState(usermemberslist);
const[loder,setLoder]=useState(true)
useEffect(() => {
  const data = async () => {
    try {
      setLoder(true)
      const response = await userfriend(userId.message_id);
      if (response) {
        let dataarray = Array.isArray(response.data.data);
        if (dataarray) {
          let data = response.data.data;
          
          setMemberlist(data);
          setLoder(false)
        }
      }
    } catch (err) {
      console.log(err);
      setLoder(false)
    }
  };

  if (userId !== null && userId !== undefined && userId !== "undefined") {
    data();
  }
}, [userId]);
const handleFindUser=()=>{
  navigator(`/searchuser/${userId.work_title}`)
}
  return (
    <div>
   
      {loder ?(
           <div style={{ display:"flex",justifyContent:"center",marginTop:"180px" }}>
        <PageLoder/>
        </div>
        ):(
        <>
        {Array.isArray(memberslist) && memberslist.length !== 0 ?(
    <MessageComponent socket={socket}/>
   ):(
    <>
    {/* <div style={{ justifyContent:"center",display:"flex",marginTop:"43px",flexDirection:"column" ,alignItems:"center"}}>
    <img src={SearchUserIcon} alt='' width='80px'/>
    <div style={{ marginTop:"34px" }}>
    <Button value="Find users" handleClick={handleFindUser} backcolor={"#007bff"} icon={<i class="fa fa-search"></i>}/> 
  
    </div>
    </div> */}
    <div style={{ justifyContent:"center",display:"flex",marginTop:"43px",flexDirection:"column" ,alignItems:"center"}}>
    <UserCards/>
    </div>
   
      <div class="line-container">
  <div class="line"></div>
  <span class="center-text">End to end encryption</span>
  <div class="line"></div>
</div>
    </>
    
   )}
        </>

        )}
    
   
   
      
    </div>
  )
}
