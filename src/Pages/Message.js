import React,{useEffect, useRef, useState} from 'react'
import MessageComponent from '../Component/MessagePage/Message'
import SearchUserIcon from "../Component/Images/SearchUser.svg"
import { useSelector } from 'react-redux';
import { userfriend } from '../AllApi/Integrateapi';
import Button from '../Component/Button/Button';
export default function Message({socket}) {
//User message connect
const userId = useSelector((state) => state.myReducer.data);
const usermemberslist = useSelector((state) => state.MessageReducer.data);
// const [memberslist, setMemberlist] = useState([]);
// useEffect(() => {
//   const data = async () => {
//     try {
//       const response = await userfriend(userId.message_id);
//       if (response) {
//         let dataarray = Array.isArray(response.data.data);
//         if (dataarray) {
//           let data = response.data.data;
          
//           setMemberlist(data);
//         }
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   if (userId !== null && userId !== undefined && userId !== "undefined") {
//     data();
//   }
// }, [userId]);
const handleFindUser=()=>{
  navigator(`/searchuser/${userId.work_title}`)
}
  return (
    <div>
   {Array.isArray(usermemberslist) && usermemberslist.length !== 0 ?(
    <MessageComponent socket={socket}/>
   ):(
    <div style={{ justifyContent:"center",display:"flex",marginTop:"43px",flexDirection:"column" ,alignItems:"center"}}>
    <img src={SearchUserIcon} alt='' width='80px'/>
    <div style={{ marginTop:"34px" }}>
    <Button value="Find users" handleClick={handleFindUser} backcolor={"#007bff"} icon={<i class="fa fa-search"></i>}/> 
    </div>
    </div>
   )}
      
    </div>
  )
}
