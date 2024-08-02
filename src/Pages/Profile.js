import React, { useState, useRef, useEffect } from 'react'
import "./Profile.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faUser, faSave, faPencil } from '@fortawesome/free-solid-svg-icons';
import ImageModelPopup from '../Component/ImageModelPopup/ImageModelPopup';
import Button from '../Component/Button/Button';
import Postcard from '../Component/AllPostCard/Postcard';
import SavePostcard from '../Component/AllPostCard/SavePostcard';
import { useSelector, useDispatch } from 'react-redux';
import Loder from '../Component/LoderComponent/Loder';
import { ProfilePicUpdate, SeeOtherUserProfile, UpdateUser, UserProfilePic } from "../AllApi/Integrateapi"
import { setRefresh } from "../redux/action/RefreshAction";
import { useParams } from 'react-router-dom';
import { setData } from '../redux/action/LoginAction';
import EditProfile from '../Component/ProfileEdit/EditProfile';
import save from "../Images/save.jpg"
import card from "../Images/card.jpg"
import ShareDetailsmodel from '../Component/DetailsShareModel/ShareDetailsmodel';
import Advancesetting from '../Component/ProfileEdit/Advancesetting';
import CardSetting from '../Component/SettingCard/CardSetting';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import SideModel from '../Component/SidePopup/SideModel';
import SideModel2 from '../Component/SidePopup/SideModel2';
import { useNavigate } from 'react-router-dom';
import userIcon from "../Component/Images/userIcon.svg"
import lockIcon from "../Component/Images/lockIcon.svg"
import SecurityIcon from '../Component/Images/cyber-security-Icon.svg'
import blockIcon from '../Component/Images/blockIcon.svg'
import AboutModel from '../Component/SettingAllModel/AboutModel';
import AccountPoliceModel from '../Component/SettingAllModel/AccountPoliceModel';
import SideModel3 from '../Component/SidePopup/SideModel3';
import SideModel4 from '../Component/SidePopup/SideModel4';
export default function Profile() {
  let { post_id } = useParams();
  const dispatch = useDispatch()
  const navigator=useNavigate()
  const userlogin = useSelector(state => state.myReducer.data)
  const [showPopup, setShowPopup] = useState(false);
  const [showPopup2, setShowPopup2] = useState(false);
  const [popupImageUrl, setPopupImageUrl] = useState("");
  const [refress, setrefress] = useState("")
  const [ProfileImage, setProfileImage] = useState(null)
  const [pofileuploadstatus, setpofileuploadstatus] = useState(false)
  const ProfileImageRef = useRef()
  const [hidden, setHidden] = useState(false)
  const [setting_ope,setSetting_ope]=useState(false)
  useEffect(() => {
    if (userlogin) {
      setPopupImageUrl(userlogin.user_pic)
    }
  }, [userlogin])

  useEffect(() => {
    if (post_id) {
      setHidden(true)
    } else if (userlogin?.user_id !== "") {
      setHidden(false)
    } else {
      setHidden(true)
    }
  }, [userlogin])

  const handleClosePopup = () => {
    // setPopupImageUrl('');
    setShowPopup(false);
  };
  const handleClosePopup2 = () => {
    // setPopupImageUrl('');
    setShowPopup2(false);
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
  const [editshow, setEditshow] = useState(false)
  const [editjson,setEditejson]=useState({})
  const [loding,setLoding]=useState(false)
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleEdit = async() => {
    // setEditshow((pre) => !pre)
    // setSetting_ope(false)
    setIsModalOpen(true)
  }
  const handleEdit2 = async() => {
    setLoding(true)
    setEditshow((pre) => !pre)
    try {
      const response = await UpdateUser(editjson);

      if (response) {
        setLoding(false)

      }
    } catch (error) {
      console.error(error);
      setLoding(false)
    } finally {
      dispatch(setRefresh(new Date().getMilliseconds()))
      // setrefress(new Date().getMilliseconds())
    }
   

  }

  const handleConvert = (a, b) => {

  }
  const handleSave = () => {
    setDisable(true)
  }

  //base64 convert 
  const MAX_FILE_SIZE = 6862851000000; // set your desired maximum file size in bytes

  const resizeImage = (file) => {
    return new Promise((resolve) => {
      const img = new Image();

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        const MAX_WIDTH = 800; // set your desired maximum width
        const MAX_HEIGHT = 600; // set your desired maximum height

        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;

        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob((blob) => {
          resolve(blob);
        }, 'image/jpeg', 0.7); // adjust the quality if needed
      };

      img.src = URL.createObjectURL(file);
    });
  };

  const convertToBase64 = async (file) => {
    const resizedBlob = await resizeImage(file);
    const base64 = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(resizedBlob);
      reader.onloadend = () => {
        resolve(reader.result);
      };
    });

    return base64;
  };


  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    // console.log(file.size, 'jjjjjjjjj',MAX_FILE_SIZE);
    if (file.size > MAX_FILE_SIZE) {
      // Handle the case where the file size is too large
      console.log('File size exceeds the maximum allowed size');
      return;
    }

    console.log(file.size, 'jjjjjjjjj');
    const base64 = await convertToBase64(file);
    setProfileImage(base64);

  };

  const ProfileImageupload = async () => {
    const json = {
      profile_img: ProfileImage,
      user_id: userlogin.user_id
    }
    try {
      setpofileuploadstatus(true)
      const response = await ProfilePicUpdate(json);

      if (response) {
        setpofileuploadstatus(false)

      }
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setRefresh(new Date().getMilliseconds()))
      // setrefress(new Date().getMilliseconds())
    }
  }
  useEffect(() => {
    if (ProfileImage !== null) {
      ProfileImageupload()
    }
  }, [ProfileImage])

  useEffect(() => {

    const Data = async () => {
      try {
        let response = await SeeOtherUserProfile(post_id, userlogin.user_id)
        dispatch(setData(response.data.data))
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

const [isSidebarOpen2, setSidebarOpen2] = useState(false);
const [isSidebarOpen3, setSidebarOpen3] = useState(false);
const [isSidebarOpen, setSidebarOpen] = useState(false);

const [isSettingOpen, setisSettingOpen] = useState(false);
const [isSettingOpen1, setisSettingOpen1] = useState(false);

  const handleShow=(e)=>{
    setShow(e)
    setEditshow(false)
    setSetting_ope(false)
  }


  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSetting=()=>{
    setSetting_ope(true)
  }
  const handleBlock=()=>{
    if(userlogin.user_block_list){
      setSidebarOpen3(!isSidebarOpen3)
    }else{
    setShowPopup2(true)
    }
    // setSidebarOpen3(!isSidebarOpen3)
  }
  const handlePrivacy=()=>{
  //  navigator('/Privacy-policy')
  window.open('/Privacy-policy', '_blank')
  }

  const handleAbout=()=>{
    setisSettingOpen(true)
  }
  const handleAccount=()=>{
    setisSettingOpen1(true)
  }


  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };


  const toggleSidebar2 = () => {
    setSidebarOpen2(!isSidebarOpen2);
  };
  const toggleSidebar3 = () => {
    setSidebarOpen3(!isSidebarOpen3);
  };

  const toggSetting = () => {
    setisSettingOpen(!isSettingOpen);
  };
  const toggSetting1 = () => {
    setisSettingOpen1(!isSettingOpen1);
  };
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
        <p className='user_name user_name_name' >{userlogin.user_name}</p>
        <div style={{ justifyContent: "center", display: "flex" }}>
              <button class="edit-profile-btn" onClick={handleEdit}>Edit Profile</button>
              <button class="edit-profile-btn" onClick={handleSetting} style={{ marginLeft:"19px" }}>Setting</button>
              </div>
              <div class="profile-stats">
            <div class="stat">
                <span class="number">{userlogin.total_post}</span>
                <span class="label">Posts</span>
            </div>
            <div class="stat" onClick={()=>toggleSidebar ()}>
                <span class="number">{userlogin.total_follow}</span>
                <span class="label">Followers</span>
            </div>
            <div class="stat" onClick={()=>toggleSidebar2 ()}>
                <span class="number">{userlogin.total_following}</span>
                <span class="label">Following</span>
            </div>
        </div>
        {/* {!editshow ? (
          <div style={{ justifyContent: "center", display: "flex" }}>
              <button class="edit-profile-btn" onClick={handleEdit}>Edit Profile</button>
              <button class="edit-profile-btn" onClick={handleSetting}>Setting</button>
            <Button value="Edit" handleClick={handleEdit} backcolor={"dimgray"} icon={<i class="fa fa-pencil"></i>}/> 
           <div style={{ marginLeft: "29px" }}>
              <Button value="Setting" handleClick={handleSetting} icon={<i class="fa fa-gear"></i>}/>
            </div>
        
          </div>

        ):(
          <div>
          {loding?(
            <p style={{color:"#4caf50",fontSize:"22px",textAlign:"end",paddingRight:"36px",marginTop:"2px",cursor:"pointer"}} ><button className='postbtn'>Saved....</button></p>
          ):(
            <p style={{color:"#4caf50",fontSize:"22px",textAlign:"end",paddingRight:"36px",marginTop:"2px",cursor:"pointer"}} onClick={()=>handleEdit2()}><button className='postbtn'>Save</button></p>
          )}
          
          </div>
        )} */}
        <br />
        {/* <hr /> */}
    
          <>

            {/* <div className='twobottom'>
              <p className='makeprofile'>Make your Profile profession</p>
              <Button value="Convert" handleClick={() => handleConvert("mm", "11")} />
            </div> */}
          </>
          {!setting_ope &&(
          <>
          {!editshow ?(
      <div className='profilediv'>
        <div className='profilebottom'>
          <p  className={show==="post"?'profilebottomtext':"profilebottomtext2"} onClick={()=>handleShow("post")} style={{color:show==="post"?"red":"black"}}><img style={{height:"18px" ,marginRight:"4px"}} src={card}/>Posts</p>
          <p className={show==="save"?'profilebottomtext':"profilebottomtext2"} style={{color:show==="save"?"red":"black"}} onClick={()=>handleShow("save")}><img style={{height:"18px"}} src={save}/> Saved</p>
        </div>
        </div>
          ):null}
          </>
          )}
      </div>
      <>
    
        { !setting_ope ?(
<>
{!editshow ? (
        <>
          {show==="post"?(
            <div className='centerpostcard'>
            <Postcard user_id={userlogin.user_id}/>
            </div>
          ):(
            <div className='centerpostcard'>
            <SavePostcard user_id={userlogin.user_id}/>
            </div>
          )}
        </>
        
      ) : (
      <div className='editprofile'>
    
      
        </div>
      )}
</>
        ):(
          <>
          <div className='editprofile'>
          <div style={{ display:"flex",marginTop:"12px" }}>
        <FontAwesomeIcon icon={faArrowLeft} onClick={()=>setSetting_ope(false)} style={{ padding: "3px",width:"25px",cursor:"pointer" }} />
        <h3>Setting</h3>
        </div>
         <CardSetting title={'About your account'} onClickSetting={handleAbout} img={userIcon}/>
         <CardSetting title={'Account policy'} onClickSetting={handleAccount} img={lockIcon} profile_lock={userlogin.profile_lock?'private':'public'}/>
         <CardSetting title={'Privacy policy'} onClickSetting={handlePrivacy} img={SecurityIcon} />
         <CardSetting title={'Blocked'} onClickSetting={handleBlock} img={blockIcon}/>
      
          <Advancesetting userlogin={userlogin} setSetting_ope={setSetting_ope} profile_lock={userlogin.profile_lock}/>
          </div>
          </>

        )}
      </>
    

      {/* pupup */}
      {showPopup && (
        <ImageModelPopup imageUrl={popupImageUrl} onClose={handleClosePopup} setrefress={setrefress} />
      )}

<EditProfile setEditejson={setEditejson} userlogin={userlogin} isOpen={isModalOpen} onClose={closeModal}/>
      {/* {isModalOpen && <ShareDetailsmodel onClose={closeModal} />} */}
      <SideModel isOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/>
      <SideModel2 isOpen={isSidebarOpen2} toggleSidebar={toggleSidebar2}/>
      <SideModel3 isOpen={isSidebarOpen3} toggleSidebar={toggleSidebar3}/>

      {/* Setting all model */}
      <AboutModel isOpen={isSettingOpen} onClose={toggSetting}/>
      <AccountPoliceModel isOpen={isSettingOpen1} onClose={toggSetting1}/>
      {showPopup2 && (
        <SideModel4  onClose={handleClosePopup2}  title={'You have no user block'}/>
      )}

    </div>
  )
}
