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

  const [showModal, setShowModal] = useState(false);
 

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  return (
    <>
   <button onClick={toggleModal} className="three-dot-button">
                •••
              </button>
   
            {showModal && (
              <div className="messagemodal">
                <div className="" style={{ flexDirection:"column" }}>
                  <div style={{ display: "flex", }}>
                   <p>
                      Unblock User
                    </p>
                  </div>
                  <div style={{ border:"", textAlign:"center"}}>
                    <button onClick={toggleModal} className="model-close-button" 
                     style={{  display:"inline-block", padding:"4px 10px",alignSelf:"center", backgroundColor:"#fff"}}>
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
  {isModalOpen && <ReportPostComment onClose={closeModal} postId={post_id}/>}

  {isModalOpen2 && <Commentmodel onClose={closeModal2} commentId={comment_id} postId={post_id} edite_text={edite_text}/>}
  </>
  )
}
