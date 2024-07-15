import React,{useRef} from 'react'
import Post from "../../Pages/Post";
export default function PostPopUp({onClose}) {
    const modalRef = useRef(null);
  return (
    <div className="modal-container" ref={modalRef}>
        <Post only_use={"destop"} onClose={onClose}/>
    </div>
  )
}
