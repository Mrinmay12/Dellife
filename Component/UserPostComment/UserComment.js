import React, { useState, useEffect } from 'react'
import Commentmodel from '../CommentModel/Commentmodel';
import { userCommentget, postLike, getLike,disLike } from '../../AllApi/Integrateapi';
import "..//TextShow.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faCommentSms, faHeart, faShare } from '@fortawesome/free-solid-svg-icons';
import message from "../Images/message.png"
import greenTick from "../Images/green_tick.png"
import { useSelector } from 'react-redux';
export default function UserComment({ postid ,user_post_or_not,user_present,countlike,user_like}) {
  const userlogin = useSelector(state => state.myReducer.data)
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const [postId, setPostId] = useState("")
  const handleOpenComment = (postid) => {
    setIsModalOpen(true);
    setPostId(postid)
  };
  const handleShareImage = () => {
    // Check if the Web Share API is supported in the browser.
    if (navigator.share) {
      // Use the share() method to share the image.
      navigator.share({
        title: 'Image Sharing',
        text: 'Check out this image!',
        url: `/sharepost${postid}`,
      })
        .then(() => console.log('Shared successfully'))
        .catch((error) => console.error('Error sharing:', error));
    } else {
      alert('Web Share API is not supported in this browser.');
    }
  };
  const [commentdata, setCommentdata] = useState([])
  const [dataslice, setDataslice] = useState(1)
  const [page, setPage] = useState(1)
  useEffect(() => {
    const getComment = async () => {
      let res = await userCommentget(postid, userlogin.user_id, page)
      setCommentdata(res.data.postcomment);
    }

    if (postid) {
      getComment()
    }
  }, [postid])
  const handleShow = () => {
    if (dataslice === 1) {
      setDataslice(Infinity)
    } else if (dataslice === Infinity) {
      setDataslice(1)
    }
  }
  const [like, setLike] = useState(countlike)
  const [userlike, setUserlike] = useState(user_like)

  // useEffect(()=>{
  //   const Likeget=async()=>{
  //     let res=await getLike(postid,userlogin.user_id)
  //     if(res){
  //       setLike(res.data.like)
  //       setUserlike(res.data.user_like)
  //     }
  //   }
  //   if(postid){
  //     Likeget()
  //   }
  // },[postid])
  const [isBouncing, setIsBouncing] = useState(false);
  const handleLike = async () => {
    setLike((pre) => pre + 1)
    setIsBouncing(true);
    setTimeout(() => {
      setIsBouncing(false);
     }, 1000);
    setUserlike(!userlike)
    try {
      let json = JSON.stringify({
        user_id: userlogin.user_id
      })
      await postLike(postid, json)
    } catch (err) {

    }
  }
  const handleDislike = async () => {
    setLike((pre) => pre -1)
    setIsBouncing(true);
    setTimeout(() => {
      setIsBouncing(false);
     }, 1000);
    setUserlike(!userlike)
    try {
  
      await disLike(postid, userlogin.user_id)
    } catch (err) {

    }
  }

  return (
    <div>
      {commentdata.slice(0, dataslice).map((item) => (
        <>
          <div class="user-info2">
            <img className='user-info2_img' src={item.user_pic} alt="User Image" />
            <span class="user-name2">{item.user_name}</span>

            <img width="23" height="20" style={{ paddingLeft: "7px" }} src={greenTick} alt="approval--v1" />
          </div>
          <div class="slovetext">
            <p>{item.user_comment}
            </p>
          </div>
        </>
      ))}
      <div style={{ color: "blue" ,cursor:"pointer"}} onClick={() => handleShow()}>{dataslice === Infinity ? "Hide" : "Show more"}</div>
{user_present &&(
      <div className='bottomstyle'>
      {!user_post_or_not &&  (
        <div className='profiletag2' style={{ width: "66px", marginRight: "12px" }}>
          {userlike ? (
            <>
              <FontAwesomeIcon icon={faHeart} style={{ color: "red" }} className={ `heart ${isBouncing ? 'bounce' : ''}`} onClick={()=>handleDislike()}/> {like!==0 && like}
            </>

          ) : (
            <>
              <FontAwesomeIcon icon={faHeart} style={{ color: "gray" }}  className={ `heart ${isBouncing ? 'bounce' : ''}`} onClick={() => handleLike()} /> {like!==0 && like}
            </>

          )}
        </div>
      )}
     
{!user_post_or_not && (
        <div className='shairicone3'>
          <FontAwesomeIcon icon={faComment} className="iconstyle" onClick={() => handleOpenComment(postid)} /> {commentdata.length > 0 && commentdata.length}
        </div>
)}
        <div className='shairicone3' onClick={handleShareImage}>
          <FontAwesomeIcon icon={faShare} style={{ color: "black" }} className="iconstyle" />

        </div>

      </div>
)}
      {isModalOpen && <Commentmodel onClose={closeModal} postId={postId} />}
    </div>
  )
}
