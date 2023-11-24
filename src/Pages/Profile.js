import React,{useState,useRef} from 'react'
import "./Profile.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit,faUser,faSave,faPencil} from '@fortawesome/free-solid-svg-icons';
import ImageModelPopup from '../Component/ImageModelPopup/ImageModelPopup';
import Button from '../Component/Button/Button';
import Postcard from '../Component/AllPostCard/Postcard';
export default function Profile() {
  const [showPopup, setShowPopup] = useState(false);
  const [popupImageUrl, setPopupImageUrl] = useState('');
  const[refress,setrefress]=useState("")
  const[ProfileImage,setProfileImage]=useState(null)
  const[pofileuploadstatus,setpofileuploadstatus]=useState(false)
const  ProfileImageRef= useRef()

  const handleClosePopup = () => {
    setPopupImageUrl('');
    setShowPopup(false);
  };
  const handleOpenPopup = (imageUrl) => {
    setPopupImageUrl(imageUrl);
    setShowPopup(true);
  };
  const [name,setName]=useState("")
const [email,setEmail]=useState("")
const [age,setAge]=useState("")
const [userid,setUserid]=useState("")
const[disable,setDisable]=useState(true)
const handleEdit=()=>{
  alert('hi')
}

const handleConvert=(a,b)=>{
alert(b)
}
const handleSave=()=>{
  setDisable(true)
}
const handleFileUpload = async (e) => {
  const file = e.target.files[0];
  setProfileImage(file)
  // const base64 = await convertToBase64(file);
  // setProfileImage2(base64);
};
  return (
    <div>
  
    <div className="containerprofile">
      <h1>Profile
      </h1>
     
      <div className="avatar-upload">
        <div className="avatar-edit">
          <input type='file' id="imageUpload" accept=".png, .jpg, .jpeg"  onChange={(e) => handleFileUpload(e)} name={ProfileImage} ref={ProfileImageRef}/>
          <label for="imageUpload"><FontAwesomeIcon icon={faPencil} style={{padding:"8px"}}/></label>
        </div>
        <div className="avatar-preview" onClick={()=>handleOpenPopup(ProfileImage)}>
          <div id="imagePreview" style={{ backgroundImage: `url(${ProfileImage})` }}>
          {pofileuploadstatus &&(

          <div style={{padding:"57px"}}>
          {/* <Loder/> */}
          </div>
          )}
          </div>
        </div>
      </div>
      
   
<Button value="Edit" handleClick={handleEdit}/>
<br/>
<hr/>
<div className='twobottom'>
<p className='makeprofile'>Make your Profile profession</p>
<Button value="Convert" handleClick={()=>handleConvert("mm","11")}/>
</div>

    </div>
    <Postcard/>

    {/* pupup */}
    {showPopup && (
      <ImageModelPopup imageUrl={popupImageUrl} onClose={handleClosePopup} setrefress={setrefress}/>
    )}
  </div>
  )
}
