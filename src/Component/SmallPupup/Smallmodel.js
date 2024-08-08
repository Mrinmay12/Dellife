import React,{useState,useEffect, useRef} from 'react'
import "./Smallmodel.css"
import save from "../../Images/save.jpg"
import { DeleteComment, UserSavePost ,User_post_save_or_not} from '../../AllApi/Integrateapi'
import { useSelector,useDispatch } from 'react-redux';
import ReportPostComment from './ReportPostComment';
import { setUpdate } from '../../redux/action/UpdateAction';
import Commentmodel from '../CommentModel/Commentmodel';
import MoreAction from './MoreAction';
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


  const[open_model,setOpen_Model]=useState(false)
  const handleOpenModel=()=>{
    setOpen_Model(!open_model)
  }
  return (
    <div>

      <div class="dropdown">
    <div class="dropdown-btn icon clickable right" onClick={()=>handleOpenModel()}>•••</div>
   

</div>
 
 
  <MoreAction isOpen={open_model} onRequestClose={handleOpenModel} post_id={post_id} comment_id={comment_id} edite_text={edite_text} showonly={showonly}/>
 
  </div>
  )
}
