import React, { useState } from 'react'
import "./TextShow.css"
import message from "./Images/message.png"
import greenTick from "./Images/green_tick.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faCommentSms, faHeart, faShare } from '@fortawesome/free-solid-svg-icons';
import platform from 'platform';
import Smallmodel from "./SmallPupup/Smallmodel"
import {
  useNavigate,
} from "react-router-dom"; 
import BlurredUpImage from './ImageLoad/BlurredUpImage';
import Commentmodel from './CommentModel/Commentmodel';

export default function TextShow({ item }) {
  const navigate=useNavigate()
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  const handleShareImage = () => {
    // Check if the Web Share API is supported in the browser.
    if (navigator.share) {
      // Use the share() method to share the image.
      navigator.share({
        title: 'Image Sharing',
        text: 'Check out this image!',
        url: "/postid",
      })
        .then(() => console.log('Shared successfully'))
        .catch((error) => console.error('Error sharing:', error));
    } else {
      alert('Web Share API is not supported in this browser.');
    }
  };
  const handleProfile=()=>{
    navigate(`/otherprofile/${item.post_id}`)
  }
 
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };
const[postId,setPostId]=useState("")
  const handleOpenComment = (postid) => {
    setIsModalOpen(true);
    setPostId(postid)
  };

  return (
    <div>
      {item.Postimage ? (
        <div class="containertext">
          <div className='topstyle'>
            <div className='profiletag'>
              <div class="user-info">
                <img src={item.user_pic} alt="User Image" onClick={handleProfile}/>
                <span class="user-name" onClick={handleProfile}>{item.user_name}</span>
              </div>
            </div>
            {/* <div className='shairicone' onClick={handleShareImage}>
          <i className="icon clickable fa fa-ellipsis-h right" aria-hidden="true" style={{fontSize:"21px"}}></i>
         
          </div> */}
            <div className='shairicone2'>
              <Smallmodel post_id={item.post_id}/>
            </div>
          </div>

          <h3 style={{ color: item.Color, whiteSpace: "break-spaces" }}>{item.Title}</h3>

          <div class="mainimage-cards-container">
            <div class="">
            <BlurredUpImage image={`${process.env.REACT_APP_FIREBASE}${process.env.REACT_APP_BUCKET}/o/${item.Postimage}?alt=media`} className="imageshow"/>
              {/* <img src={`${process.env.REACT_APP_FIREBASE}${process.env.REACT_APP_BUCKET}/o/${item.Postimage}?alt=media`} alt='headerimage' className='imageshow' style={{ display: imageLoaded ? "block" : "none"}}
                onLoad={handleImageLoad} /> */}

            </div>
          </div>

          <div class="user-info2">
            <img className='user-info2_img' src="https://images.pexels.com/photos/1133957/pexels-photo-1133957.jpeg?auto=compress&cs=tinysrgb&w=800" alt="User Image" />
            <span class="user-name2">Shay sg(another user)</span>

            <img width="23" height="20" style={{ paddingLeft: "7px" }} src={greenTick} alt="approval--v1" />
          </div>
          <div class="slovetext">
            <p>This is a responsive area for testing purposes.hfghdfghgfhWhat is Lorem Ipsum?
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
            </p>
          </div>
          <div className='bottomstyle'>
            <div className='profiletag2' style={{ width: "66px", marginRight: "12px" }}>
              <FontAwesomeIcon icon={faHeart} style={{ color: "red" }} className="iconstyle" /> 200
            </div>

            <div className='shairicone3'>
              <FontAwesomeIcon icon={faComment} className="iconstyle" onClick={()=>handleOpenComment(item.post_id)} /> 5454
            </div>

            <div className='shairicone3' onClick={handleShareImage}>
              <FontAwesomeIcon icon={faShare} style={{ color: "black" }} className="iconstyle" />

            </div>

          </div>
        </div>
      ) : (
        <>
          {/* only text */}
          <div class="containertext">
            <div className='topstyle'>
              <div className='profiletag'>
                <div class="user-info">
                  <img src={item.user_pic} onClick={handleProfile}/>
                  <span class="user-name" onClick={handleProfile}>{item.user_name}</span>
                </div>
              </div>
              <div className='shairicone2'>
                <Smallmodel post_id={item.post_id}/>
              </div>
            </div>

            <h3 style={{ color: item.Color, whiteSpace: "break-spaces" }}>{item.Title}</h3>


            <div className='bottomstyle'>
              <div className='profiletag2' style={{ width: "66px", marginRight: "12px" }}>
                <FontAwesomeIcon icon={faHeart} style={{ color: "red" }} className="iconstyle" /> 200
              </div>

              <div className='shairicone3'>
                <FontAwesomeIcon icon={faComment} className="iconstyle" onClick={()=>handleOpenComment(item.post_id)}/> 5454
              </div>

              <div className='shairicone3' onClick={handleShareImage}>
                <FontAwesomeIcon icon={faShare} style={{ color: "black" }} className="iconstyle" />

              </div>

            </div>
          </div>
        </>
      )}



      {/* <div class="containertext">
        <div className='topstyle'>
          <div className='profiletag'>
            <div class="user-info">
              <img src="https://images.pexels.com/photos/1133957/pexels-photo-1133957.jpeg?auto=compress&cs=tinysrgb&w=800" alt="User Image" />
              <span class="user-name">Mrinmay Manna</span>
            </div>
          </div>
          <div className='shairicone' onClick={handleShareImage}>
            <img width="20" height="20" src="https://img.icons8.com/external-kiranshastry-solid-kiranshastry/64/external-share-interface-kiranshastry-solid-kiranshastry-1.png" alt="external-share-interface-kiranshastry-solid-kiranshastry-1" />
          </div>
        </div>

        <h3>Responsive Area Test</h3>
        <div class="mainimage-cards-container">
          <div class="">
            <img src="https://cdn.lifehacker.ru/wp-content/uploads/2019/05/Valley-of-Geysers_Olikbas-Shutterstock_1599819392.jpg" alt='headerimage' className='imageshow' />

          </div>
        </div>

        <div class="slovetext">
          <p>This is a responsive area for testing purposes.hfghdfghgfhWhat is Lorem Ipsum?
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
          </p>
        </div>
        <div className='topstyle'>
          <div className='profiletag'>
            <img width="25" height="25" src={message} alt="chat-message--v1" />
          </div>
          <div className='shairicone'>

            <img width="20" height="20" src={greenTick} alt="approval--v1" />
          </div>
        </div>
      </div>
      <div class="containertext">
        <div className='topstyle'>
          <div className='profiletag'>
            <div class="user-info">
              <img src="https://images.pexels.com/photos/1133957/pexels-photo-1133957.jpeg?auto=compress&cs=tinysrgb&w=800" alt="User Image" />
              <span class="user-name">Mrinmay Manna</span>
            </div>
          </div>
          <div className='shairicone' onClick={handleShareImage}>
            <img width="20" height="20" src="https://img.icons8.com/external-kiranshastry-solid-kiranshastry/64/external-share-interface-kiranshastry-solid-kiranshastry-1.png" alt="external-share-interface-kiranshastry-solid-kiranshastry-1" />
          </div>
        </div>

        <h3>Responsive Area Test</h3>
        <div class="mainimage-cards-container">
          <div class="">
            <img src="https://images.unsplash.com/photo-1566438480900-0609be27a4be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80" alt='headerimage' className='imageshow' />

          </div>
        </div>

        <div class="slovetext">
          <p>This is a responsive area for testing purposes.hfghdfghgfhWhat is Lorem Ipsum?
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
          </p>
        </div>
        <div className='topstyle'>
          <div className='profiletag'>
            <img width="25" height="25" src={message} alt="chat-message--v1" />
          </div>
          <div className='shairicone'>

            <img width="20" height="20" src={greenTick} alt="approval--v1" />
          </div>
        </div>
      </div> */}


      {/* <Checkbox/>   */}
      {isModalOpen && <Commentmodel onClose={closeModal} postId={postId}/>}
    </div>
  )
}
