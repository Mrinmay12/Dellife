import React, { useState, useRef, useEffect } from 'react'
import "./Profile.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faUser, faSave, faPencil, faLock } from '@fortawesome/free-solid-svg-icons';
import ImageModelPopup from '../Component/ImageModelPopup/ImageModelPopup';
import Button from '../Component/Button/Button';  
import OtherPostcard from '../Component/AllPostCard/OtherPostcard';
import { useSelector, useDispatch } from 'react-redux';
import Loder from '../Component/LoderComponent/Loder';
import { addTwoUser, ProfilePicUpdate, SeeOtherUserProfile, UserProfilePic, User_connect_or_not } from "../AllApi/Integrateapi"
import { setRefresh } from "../redux/action/RefreshAction";
import { useParams,useNavigate,useSearchParams,useLocation } from 'react-router-dom';
import { setData } from '../redux/action/LoginAction';
import EditProfile from '../Component/ProfileEdit/EditProfile';
import save from "../Images/save.jpg"
import card from "../Images/card.jpg"
export default function OtherUserProfile() {
  const navigate=useNavigate()
  const location = useLocation();
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
  const[user_id,setUserid]=useState("")
//   useEffect(() => {
//     if (userlogin) {
//       setPopupImageUrl(userlogin.user_pic)
//     }
//   }, [userlogin])
const [searchParams] = useSearchParams();
const queryParam = searchParams.get('user_id');

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

 const [data,setData]=useState("")
  useEffect(() => {

    const Data = async () => {
      try {
        let response = await SeeOtherUserProfile(post_id, queryParam||"")
        // dispatch(setData(response.data.data))
        setData(response.data.data)
        setPopupImageUrl(response.data.data.user_pic)
        setUsername(response.data.data.user_name)
        setUserid(response.data.data.message_id)
        console.log(response.data.data);
      } catch (err) {
        console.log(err)
      }
    }
    if (post_id) {
      Data()
    }

  }, [post_id])

  //Message user_connect_or not 
  const[messagedata,setMessagedata]=useState({})
  useEffect(()=>{
    const Data=async()=>{
   let res= await  User_connect_or_not(post_id, queryParam||"",userlogin.message_id)
   setMessagedata(res.data)
    }
    if (post_id && userlogin.message_id) {
      Data()
    }
  },[post_id,userlogin.message_id])
const[show,setShow]=useState("post")
  const handleShow=(e)=>{
    setShow(e)
  }
// console.log(messagedata);
const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  window.addEventListener('resize', handleResize);

  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);
  const handleMessage=async()=>{
    if(isMobile){
      if(messagedata.present){
        navigate(`/chats/${messagedata.message_id}?userid=${window.btoa(user_id)}`)
      }else{
    const json=JSON.stringify({
          // senderId: userlogin.user_id,
          senderId: userlogin.message_id,
          receiverId:user_id
      })
      const response=await addTwoUser(json)
      if(response){
          navigate(`/chats/${response.data.data._id}?userid=${window.btoa(user_id)}`)
      }
    }
    }else{
      if(messagedata.present){
        navigate(`/message/${messagedata.message_id}?userid=${window.btoa(user_id)}`)
      }else{
    const json=JSON.stringify({
          // senderId: userlogin.user_id,
          senderId: userlogin.message_id,
          receiverId:user_id
      })
      const response=await addTwoUser(json)
      if(response){
          navigate(`/message/${response.data.data._id}?userid=${window.btoa(user_id)}`)
      }
    }
    }
 
  }

  const handleFollow=()=>{

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
        <p className='user_name user_name_name'>{user_name}</p>
        <p>50 % user like this profile</p>
          <div style={{ justifyContent: "center", display: "flex" }}>
          <button class="edit-profile-btn" onClick={handleFollow}>Follow</button>
          <button class="edit-profile-btn" onClick={handleMessage} style={{ marginLeft:"19px" }}>Message</button>
            {/* <Button value="Connect" backcolor={"dimgray"} />
            <div style={{ marginLeft: "29px" }}>
              <Button value="Message" handleClick={handleMessage} />
            </div> */}
          </div>

    
        <br />
        <hr />
    {data.profile_lock ?(
      <div className='profilediv'>
        <div className='profilelocked'>
        <div style={{marginTop:"10px",display:"flex"}}>
        <FontAwesomeIcon icon={faLock} style={{ color: "white" ,height:"18px",paddingRight:"9px"}}  /> 
        <p className='profilelocktext'>User profile private</p>
        </div>
        </div>
        </div>
    ):(
      <div className='profilediv'>
        <div className='profilebottom'>
          <p  className={show==="post"?'profilebottomtext':"profilebottomtext2"} onClick={()=>handleShow("post")} style={{color:show==="post"?"red":"black"}}><img style={{height:"18px" ,marginRight:"4px"}} src={card}/>Posts</p>
          <p className={show==="about"?'profilebottomtext':"profilebottomtext2"} style={{color:show==="about"?"red":"black"}} onClick={()=>handleShow("about")}><FontAwesomeIcon icon={faUser} style={{ color: "black" ,height:"18px"}}  /> About</p>
        </div>
     </div>
    )}
        
      
       
      </div>
  
      {!data.profile_lock &&(
        <>
        {show==="post"?(
            <div className='centerpostcard'>
            <OtherPostcard post_id={post_id} user_id={queryParam} profile_lock={data.profile_lock}/>
            </div>
          ):(
            <div className='centerpostcard'>
            <div className='aboutdetails'>
            <p className='pratitle'>About:</p>
            <p className='anstitle'>{data.about}</p>
            </div>
            <div className='aboutdetails'>
            <p className='pratitle'>Profession:</p>
            <p className='anstitle'>{data.work_title}</p>
            </div>
            <div className='aboutdetails'>
            <p className='pratitle'>Phone:</p>
            <p className='anstitle' href={`tel:${data.phone_number}`} style={{color:"blue"}}>{data.phone_number}</p>
            </div>
            <div className='aboutdetails'>
            <p className='pratitle'>Email:</p>
            <p className='anstitle' href={`mailto:${data.email}`} style={{color:"blue"}}>{data.email}</p>
            </div>
            <div className='aboutdetails'>
            <p className='pratitle'>Website:</p>
            <p className='anstitle'><a href={data.sitelink} style={{color:"blue"}} target="_blank">{data.sitelink}</a></p>
            </div>
           
            </div>
          )}
        </>
      )}
          
        
  
      

      {/* pupup */}
      {showPopup && (
        <ImageModelPopup imageUrl={popupImageUrl} onClose={handleClosePopup} setrefress={setrefress} post_id="true" />
      )}
    </div>
  )
}
