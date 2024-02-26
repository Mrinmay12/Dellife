import React, { useState, useRef, useEffect } from 'react'
import "./Profile.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faUser, faSave, faPencil } from '@fortawesome/free-solid-svg-icons';
import ImageModelPopup from '../Component/ImageModelPopup/ImageModelPopup';
import Button from '../Component/Button/Button';
import OtherPostcard from '../Component/AllPostCard/OtherPostcard';
import { useSelector, useDispatch } from 'react-redux';
import Loder from '../Component/LoderComponent/Loder';
import { ProfilePicUpdate, SeeOtherUserProfile, UserProfilePic } from "../AllApi/Integrateapi"
import { setRefresh } from "../redux/action/RefreshAction";
import { useParams } from 'react-router-dom';
import { setData } from '../redux/action/LoginAction';
import EditProfile from '../Component/ProfileEdit/EditProfile';
import save from "../Images/save.jpg"
import card from "../Images/card.jpg"
export default function OtherUserProfile() {
  let { post_id } = useParams();
  const dispatch = useDispatch()
  const userlogin = useSelector(state => state.myReducer.data)
  const [showPopup, setShowPopup] = useState(false);
  const [popupImageUrl, setPopupImageUrl] = useState("");
  const [refress, setrefress] = useState("")
  const [ProfileImage, setProfileImage] = useState(null)
  const [pofileuploadstatus, setpofileuploadstatus] = useState(false)
  const ProfileImageRef = useRef()
  const [hidden, setHidden] = useState(false)
  const[user_name,setUsername]=useState("")
//   useEffect(() => {
//     if (userlogin) {
//       setPopupImageUrl(userlogin.user_pic)
//     }
//   }, [userlogin])



  const handleClosePopup = () => {
    // setPopupImageUrl('');
    setShowPopup(false);
  };
  const handleOpenPopup = (imageUrl) => {
    setPopupImageUrl(imageUrl);
    setShowPopup(true);
  };
 
 

  const handleConvert = (a, b) => {
    alert(b)
  }

 
  useEffect(() => {

    const Data = async () => {
      try {
        let response = await SeeOtherUserProfile(post_id, userlogin.user_id)
        // dispatch(setData(response.data.data))
        setPopupImageUrl(response.data.data.user_pic)
        setUsername(response.data.data.user_name)
        console.log(response.data.data);
      } catch (err) {
        console.log(err)
      }
    }
    if (post_id) {
      Data()
    }

  }, [post_id])
const[show,setShow]=useState("post")
  const handleShow=(e)=>{
    setShow(e)
  }
  return (
    <div>

      <div className="containerprofile">
        <h1>Profile
        </h1>

        <div className="avatar-upload">
          <div className="avatar-edit">
            <input type='file' id="imageUpload" accept=".png, .jpg, .jpeg"  name={ProfileImage} ref={ProfileImageRef} />
            
          </div>
          <div className="avatar-preview" onClick={() => handleOpenPopup(popupImageUrl)}>
            <div id="imagePreview" style={{ backgroundImage: `url(${popupImageUrl})` }}>
              {pofileuploadstatus && (

                <div style={{ padding: "57px" }}>
                  <Loder />
                </div>
              )}
            </div>
          </div>
        </div>
        <p className='user_name'>{user_name}</p>
        
          <div style={{ justifyContent: "center", display: "flex" }}>
            <Button value="Edit" backcolor={"dimgray"} />
            <div style={{ marginLeft: "29px" }}>
              <Button value="Advance setting" />
            </div>
          </div>

    
        <br />
        <hr />
    
         
      
        <div className='profilediv'>
        <div className='profilebottom'>
          <p  className={show==="post"?'profilebottomtext':"profilebottomtext2"} onClick={()=>handleShow("post")} style={{color:show==="post"?"red":"black"}}><img style={{height:"18px" ,marginRight:"4px"}} src={card}/>Posts</p>
          <p className={show==="about"?'profilebottomtext':"profilebottomtext2"} style={{color:show==="about"?"red":"black"}} onClick={()=>handleShow("about")}><FontAwesomeIcon icon={faUser} style={{ color: "black" ,height:"18px"}}  /> About</p>
        </div>
     </div>
      </div>
  
          {show==="post"?(
            <div className='centerpostcard'>
            <OtherPostcard post_id={post_id}/>
            </div>
          ):(
            <div className='centerpostcard'>
            <OtherPostcard post_id={post_id}/>
            </div>
          )}
        
  
      

      {/* pupup */}
      {showPopup && (
        <ImageModelPopup imageUrl={popupImageUrl} onClose={handleClosePopup} setrefress={setrefress} post_id="true" />
      )}
    </div>
  )
}
