import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Comment.css'; // Import CSS styles for the modal
import Smallmodel from '../SmallPupup/Smallmodel';
import { DealCreate, GetDeal } from '../../AllApi/Integrateapi';
import Loder from '../LoderComponent/Loder';
import { setEditdata } from '../../redux/action/EditAction';
import { useDispatch } from 'react-redux';
import SendIcon from "../CommentModel/Send.svg"
import { removeDuplicates } from '../../Utiles';
import "./DealModel.css"
import phoneIcon from "../Images/phone.svg";
import SideModel4 from '../SidePopup/SideModel4';
import { useNavigate } from 'react-router-dom';
const DealModel = ({ onClose ,postid,userlogin,show}) => {
const dispatch=useDispatch()
const navigate=useNavigate()
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const containerRef = useRef(null);
  const [commentdata, setCommentdata] = useState([])
  const[report_postid,setReport_postid]=useState([])
  const [selectedCurrency, setSelectedCurrency] = useState('');
  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
  };
  const fetchComments = async (pageNum) => {
    setLoading(true);
    try {
      const response = await GetDeal(selectedCurrency,postid, page)
      setCommentdata(prev => [...prev, ...response.data]);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };
useEffect(()=>{
  setCommentdata([])
},[selectedCurrency])
  useEffect(() => {
    fetchComments(page);
  }, [page,selectedCurrency]);

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      if (scrollHeight - scrollTop === clientHeight && !loading) {
        setPage(prev => prev + 1);
      }
    }
  };

  const [price,setPrice]=useState('')
  const handleSubmit = async () => {
    const json = JSON.stringify({
      post_id: postid,
      user_id: userlogin.user_id,
      price: price
    })
    const response = await DealCreate(json)
    if (response) {
     onClose()
    }
  };
  
  let uniqueIds= removeDuplicates(commentdata,"price_id")

  const [showPopup2, setShowPopup2] = useState(false);
  const handleClosePopup2 = () => {
    // setPopupImageUrl('');
    setShowPopup2(false);
  }
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

  const[user_number,setuser_number]=useState('')
  const handlePhone=(user_number)=>{
    if (isMobile) {
    window.open(`tel:${user_number}`)
    }else{
      setuser_number(user_number)
      setShowPopup2(true)
    }
  }

  const handleOpenProfile=(id)=>{
    navigate(`/otherprofile/${new Date().getMilliseconds()}?user_id=${id}`)
  }
  return (
    <div className="comment-modal-overlay" onClick={onClose}>
      <div className="comment-modal-content" onClick={e => e.stopPropagation()}>
        <button className="comment-modal-close" onClick={onClose}>×</button>
        <div style={{ flexDirection:"row",justifyContent:"space-between",display:"flex",paddingBottom:"9px" }}>
        <h2> Drop deal</h2>
        {show&&(
        <h2 style={{paddingRight:"18px" }}> 
        <select id="currency" name="currency" value={selectedCurrency} onChange={handleCurrencyChange}>
        <option value="">Filter</option>
        <option value="asc">Lower to Higher Price</option>
        <option value="desc">Higher to Lower Price</option>
      </select>
        </h2>
        )}
        </div>
        <hr/>
        {!show&&(
        <div style={{display:"flex",alignItems:'center'}}>
          <h3 style={{margin:"12px" }}>One to one Deal</h3>
        </div>
        )}
        {show &&(
  <div className="comments-container" ref={containerRef} onScroll={handleScroll}>
  {uniqueIds.filter((item)=>item.post_id===postid).map((item,index) => (
  <>
    <div class="user-info2" key={item.index}>
      <img className='user-info2_img' src={item.user_pic} alt="User Image" onClick={()=>handleOpenProfile(item.user_view_id)}/>
      <span class="user-name2" onClick={()=>handleOpenProfile(item.user_view_id)}>{item.user_name}</span>
      <img style={{ width:"18px",marginLeft:"27px" }} src={phoneIcon} className="iconstyle" onClick={()=>handlePhone(item.user_number)} alt=''/>
       
      </div>
      <span style={{ marginLeft:"7px" ,color:"#e47a2d"}}>{(item.work_title)}</span>
    <div class="pricetext">
      <p>₹{item.price}
      </p>
    </div>
    <hr/>
  </>
))}
    {loading && <div className="comment-loading"><Loder/></div>}
    {!loading &&uniqueIds.length==0 ?(
      <h3>No deal available</h3>
    ):'' }
  </div>
        )}
      
      {!show&&(
    <div class="form-container">
    <h2>Enter Price</h2>

        <div class="form-group">
          <input type="text" id="price1" name="price1" placeholder="Amount" value={price} onChange={(e)=>setPrice(e.target.value.replace(/[^0-9]/g, ""))}/>
            
            <select id="currency" name="currency">
                <option value="inr">Rupee (₹)</option>
            </select>
        </div>
        <div class="form-group">
            <button type="submit" onClick={()=>handleSubmit()}>Submit</button>
        </div>
    
</div>
      )}
    
       
      
      </div>
      {showPopup2 && (
        <SideModel4  onClose={handleClosePopup2}  title={user_number} use_for={'user_comment'}/>
      )}
    </div>
  );
};

export default DealModel;
