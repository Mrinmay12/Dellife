import React,{useRef,useEffect} from 'react'
import phoneImage  from "../Images/phone.svg"
export default function SideModel4({onClose,title,use_for}) {
    const modalRef = useRef(null);
    useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleClose=()=>{
    onClose();
  }
  return (
    <div className="modal-container" ref={modalRef}>
      <div style={{ display:"flex" }}>
       {use_for && <img src={phoneImage} alt='' width="19px" style={{ marginRight:"13px" }}/>}
        <h3>{title}</h3></div>
        <div style={{ border:"", textAlign:"center"}}>
                    <button onClick={()=>handleClose()} className="model-close-button" 
                     style={{  display:"inline-block", padding:"4px 10px",alignSelf:"center", backgroundColor:"#fff"}}>
                      Close
                    </button>
                    </div>
        </div>
  )
}
