import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import InputArea from '../UploadPost/InputArea';
import "./Comment.css"
const Commentmodel = ({ onClose,postId }) => {
  const userlogin = useSelector(state => state.myReducer.data)
  const [inputValue, setInputValue] = useState('');
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

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    // Handle submission logic
  };

  return (
    <div className="modal-container" ref={modalRef}>
      <img className="round-img" src={userlogin.user_pic} alt="Profile" />
      <div style={{paddingTop:"2px"}}/>
      {postId}
      {/* <InputArea/> */}
<textarea  type="text" className={"textarea" } style={{color:"black"}} value={inputValue}  placeholder="Enter Tittle" onChange={handleChange}/>
{/* <div> */}
<button onClick={handleSubmit} className="commentbtn">Submit</button>

{/* // </div> */}
    </div>
  );
};

export default Commentmodel;
