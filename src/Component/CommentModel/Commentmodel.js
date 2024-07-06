import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import InputArea from '../UploadPost/InputArea';
import "./Comment.css"
import { EditComment, userComment } from '../../AllApi/Integrateapi';
import { setEditdata } from '../../redux/action/EditAction';
const Commentmodel = ({ onClose, postId, edite_text }) => {
  const userlogin = useSelector(state => state.myReducer.data)
  const [inputValue, setInputValue] = useState('');
  const modalRef = useRef(null);
  const dispatch = useDispatch()
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
        user_pic: userlogin.user_pic,
        user_name: "You",
        user_comment: inputValue,
        user_edit:true
      }))
      onClose();
    }
  };

  const handleSubmit2 = async () => {
    const json = JSON.stringify({
      user_comment: inputValue
    })
    const response = await EditComment(postId, userlogin.user_id, json)
    if (response) {
      dispatch(setEditdata({
        comment_id:postId,
        user_pic: userlogin.user_pic,
        user_name: "You",
        user_comment: inputValue,
        user_edit:true
      }))
      onClose();
    }
  }
  useEffect(() => {
    if (edite_text) {
      setInputValue(edite_text)
    }
  }, [edite_text])
  return (
    <div className="modal-container" ref={modalRef}>
      <img className="round-img" src={userlogin.user_pic} alt="Profile" />
      <div style={{ paddingTop: "2px" }} />

      {/* <InputArea/> */}
      <textarea type="text" className={"textarea"} style={{ color: "black" }} value={inputValue} placeholder="Enter Tittle" onChange={handleChange} />
      {/* <div> */}
      {edite_text ? (
        <button onClick={handleSubmit2} className="commentbtn">Save</button>
      ) : (
        <button onClick={handleSubmit} className="commentbtn">Submit</button>
      )}


      {/* // </div> */}
    </div>
  );
};

export default Commentmodel;
