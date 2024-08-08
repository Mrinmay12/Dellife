import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import "./ReportPost.css"
import { ReportPost } from '../../AllApi/Integrateapi';
import { setUpdate } from '../../redux/action/UpdateAction';
const ReportPostComment = ({ onClose,postId }) => {
  const userlogin = useSelector(state => state.myReducer.data)
  const [inputValue, setInputValue] = useState('');
  const modalRef = useRef(null);
  const dispatch=useDispatch()
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

  const handleSubmit =async () => {
    const json=JSON.stringify({
        report_text:inputValue
  })
  const response=await ReportPost( userlogin.user_id,postId,json)
  if(response){
   dispatch(setUpdate(postId))
    onClose();
  }
  };

  return (
    <div className="modal-container2" ref={modalRef}>
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
      <span onClick={()=>onClose()} className="" style={{marginRight:"120px"}}>Close</span>
{inputValue?(
  <span onClick={handleSubmit} style={{color:"#0038ff"}}>Submit</span>
):(
  <span  style={{color:"gray"}}>Submit</span>
)}
   
</div>


</div>

  );
};

export default ReportPostComment;
