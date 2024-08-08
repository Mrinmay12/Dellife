// MoreAction.js
import React, { useRef, useEffect,useState } from 'react';
import facebookIcon from "../Images/facebook.svg"
import whatsappIcon from "../Images/whatsapp.svg"
import copyIcon from "../Images/Copy.svg"
import { useSelector,useDispatch } from 'react-redux';
import { DeleteComment, ReportPost, User_post_save_or_not, UserSavePost } from '../../AllApi/Integrateapi';
import { setUpdate } from '../../redux/action/UpdateAction';
import ReportPostComment from './ReportPostComment';
import Commentmodel from '../CommentModel/Commentmodel';
import save from "../../Images/save.jpg"
const MoreAction = ({ isOpen, onRequestClose, post_id ,comment_id,edite_text,showonly}) => {

    
  const userlogin = useSelector(state => state.myReducer.data)
  const[show,setShow]=useState(false)
  const[copy_status,setCopy_status]=useState(false)
  const dispatch=useDispatch()
  const handleOpen=()=>{
      setShow(!show)
  }
  const[usersavepost,setUsersavepost]=useState(false)
  const handleSave=async()=>{
    setUsersavepost(!usersavepost)
    try {
      let json = JSON.stringify({
        user_id: userlogin.user_id
      })
      await UserSavePost(post_id, json)
    } catch (err) {

    }
  }

 
useEffect(()=>{
  const Postsave=async()=>{
    let res=await User_post_save_or_not(post_id,userlogin.user_id)
    if(res){
      setUsersavepost(res.data.user_post_save)
    }
  }
  if(post_id){
    Postsave()
  }
},[post_id])
const [isModalOpen, setIsModalOpen] = useState(false);
const [isModalOpen2, setIsModalOpen2] = useState(false);
const closeModal = () => {
  setIsModalOpen(false);
};
const closeModal2 = () => {
  setIsModalOpen2(false);
};

const handleDelete=async()=>{
let res =await DeleteComment(comment_id)
if(res){
  dispatch(setUpdate(comment_id))
  onRequestClose();
}
}

  const modalRef = useRef(null);
  const [inputValue, setInputValue] = useState('');
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onRequestClose();
        closeModal2()
        closeModal()
      }
    };

    const disableScroll = () => {
      document.body.style.overflow = 'hidden';
    };

    const enableScroll = () => {
      document.body.style.overflow = 'auto';
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      disableScroll();
    } else {
      enableScroll();
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      enableScroll();
    };
  }, [isOpen, onRequestClose]);
  if (!isOpen) return null;


 
  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.host}/sharepost/${post_id}`);
    // alert('Link copied to clipboard!');
    setCopy_status(true)
    setTimeout(() => {
        setCopy_status(false);
    }, 1000);
    // onRequestClose();
  };

  const handleReport=()=>{
    // onRequestClose();
    setIsModalOpen(true)
  }

  const handleSubmit =async () => {
    const json=JSON.stringify({
        report_text:inputValue
  })
  const response=await ReportPost( userlogin.user_id,post_id,json)
  if(response){
   dispatch(setUpdate(post_id))
   onRequestClose();
   setIsModalOpen(false)
  }
  };

  const handleClose=()=>{
    onRequestClose();
    setIsModalOpen(false)
  }
  return (
    <>
    <div style={styles.overlay}>
      <div style={styles.modal} ref={modalRef}>
      {isModalOpen ?(
        <>
          <div className="container2">
          <div className="radio" onClick={()=>setInputValue('Hateful or abusive post')}>
            <input id="radio-1" name="radio" type="radio"  value={inputValue}/>
            <label for="radio-1" className="radio-label">Hateful or abusive post</label>
          </div>
        
          <div className="radio" onClick={()=>setInputValue('Spam or misleading ytgytyt')}>
            <input id="radio-2" name="radio" type="radio" value={inputValue}/>
            <label  for="radio-2" className="radio-label">Spam or misleading </label>
          </div>
        
          <div className="radio" onClick={()=>setInputValue('other')}>
            <input id="radio-3" name="radio" type="radio" value={inputValue} />
            <label for="radio-3" className="radio-label">other</label>
          </div>
         
        </div>
        <div style={{paddingTop:"37px",justifyContent:"space-between",display:"flex"}}>
      <span onClick={()=>handleClose() } className="" style={{marginRight:"120px"}}>Close</span>
{inputValue?(
  <span onClick={handleSubmit} style={{color:"#0038ff"}}>Submit</span>
):(
  <span  style={{color:"gray"}}>Submit</span>
)}
</div>
        </>
    ):(
       <>
        <div style={{display:"flex",alignItems:"end",justifyContent:"end" }}>
        <h2 style={{ paddingBottom:"14px" }} onClick={()=>onRequestClose()}>X</h2>
        </div>
        <div style={styles.shareOptions}>
        {showonly==='comment'?(
            <>
        <button onClick={()=>setIsModalOpen2(true)} style={styles.link}>
        <i class="fa fa-pencil" style={{marginRight:"19px"}} ></i> Edit
          </button>
        
        <button onClick={()=>handleDelete()} style={styles.link}>
        <i class="fa fa-trash-o" style={{marginRight:"19px"}} ></i> Delete
          </button>
          </>
        ):(
<>
<button onClick={()=>handleSave()} style={styles.link}>
          <img style={{height:"17px",marginRight:"19px"}} src={save}/>{usersavepost?"Unsave":"Saved"}
            </button>
      
            <button onClick={()=>handleCopyLink()} style={styles.link}>
        <i class="fa fa-copy" style={{marginRight:"19px"}} ></i> {copy_status?'Copied!':'Copy'}
          </button>
      
            <button onClick={()=>handleReport()} style={styles.link}>
        <i class="fa fa-copy" style={{marginRight:"19px"}} ></i> Report
          </button>
</>
        )}
          
   
  
         </div>
       </> 
    )}
       

         </div>
    </div>
    {/* {isModalOpen && <ReportPostComment onClose={closeModal} postId={post_id}/>} */}
    

{isModalOpen2 && <Commentmodel onClose={closeModal2} commentId={comment_id} postId={post_id} edite_text={edite_text}/>}
    </>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex:1
  },
  modal: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    width: '300px',
    textAlign: 'center',

  },
  shareOptions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginBottom: '20px',
  },
  link: {
    textDecoration: 'none',
    color: '#007bff',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #007bff',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
  },
  button: {
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#007bff',
    color: 'white',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
  },
  icon: {
    width: '24px',
    height: '24px',
  },
  closeButton: {
    marginTop: '20px',
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#ccc',
    cursor: 'pointer',
  },
};

export default MoreAction;
