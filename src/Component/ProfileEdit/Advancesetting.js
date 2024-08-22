import React,{useState,useEffect,useRef} from 'react'
import { Delete_profile, Profile_Lock_Unlock } from '../../AllApi/Integrateapi'
import Button from '../Button/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setRefresh } from '../../redux/action/RefreshAction';
export default function Advancesetting({userlogin,setSetting_ope,profile_lock}) {
  const dispatch=useDispatch()
    const modalRef = useRef(null);
    const navigate=useNavigate()
    const handlePrivate=()=>{

    }
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const handleDelete= async()=>{
        setIsModalOpen(true)
     
    }
const handleLogout=()=>{
  setIsModalOpen2(true)
}
   

    const closeModal = () => {
      setIsModalOpen(false);
    };
    const closeModal2 = () => {
      setIsModalOpen2(false);
    };
    useEffect(() => {
        const handleClickOutside = (event) => {
          if (modalRef.current && !modalRef.current.contains(event.target)) {
            closeModal();
          }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
    
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, [isModalOpen]);
    useEffect(() => {
        const handleClickOutside = (event) => {
          if (modalRef.current && !modalRef.current.contains(event.target)) {
            closeModal2();
          }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
    
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, [isModalOpen2]);

      const handleDeleteProfile=async()=>{
        let res= await  Delete_profile(userlogin?.user_id)
     if(res){
        localStorage.removeItem("token")

          dispatch(setRefresh(new Date().getMilliseconds()))

        // navigate("/")
     }
      }

      const handleLogoutuser=()=>{
        localStorage.removeItem("token")
        dispatch(setRefresh(new Date().getMilliseconds()))
        window.location.reload()
      }
      const [lock_unlock,setLock_Unlock]=useState(profile_lock)
      const handle_Lock_Unlock_Profile=async()=>{
        let res= await  Profile_Lock_Unlock(userlogin?.user_id)
     if(res){
      setLock_Unlock((pre)=>!pre)

        // navigate("/")
     }
      }
  return (
    <div>
      <div style={{marginTop:"20px",marginBottom:"30px"}}>
        <Button value="Logout" handleClick={handleLogout} backcolor={"#696969bd"} icon={<i class="fa fa-sign-out"></i>}/>
        </div>
    {/* <div style={{display:"flex",paddingTop:"20px"}}>
  <FontAwesomeIcon icon={faArrowLeft} onClick={()=>setSetting_ope(false)} style={{ padding: "8px" }} /><p style={{fontSize:"20px"}}>Back</p>
    </div>
    <div style={{marginTop:"20px"}}>
        <Button value={`Make profile ${lock_unlock?"public":"private"}`} handleClick={handle_Lock_Unlock_Profile} backcolor={"#696969bd"} icon={lock_unlock?<i class="fa fa-lock"></i>:<i class="fa fa-unlock"></i>}/>
        </div>
        <div style={{marginTop:"20px"}}>
        <Button value="Logout" handleClick={handleLogout} backcolor={"#696969bd"} icon={<i class="fa fa-sign-out"></i>}/>
        </div>
        <div style={{marginTop:"20px"}}>
        <Button value="Delete profile" handleClick={handleDelete} backcolor={"red"} icon={<i class="fa fa-trash"></i>}/>
        </div>
        {isModalOpen &&(
            <>
            <div className="modal-container" ref={modalRef}>
            <p className='sharetext' style={{width:"102%"}}>Are you sure you want to delete your account?</p>
            <div style={{display:"flex",marginTop:"3px"}}>
            <Button value="Cancel" handleClick={closeModal} backcolor={"blur"}/>
            <div style={{paddingLeft:"10px"}}>
            <Button value="Delete" handleClick={handleDeleteProfile} backcolor={"red"}/>
            </div>
            </div>
            </div>
            </>
        )} */}
        {isModalOpen2 &&(
            <>
            <div className="modal-container" ref={modalRef}>
            <p className='sharetext' style={{width:"102%"}}>Are you sure to logout?</p>
            <div style={{display:"flex",marginTop:"3px",justifyContent:"space-between",marginTop:"13px",width:"200px"}}>
            <Button value="Cancel" handleClick={closeModal2} backcolor={"blur"}/>
            {/* <div style={{paddingLeft:"10px"}}> */}
            <Button value="Logout" handleClick={handleLogoutuser} backcolor={"red"}/>
            {/* </div> */}
            </div>
            </div>
            </>
        )}
    </div>
  )
}
