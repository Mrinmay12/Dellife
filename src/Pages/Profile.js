import React, { useState, useRef, useEffect } from 'react'
import "./Profile.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faUser, faSave, faPencil } from '@fortawesome/free-solid-svg-icons';
import ImageModelPopup from '../Component/ImageModelPopup/ImageModelPopup';
import Button from '../Component/Button/Button';
import Postcard from '../Component/AllPostCard/Postcard';
import { useSelector, useDispatch } from 'react-redux';
import Loder from '../Component/LoderComponent/Loder';
import { ProfilePicUpdate, SeeOtherUserProfile, UserProfilePic } from "../AllApi/Integrateapi"
import { setRefresh } from "../redux/action/RefreshAction";
import { useParams } from 'react-router-dom';
import { setData } from '../redux/action/LoginAction';
export default function Profile() {
  let { post_id } = useParams();
  const dispatch = useDispatch()
  const userlogin = useSelector(state => state.myReducer.data)
  console.log(userlogin, "userId");
  const [showPopup, setShowPopup] = useState(false);
  const [popupImageUrl, setPopupImageUrl] = useState("");
  const [refress, setrefress] = useState("")
  const [ProfileImage, setProfileImage] = useState(null)
  const [pofileuploadstatus, setpofileuploadstatus] = useState(false)
  const ProfileImageRef = useRef()
  const[hidden,setHidden]=useState(false)
  useEffect(() => {
    if (userlogin) {
      setPopupImageUrl(userlogin.user_pic)
    }
  }, [userlogin])

useEffect(()=>{
  if(post_id){
    setHidden(true) 
  }else if(userlogin?.user_id!==""){
    setHidden(false)
  }else{
    setHidden(true) 
  }
},[userlogin])

  const handleClosePopup = () => {
    // setPopupImageUrl('');
    setShowPopup(false);
  };
  const handleOpenPopup = (imageUrl) => {
    setPopupImageUrl(imageUrl);
    setShowPopup(true);
  };
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [age, setAge] = useState("")
  const [userid, setUserid] = useState("")
  const [disable, setDisable] = useState(true)
  const handleEdit = () => {
    alert('hi')

  }

  const handleConvert = (a, b) => {
    alert(b)
  }
  const handleSave = () => {
    setDisable(true)
  }

  //base64 convert 
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setProfileImage(base64)
  
  };
  // useEffect(() => {
  //   if (ProfileImage !== null) {
  //     const formData = new FormData();
  //     formData.append('image', ProfileImage);
  //     const UpdateProfile = async () => {
  //       try {
  //         setpofileuploadstatus(true)
  //         let res = await ProfilePicUpdate(userlogin.user_id, formData)
  //         console.log(res.data.user_pic,"myres")
  //         if (res && res.data && res.data.data.user_pic) {
  //           setPopupImageUrl(res.data.data.user_pic);
  //         }
  //       } catch (err) {
  //         console.log(err);
  //       } finally {
  //         setpofileuploadstatus(false)
  //         dispatch(setRefresh(new Date().getMilliseconds()))
  //         setProfileImage(null)
  //       }
       
  //     }
  //     UpdateProfile()
  //   }
  // }, [ProfileImage])
  const ProfileImageupload=async()=>{
    const json={
      profile_img:ProfileImage,
      user_id:userlogin.user_id
    }
    try {
      setpofileuploadstatus(true)
      const response = await ProfilePicUpdate(json);
  
      if (response) {
        setpofileuploadstatus(false)
        
      }
    } catch (error) {
      console.error(error);
    }finally{
      dispatch(setRefresh(new Date().getMilliseconds()))
      // setrefress(new Date().getMilliseconds())
    }
  }
  useEffect(() => {
    if (ProfileImage !== null) {
      ProfileImageupload()
    }
  },[ProfileImage])
 
  useEffect(()=>{
  
const Data=async()=>{
  try{
  let response=await SeeOtherUserProfile(post_id,userlogin.user_id)
  dispatch(setData(response.data.data))
  console.log(response.data.data);
}catch(err){
  console.log(err)
}
}
if(post_id){
  Data() 
}
  
  },[post_id])
console.log(userlogin.user_id,"userlogin.user_id",hidden);
  return (
    <div>

      <div className="containerprofile">
        <h1>Profile
        </h1>

        <div className="avatar-upload">
          <div className="avatar-edit">
            <input type='file' id="imageUpload" accept=".png, .jpg, .jpeg" onChange={(e) => handleFileUpload(e)} name={ProfileImage} ref={ProfileImageRef} />
            {!hidden && (
              <label for="imageUpload"><FontAwesomeIcon icon={faPencil} style={{ padding: "8px" }} /></label>
            )}
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
        <p>{userlogin.user_name}</p>
{!hidden &&(

        <Button value="Edit" handleClick={handleEdit} />
)}
        <br />
        <hr />
        <div className='twobottom'>
          <p className='makeprofile'>Make your Profile profession</p>
          <Button value="Convert" handleClick={() => handleConvert("mm", "11")} />
        </div>

      </div>
      <Postcard />

      {/* pupup */}
      {showPopup && (
        <ImageModelPopup imageUrl={popupImageUrl} onClose={handleClosePopup} setrefress={setrefress} />
      )}
    </div>
  )
}
