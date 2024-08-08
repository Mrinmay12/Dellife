import React, { useState, useEffect } from 'react'
import Commentmodel from '../CommentModel/Commentmodel';
import { userCommentget, postLike, getLike,disLike, userComment, User_connect_or_not, addTwoUser } from '../../AllApi/Integrateapi';
import "..//TextShow.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faCommentSms, faHeart, faShare } from '@fortawesome/free-solid-svg-icons';
import message from "../Images/message.png"
import greenTick from "../Images/green_tick.png"
import { useSelector,useDispatch } from 'react-redux';
import Smallmodel from '../SmallPupup/Smallmodel';
import SendIcon from "../CommentModel/Send.svg"
import { setEditdata } from '../../redux/action/EditAction';
import ShareModal from '../ShareModel/Share';
import ShareIcon from "../Images/Share.svg"
export default function UserComment({ postid ,user_post_or_not,user_present,countlike,user_like,user_id}) {
  const userlogin = useSelector(state => state.myReducer.data)
  const editdata = useSelector(state => state.EditReducer.data)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const postreff = useSelector(state => state.UpdateReducer.data)
  const dispatch=useDispatch()
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const [postId, setPostId] = useState("")
  const [isModalOpenshare, setIsModalOpenShare] = useState(false);
  const handleOpenComment = (postid) => {
    setIsModalOpen(true);
    setPostId(postid)
  };


  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleShareImage = () => {
    if(!isMobile){
      setIsModalOpenShare(true)
    }else{
 
    // Check if the Web Share API is supported in the browser.
    if (navigator.share) {
      // Use the share() method to share the image.
      navigator.share({
        title: 'Image Sharing',
        text: 'Check out this image!',
        url: `/sharepost/${postid}`,
      })
        .then(() => console.log('Shared successfully'))
        .catch((error) => console.error('Error sharing:', error));
    } else {
      alert('Web Share API is not supported in this browser.');
    }
  }
  };
  const [commentdata, setCommentdata] = useState([])
  const [dataslice, setDataslice] = useState(1)
  const [page, setPage] = useState(1)
  const[report_postid,setReport_postid]=useState([])
useEffect(()=>{
  if(postreff){
    setReport_postid([...report_postid,postreff])
  }
},[postreff])
  useEffect(() => {
    const getComment = async () => {
      let res = await userCommentget(postid, userlogin.user_id, page)
      setCommentdata(res.data.postcomment. filter(item => !report_postid.includes(item.comment_id)));
    }
   

    if (postid) {
      getComment()
    }
  }, [postid,postreff])
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

  const updateOrUnshift = (newItem) => {
    setCommentdata(prevArray => {
        const index = prevArray.findIndex(item => item.comment_id === newItem.comment_id);

        if (index === -1) {
            // Item not found, add to the beginning
            return [newItem, ...prevArray];
        } else {
            // Item found, update it
            const updatedArray = [...prevArray];
            updatedArray[index] = newItem;
            return updatedArray;
        }
    });
};

useEffect(()=>{
  if(Object.keys(editdata).length!==0){
    if(editdata.comment_id){
    updateOrUnshift(editdata)
    }
  }
},[editdata])
const[inputValue,setInputValue]=useState('')
const handleSubmit = async () => {
  const json = JSON.stringify({
    post_id: postid,
    user_id: userlogin.user_id,
    user_comment: inputValue
  })
  const response = await userComment(json)
  if (response) {
    setCommentdata([{comment_id: response.data.id,
      post_id: postid,
      user_pic: userlogin.user_pic,
      user_name: "You",
      user_comment: inputValue,
      user_edit:true},...commentdata])
    // dispatch(setEditdata({
    //   comment_id: response.data.id,
    //   post_id: postId,
    //   user_pic: userlogin.user_pic,
    //   user_name: "You",
    //   user_comment: inputValue,
    //   user_edit:true
    // }))
    setInputValue('')
  }
};


  const closeModalShare = () => setIsModalOpenShare(false);

  const [messagedata, setMessagedata] = useState({});
  useEffect(() => {
    const Data = async () => {
      let res = await User_connect_or_not(
        postid,
        "",
        userlogin.message_id
      );
      setMessagedata(res.data);
    };
    if (postid && userlogin.message_id) {
      Data();
    }
  }, [postid, userlogin.message_id]);



  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  //message data
  const handleMessage = async () => {
    if (isMobile) {
      if (messagedata.present) {
        navigator(
          `/chats/${messagedata.message_id}?userid=${window.btoa(user_id)}`
        );
      } else {
        const json = JSON.stringify({
          // senderId: userlogin.user_id,
          senderId: userlogin.message_id,
          receiverId: user_id,
        });
        const response = await addTwoUser(json);
        if (response) {
          navigator(
            `/chats/${response.data.data._id}?userid=${window.btoa(user_id)}&post_id=${postid}`
          );
        }
      }
    } else {
      if (messagedata.present) {
        navigator(
          `/message/${messagedata.message_id}?userid=${window.btoa(user_id)}&post_id=${postid}`
        );
      } else {
        const json = JSON.stringify({
          // senderId: userlogin.user_id,
          senderId: userlogin.message_id,
          receiverId: user_id,
        });
        const response = await addTwoUser(json);
        if (response) {
          navigator(
            `/message/${response.data.data._id}?userid=${window.btoa(user_id)}&post_id=${postid}`
          );
        }
      }
    }
  };

  console.log(messagedata,"messagedatamessagedatamessagedataMMM");
  
  return (
    <div>
      {commentdata.filter((item)=>item.post_id===postid).slice(0, dataslice).map((item,index) => (
        <>
          <div class="user-info2" key={item.index}>
            <img className='user-info2_img' src={item.user_pic} alt="User Image" />
            <span class="user-name2">{item.user_name}</span>

            <img width="23" height="20" style={{ paddingLeft: "7px" }} src={greenTick} alt="approval--v1" />
            {item.user_edit &&(
              <>
             
            <Smallmodel post_id={postid} comment_id={item.comment_id} edite_text={item.user_comment} showonly={"comment"}/>
       
            </>
            )}
            </div>
          <div class="slovetext">
            <p>{item.user_comment}
            </p>
          </div>
        </>
      ))}
      {commentdata.filter((item)=>item.post_id===postid).slice(0, dataslice).length > 0 &&(
        <div style={{ color: "blue" ,cursor:"pointer"}} onClick={() => handleShow()}>{dataslice === Infinity ? "Hide" : "Show more"}</div>
      )}
     
{user_present &&(
      <div className='bottomstyle'>
      {!user_post_or_not &&  (
        <div >
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
  <>
        <div >
          <FontAwesomeIcon icon={faComment} className="iconstyle" onClick={() => handleOpenComment(postid)} /> {commentdata.length > 0 && commentdata.length}
        </div>
        <div >
          <FontAwesomeIcon icon={faComment} className="iconstyle" onClick={() => handleOpenComment(postid)} /> {commentdata.length > 0 && commentdata.length}
        </div>
        </>
)}
        <div  onClick={handleShareImage}>
          <img src={ShareIcon} className="iconstyle"/>
          {/* <FontAwesomeIcon icon={faShare} style={{ color: "black" }} className="iconstyle" /> */}

        </div>

      </div>
)}
<div style={{ display:"flex",flexDirection:"row" }}>
<input className='inputcomment' placeholder='Write your comment' value={inputValue} onChange={(e)=>setInputValue(e.target.value)}/>
<div onClick={()=>handleSubmit()}  className='sendcomment'>
          <img src={SendIcon} style={{width:"20px",height:"20px"}} alt='' title='post'/>
          </div>
        </div>
      {isModalOpen && <Commentmodel onClose={closeModal} postId={postId} />}
      <ShareModal isOpen={isModalOpenshare} onRequestClose={closeModalShare} url={`${window.location.host}/sharepost/${postid}`}/>
    </div>
  )
}
