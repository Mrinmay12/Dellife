import React from 'react';
import "./Popup.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose,faTrash} from '@fortawesome/free-solid-svg-icons';
import { Delete_profile_Pic } from '../../AllApi/Integrateapi';
import { useSelector } from 'react-redux';
import { setData } from '../../redux/action/LoginAction';
import { useDispatch } from 'react-redux';
const ImageModelPopup = ({ imageUrl, onClose ,setrefress,post_id}) => {
  const dispatch=useDispatch()
  const userlogin = useSelector(state => state.myReducer.data)
  let default_img=userlogin.sex==="1"? 'https://firebasestorage.googleapis.com/v0/b/voter-29270.appspot.com/o/boypic.jpg?alt=media&token=6d9dc8a7-8c16-48d6-8df2-8e37c6cef89b':'https://firebasestorage.googleapis.com/v0/b/voter-29270.appspot.com/o/girlpic.jpg?alt=media&token=9227e456-c6ea-414f-87a0-991bce8b81a2'
  const deleteImage=async()=>{
    try {
      const response = await Delete_profile_Pic(userlogin.user_id)
      if(response){
        // setrefress(new Date().getMilliseconds())
        dispatch(setData({...userlogin,user_pic:default_img,user_pic_present:false}))
        onClose(true)
      }
  }catch(err){
    console.log(err)
  }
  }
  
  
  return (
    <div className="image-popup">
      <div className="image-content">
        <img src={imageUrl} alt="Popup Image" />
        {/* <button onClick={onClose}>Close</button> */}
        <FontAwesomeIcon icon={faClose} style={{height:"24px",width:"40px",backgroundColor:"white",borderRadius:"9px"}} className="closebutton" onClick={onClose}/>
        {!post_id && userlogin.user_pic_present ?(
          <FontAwesomeIcon icon={faTrash} style={{height:"27px",width:"40px",color:"red"}} className="deleteicon" onClick={deleteImage}/>
        ):''}
       
      </div>
    </div>
  );
};

export default ImageModelPopup;
