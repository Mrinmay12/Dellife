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
import "./DealModel.css"
const DealModel = ({ onClose ,postid,userlogin}) => {
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

  const [price,setPrice]=useState('')
  return (
    <div className="comment-modal-overlay" onClick={onClose}>
      <div className="comment-modal-content" onClick={e => e.stopPropagation()}>
        <button className="comment-modal-close" onClick={onClose}>×</button>
        <div style={{ flexDirection:"row",justifyContent:"space-between",display:"flex",paddingBottom:"9px" }}>
        <h2> Drop deal</h2>
        <h2 style={{paddingRight:"18px" }}> 
        <select id="currency" name="currency">
                <option value="">Filter</option>
                <option value="usd">Dollar ($)</option>
                <option value="inr">Rupee (₹)</option>
            </select>
        </h2>
        </div>
        <hr/>
        <div style={{display:"flex",alignItems:'center'}}>
          <h3>One to one Deal</h3>
        </div>
        <div className="comments-container" ref={containerRef} onScroll={handleScroll}>
        {uniqueIds.filter((item)=>item.post_id===postid).map((item,index) => (
        <>
          <div class="user-info2" key={item.index}>
            <img className='user-info2_img' src={item.user_pic} alt="User Image" />
            <span class="user-name2">{item.user_name}</span>

            </div>
          <div class="slovetext">
            <p>{item.user_comment}
            </p>
          </div>
        </>
      ))}
          {loading && <div className="comment-loading"><Loder/></div>}
        </div>
        <div class="form-container">
    <h2>Enter Price</h2>
    <form>
        <div class="form-group">
          <input type="text" id="price1" name="price1" placeholder="Amount" value={price} onChange={(e)=>setPrice(e.target.value.replace(/[^0-9]/g, ""))}/>
            
            <select id="currency" name="currency">
                {/* <option value="usd">Dollar ($)</option> */}
                <option value="inr">Rupee (₹)</option>
            </select>
        </div>
        <div class="form-group">
            <button type="submit">Submit</button>
        </div>
    </form>
</div>
        {/* <div style={{ display:"flex",flexDirection:"row" }}>
<input className='inputcomment' placeholder='Write your comment' value={inputValue} onChange={(e)=>setInputValue(e.target.value)}/>
<div onClick={()=>handleSubmit()}  className='sendcomment'>
          <img src={SendIcon} style={{width:"20px",height:"20px"}} alt='' title='post'/>
          </div>
        </div> */}
      
      </div>
     
    </div>
  );
};

export default DealModel;
