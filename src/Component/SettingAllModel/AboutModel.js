import React,{useState,useRef, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import "../FilterModel/Filtermodel.css"
import './SettingModel.css'
import CalenderIcon from "../Images/calendarIcon.svg"
import MailIcon from "../Images/Mail.svg"
import LocationIcon from "../Images/Userlocation.svg"
import { DateShowMonth } from '../../Utiles';
import Button from '../Button/Button';
import { Delete_profile, Number_Lock_Unlock } from '../../AllApi/Integrateapi';
import { setRefresh } from '../../redux/action/RefreshAction';
export default function AboutModel({isOpen, onClose}) {
    const dispatch=useDispatch()
    const userlogin = useSelector(state => state.myReducer.data)
    const userlocation = useSelector((state) => state.UserLocation.data);
    const modalRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleDelete= async()=>{
        setIsModalOpen(true)
     
    }
    const handleDeleteProfile=async()=>{
        let res= await  Delete_profile(userlogin?.user_id)
     if(res){
        localStorage.removeItem("token")

          dispatch(setRefresh(new Date().getMilliseconds()))

        // navigate("/")
     }
      }

      
    const closeModal = () => {
        setIsModalOpen(false);
      };
      const Hide_Show=async()=>{
        try{
       let res= Number_Lock_Unlock(userlogin.user_id)
        }catch(err){

        }
      }
      const [isChecked, setIsChecked] = useState(userlogin.mobile_see);
      const handleToggle = () => {
        setIsChecked(!isChecked);
        Hide_Show()
      };
  
     
 


  return (
    <div className={`modal-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}>
    <div
      className={`modal-content ${isOpen ? 'slide-up' : 'slide-down'}`}
      onClick={e => e.stopPropagation()}
    >
        <h2>About your account</h2>
        <div style={{ display:"flex",justifyContent:"center" ,marginTop:"16px"}}>
       <img  className='model_user_image' src={userlogin.user_pic} alt=''/>
   
       </div>
       <div style={{ display:"flex",justifyContent:"center",marginTop:"9px" }}>
       <h3>{userlogin.user_name}</h3>
       </div>

<div style={{ display:"flex" }}>
       <img src={CalenderIcon} width='23px' alt=''/>
       <div style={{ marginLeft:"17px",marginTop:"11px" }}>
       <p style={{ fontWeight:700 }}>Date joined</p>
       <span>{DateShowMonth(userlogin.account_Create_time)}</span>
       </div>
       </div>

     

<div style={{ display:"flex" }}>
       <img src={MailIcon} width='23px' alt=''/>
       <div style={{ marginLeft:"17px",marginTop:"11px" }}>
       <p style={{ fontWeight:700 }}>Email</p>
       <span>{userlogin.email}</span>
       </div>
       </div>
    
       <div style={{ display:"flex" }}>
       <img src={CalenderIcon} width='23px' alt=''/>
       <div style={{ marginLeft:"17px",marginTop:"11px" }}>
       <p style={{ fontWeight:700 }}>Your number see your's all posts</p>
       <span> <label className="toggle-switch">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleToggle}
        />
        <span className="slider round"></span>
      </label></span>
       </div>
       </div>

       <div style={{ display:"flex" }}>
       <img src={LocationIcon} width='23px' alt=''/>
       <div style={{ marginLeft:"17px",marginTop:"11px" }}>
       <p style={{ fontWeight:700 }}>Location</p>
       <span>{userlocation.locationName}</span>
       </div>
       </div>

       <div style={{marginTop:"20px"}}>
        <Button value="Delete profile" handleClick={handleDelete} backcolor={"red"} icon={<i class="fa fa-trash"></i>}/>
        </div>
        {isModalOpen &&(
            <>
            <div className="modal-container" ref={modalRef} style={{ width:"300px" }}>
            <p className='sharetext' style={{width:"102%"}}>Are you sure you want to delete your account?</p>
            <div style={{display:"flex",marginTop:"3px"}}>
            <Button value="Cancel" handleClick={closeModal} backcolor={"blur"}/>
            <div style={{paddingLeft:"10px"}}>
            <Button value="Delete" handleClick={handleDeleteProfile} backcolor={"red"}/>
            </div>
            </div>
            </div>
            </>
        )}
        </div>
        </div>
  )
}
