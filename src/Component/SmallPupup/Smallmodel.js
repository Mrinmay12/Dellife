import React,{useState,useEffect} from 'react'
import "./Smallmodel.css"
import save from "../../Images/save.jpg"
import { DeleteComment, UserSavePost ,User_post_save_or_not} from '../../AllApi/Integrateapi'
import { useSelector,useDispatch } from 'react-redux';
import ReportPostComment from './ReportPostComment';
import { setUpdate } from '../../redux/action/UpdateAction';
import Commentmodel from '../CommentModel/Commentmodel';
export default function Smallmodel({post_id,showonly,comment_id,edite_text}) {
  const userlogin = useSelector(state => state.myReducer.data)
    const[show,setShow]=useState(false)
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
  }
  }
  return (
    <>
    {showonly==='comment'?(
      <div class="dropdown">
    <div class="dropdown-btn icon clickable fa fa-ellipsis-v right"></div>
    <div class="dropdown-content" style={{marginLeft:"-37px"}}>
    <a onClick={()=>setIsModalOpen2(true)}><i class="fa fa-pencil" style={{marginRight:"19px"}} ></i>Edit</a>
<a onClick={()=>handleDelete()}><i class="fa fa-trash-o" style={{marginRight:"19px"}} ></i>Delete</a>
    </div>
  </div>
    ):(
      <div class="dropdown">
    <div class="dropdown-btn icon clickable fa fa-ellipsis-h right"></div>
    <div class="dropdown-content">
    <a onClick={handleSave}><img style={{height:"17px",marginRight:"19px"}} src={save}/>{usersavepost?"Unsave":"Saved"}</a>
    <a href="#about"><i class="fa fa-copy" style={{marginRight:"19px"}}></i>copy</a>
<a onClick={()=>setIsModalOpen(true)}><i class="fa fa-flag-o" style={{marginRight:"19px"}} ></i>Report</a>
    </div>
  </div>
    )}


  {isModalOpen && <ReportPostComment onClose={closeModal} postId={post_id}/>}

  {isModalOpen2 && <Commentmodel onClose={closeModal2} commentId={comment_id} postId={post_id} edite_text={edite_text}/>}
  </>
  )
}
