import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import InputArea from '../UploadPost/InputArea';
import "./Comment.css"
import { EditComment, userComment } from '../../AllApi/Integrateapi';
import { setEditdata } from '../../redux/action/EditAction';
import SendIcon from "./Send.svg"
const Commentmodel = ({ onClose, postId,commentId, edite_text }) => {
  const userlogin = useSelector(state => state.myReducer.data)
  const [inputValue, setInputValue] = useState('');
  const modalRef = useRef(null);
  const dispatch = useDispatch()
  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (modalRef.current && !modalRef.current.contains(event.target)) {
  //       onClose();
  //     }
  //   };

  //   document.addEventListener('mousedown', handleClickOutside);

  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, [onClose]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async () => {
    const json = JSON.stringify({
      post_id: postId,
      user_id: userlogin.user_id,
      user_comment: inputValue
    })
    const response = await userComment(json)
    if (response) {
      dispatch(setEditdata({
        comment_id: response.data.id,
        post_id: postId,
        user_pic: userlogin.user_pic,
        user_name: "You",
        user_comment: inputValue,
        user_edit:true
      }))
      onClose();
    }
  };

  const handleSubmit2 = async () => {
    if(inputValue.trim().length===0){
      onClose();
    }else{
      const json = JSON.stringify({
        user_comment: inputValue
      })
      const response = await EditComment(commentId, userlogin.user_id, json)
      if (response) {
        dispatch(setEditdata({
          comment_id:commentId,
          post_id: postId,
          user_pic: userlogin.user_pic,
          user_name: "You",
          user_comment: inputValue,
          user_edit:true
        }))
        onClose();
      }
    }
   
  }
  useEffect(() => {
    if (edite_text) {
      setInputValue(edite_text)
    }
  }, [edite_text])
  const handleClose=()=>{
    onClose()
  }
  return (
    <div className="modal-container" ref={modalRef}>
       <div onClick={()=>handleClose()} className='closemodel'>
        <span className='Xicon'>X</span>
      </div>
      <img className="round-img" src={userlogin.user_pic} alt="Profile" />
      <div style={{ paddingTop: "2px" }} />

      {/* <InputArea/> */}
      <textarea type="text" className={"textarea"} style={{ color: "black" }} value={inputValue} placeholder="Enter Tittle" onChange={handleChange} />
      {/* <div> */}
      {edite_text ? (
        <div onClick={handleSubmit2} className="commentbtn">
          <img src={SendIcon} style={{width:"20px",height:"20px"}} alt='' title='post'/>
        </div>
        
      ) : (
        <div onClick={handleSubmit} className="commentbtn">
          <img src={SendIcon} style={{width:"20px",height:"20px"}} alt='' title='post'/>
        </div>
      )}


      {/* // </div> */}
    </div>
  );
};

export default Commentmodel;
