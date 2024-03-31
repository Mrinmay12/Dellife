import React,{useState,useEffect,useRef} from 'react'
import { Delete_profile } from '../../AllApi/Integrateapi'
import Button from '../Button/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
export default function Advancesetting({userlogin,setSetting_ope}) {
    const modalRef = useRef(null);
    const navigate=useNavigate()
    const handlePrivate=()=>{

    }
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleDelete= async()=>{
        setIsModalOpen(true)
     
    }

   

    const closeModal = () => {
      setIsModalOpen(false);
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

      const handleDeleteProfile=async()=>{
        let res= await  Delete_profile(userlogin?.user_id)
     if(res){
        localStorage.removeItem("token")
        navigate("/login")
     }
      }
  return (
    <div>
    <div style={{display:"flex",paddingTop:"20px"}}>
  <FontAwesomeIcon icon={faArrowLeft} onClick={()=>setSetting_ope(false)} style={{ padding: "8px" }} /><p style={{fontSize:"20px"}}>Back</p>
    </div>
    <div style={{marginTop:"20px"}}>
        <Button value="Make profile private" handleClick={handlePrivate} backcolor={"#696969bd"}/>
        </div>
        <div style={{marginTop:"20px"}}>
        <Button value="Hide profile" handleClick={handlePrivate} backcolor={"#696969bd"}/>
        </div>
        <div style={{marginTop:"20px"}}>
        <Button value="Delete profile" handleClick={handleDelete} backcolor={"red"}/>
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
        )}
    </div>
  )
}
