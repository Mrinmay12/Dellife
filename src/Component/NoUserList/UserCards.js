import React, { useRef,useState,useEffect } from 'react';
import './UserCards.css';
import { addTwoUser, sendMessage, User_No_Message_Friend } from '../../AllApi/Integrateapi';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const UserCards = () => {
  const navigator=useNavigate()
    const userId = useSelector((state) => state.myReducer.data);
   const [users,setUsers]=useState([])
    const cardContainerRef = useRef(null);
    const [showLeftButton, setShowLeftButton] = useState(false);
    const [showRightButton, setShowRightButton] = useState(true);
    const scrollLeft = () => {
        cardContainerRef.current.scrollBy({
            left: -200,
            behavior: 'smooth',
        });
    };

    const scrollRight = () => {
        cardContainerRef.current.scrollBy({
            left: 200,
            behavior: 'smooth',
        });
    };
    const handleScroll = () => {
      const container = cardContainerRef.current;

      setShowLeftButton(container.scrollLeft > 0);

     
// console.log(Math.round(container.scrollLeft + container.clientWidth));

      
      setShowRightButton(Math.round(container.scrollLeft + container.clientWidth)===2910 ? false:true);
  };

  useEffect(() => {
   
      const container = cardContainerRef.current;
      container.addEventListener('scroll', handleScroll);

      handleScroll();

      return () => {
          container.removeEventListener('scroll', handleScroll);
      };
  }, []);

useEffect(()=>{
    const Data=async()=>{
      let res=  await User_No_Message_Friend(userId.user_id)
      setUsers(res.data.users);
      
    }
    Data()
},[])

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
  const handleMessage = async (message_id) => {
    if (isMobile) {
      
        const json = JSON.stringify({
          // senderId: userlogin.user_id,
          senderId: userId.message_id,
          receiverId: message_id,
        });
        const response = await addTwoUser(json);
        if (response) {
          
          navigator(
            `/chats/${response.data.data._id}?userid=${window.btoa(message_id)}`
          );
        
      }
      }
    else {
     
        const json = JSON.stringify({
          // senderId: userlogin.user_id,
          senderId: userId.message_id,
          receiverId: message_id,
        });
        const response = await addTwoUser(json);
        if (response) {
          
          navigator(
            `/message/${response.data.data._id}?userid=${window.btoa(message_id)}`
          );
        // window.location.reload()
      
      }
    }
  };
    return (
        <div className="no_user_scroll-wrapper">
           {showLeftButton && (
                <button className="no_user_scroll-button left" onClick={scrollLeft}>
                    &#10094;
                </button>
            )}
            <div className="no_user_card-container" ref={cardContainerRef}>
                {users.map(user => (
                    <div className="no_user_card" key={user.message_id}>
                        <img src={user.profile_pic} alt={user.name} />
                        <p style={{ color:"#0075ff" }}>{user.work_title}</p>
                        <p>{user.name}</p>
                        <button
                    className="edit-profile-btn"
                    style={{ color: "#0075ff" }}
                    onClick={() => handleMessage(user.message_id)}
                  >
                    Message
                  </button>
                    </div>
                ))}
            </div>
            {showRightButton && (
            <button className="no_user_scroll-button no_user_right" onClick={scrollRight}>
                &#10095;
            </button>
            )}
        </div>
    );
};

export default UserCards;
