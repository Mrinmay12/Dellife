import React,{useRef} from 'react'
import Post from "../../Pages/Post";
import "./PostPopUp.css"
export default function PostPopUp({onClose}) {
    const modalRef = useRef(null);

  const handleClose=()=>{
    onClose()
  }
  return (
    <div className="modal-container" ref={modalRef} style={{width:"56%" }}>
      <div onClick={()=>handleClose()} className='closemodel'>
        <span className='Xicon'>X</span>
      </div>
        <Post only_use={"destop"} onClose={onClose}/>
    </div>
  )
}
