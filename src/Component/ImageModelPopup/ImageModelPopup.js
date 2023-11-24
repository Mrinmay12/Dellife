import React from 'react';
import "./Popup.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose,faTrash} from '@fortawesome/free-solid-svg-icons';
// import apiUrl from '../../ApiAxios';
const ImageModelPopup = ({ imageUrl, onClose ,setrefress}) => {
  const deleteImage=async()=>{
  //   try {
  //     const response = await apiUrl.post('api/user/UserProfile/userImage/image/delete',JSON.stringify({user_id:"Mrindgddb2"}))
  //     if(response.data.status===true){
  //       setrefress(new Date().getMilliseconds())
  //       onClose(true)
  //     }
  // }catch(err){
  //   console.log(err)
  // }
  }
  return (
    <div className="image-popup">
      <div className="image-content">
        <img src={imageUrl} alt="Popup Image" />
        {/* <button onClick={onClose}>Close</button> */}
        <FontAwesomeIcon icon={faClose} style={{height:"24px",width:"40px"}} className="closebutton" onClick={onClose}/>
        <FontAwesomeIcon icon={faTrash} style={{height:"27px",width:"40px",color:"red"}} className="deleteicon" onClick={deleteImage}/>
      </div>
    </div>
  );
};

export default ImageModelPopup;
