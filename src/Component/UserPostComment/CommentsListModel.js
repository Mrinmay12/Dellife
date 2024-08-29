import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Comment.css'; // Import CSS styles for the modal
import Smallmodel from '../SmallPupup/Smallmodel';
import { EditComment, userComment, userCommentget } from '../../AllApi/Integrateapi';
import Loder from '../LoderComponent/Loder';
import { setEditdata } from '../../redux/action/EditAction';
import { useDispatch } from 'react-redux';
import SendIcon from "../CommentModel/Send.svg"
import { removeDuplicates } from '../../Utiles';
const CommentsListModel = ({ onClose ,postid,userlogin}) => {
const dispatch=useDispatch()
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const containerRef = useRef(null);
  const [commentdata, setCommentdata] = useState([])
  const[report_postid,setReport_postid]=useState([])
  const fetchComments = async (pageNum) => {
    setLoading(true);
    try {
      const response = await userCommentget(postid, userlogin.user_id, page)
      setCommentdata(prev => [...prev, ...response.data.postcomment]);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments(page);
  }, [page]);

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      if (scrollHeight - scrollTop === clientHeight && !loading) {
        setPage(prev => prev + 1);
      }
    }
  };

  const [inputValue, setInputValue] = useState('');
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };
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
  
  let uniqueIds= removeDuplicates(commentdata,"comment_id")
  const textareaRef = useRef(null);
  const resizeTextarea = () => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`; // Auto-grow the height
  };

  useEffect(() => {
    resizeTextarea();
  }, [inputValue]);
  function handleEnterPress(event) {
    if (event.key === "Enter") {
      resizeTextarea();
    }
  }
  return (
    <div className="comment-modal-overlay" onClick={onClose}>
      <div className="comment-modal-content" onClick={e => e.stopPropagation()}>
        <button className="comment-modal-close" onClick={onClose}>×</button>
        <h2>Comments</h2>
        <hr/>
        <div className="comments-container" ref={containerRef} onScroll={handleScroll}>
        {uniqueIds.filter((item)=>item.post_id===postid).map((item,index) => (
        <>
          <div class="user-info2" key={item.index}>
            <img className='user-info2_img' src={item.user_pic} alt="User Image" />
            <span class="user-name2">{item.user_name}</span>

            {/* <img width="23" height="20" style={{ paddingLeft: "7px" }} src={greenTick} alt="approval--v1" /> */}
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
          {loading && <div className="comment-loading"><Loder/></div>}
        </div>
        <div style={{ display:"flex",flexDirection:"row" }}>
        <textarea
            type="text"
            placeholder="Add a comment..."
            className="inpttextarea"
            value={inputValue}
            onChange={(e)=>setInputValue(e.target.value)}
            style={{ height: "50px", maxHeight: "300px",borderBottomWidth: 2,   
              borderBottomColor: '#000',
              borderBottomStyle: 'solid' }}
            // onKeyUp={handleEnterPress}
            onKeyPress={handleEnterPress}
            ref={textareaRef}
            rows="1"
          />
<div onClick={()=>inputValue.trim().length!==0?handleSubmit():''}  className={inputValue.trim().length===0?'sendcomment': 'sendcomment_write'}>
          <img src={SendIcon} style={{width:"20px",height:"20px"}} alt='' title='post'/>
          </div>
        </div>
      
      </div>
     
    </div>
  );
};

export default CommentsListModel;
