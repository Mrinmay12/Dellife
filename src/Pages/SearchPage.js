import React,{useState,useEffect} from 'react'
import UserCard from '../Component/UserInfoCard/UserCard'
import { useNavigate } from 'react-router-dom'
import filterIcon from '../Images/filter.png'
import Filtermodel from '../Component/FilterModel/Filtermodel'
export default function SearchPage() {
const navigate=useNavigate()
  const[searchby_data,setsearchby_data]=useState("profile")
const handleSearch=(e)=>{
  setsearchby_data(e)
}
useEffect(() => {
  window.history.pushState({ name: "browserBack" }, "on browser back click", window.location.href);
  const handlePopstate = (event) => {
  const state = event.state;
  if (state && state.name === "browserBack") {
    navigate('/')
  }
  };
  window.addEventListener('popstate', handlePopstate);
  return () => {
  window.removeEventListener('popstate', handlePopstate);
  };
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setTimeout(() => setIsModalOpen(true), 10);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const[work_title,setWork_title]=useState('')
  const[location_user,setLocation_user]=useState('')
  return (
    <div>
    <div style={{ position:"relative" }}>
<div className='profilediv'>
        <div  style={{width:"51%",display:"flex",flexDirection:"row",justifyContent:"center",backgroundColor:"gainsboro",borderRadius:"12px",marginTop:"18px"}}>
          <p  className={searchby_data==="profile"?'profilebottomtext':"profilebottomtext2"}  style={{color:searchby_data==="profile"?"red":"black"}} onClick={()=>handleSearch("profile")}><img style={{height:"18px" ,marginRight:"4px"}} src={''} />Profile</p>

          <p className={searchby_data==="post"?'profilebottomtext':"profilebottomtext2"} style={{color:searchby_data==="post"?"red":"black"}} onClick={()=>handleSearch("post")}><img style={{height:"18px"}} src={''}/> Post</p>
         <img src={filterIcon} alt='' className='filtericon' title='filter' onClick={openModal}/>
        </div>
        </div>
    </div>
    <UserCard searchby_data={searchby_data} work_title={work_title} location_user={location_user}/> 
    <Filtermodel isOpen={isModalOpen} onClose={closeModal} setWork_title={setWork_title} setLocation_user={setLocation_user}/>
    </div>
  )
}
