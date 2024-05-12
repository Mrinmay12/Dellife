import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NearUsers } from '../../AllApi/Integrateapi';
import "./Detailsmodel.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from 'react-router-dom';
const ShareDetailsmodel = ({ onClose,postId }) => {
  const navigate=useNavigate()
  const userlogin = useSelector(state => state.myReducer.data)
  const near_user = useSelector(state => state.NearuserReducer.data)
  const location_data = useSelector(state => state.UserLocation.data)
  // console.log(userlogin,"myuserlog");
  const [inputValue, setInputValue] = useState('');
  const modalRef = useRef(null);
  const [page, setPage] = useState(1)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);


  const [isChecked, setIsChecked] = useState(false);
  const [data, setData] = useState([
    { name: "Mri", id: "123", checked: false },
    { name: "Mri1", id: "1231", checked: false },
    { name: "Mri2", id: "1232", checked: false },
  ]);

  const handleToggle = () => {
    setIsChecked(!isChecked);
    setData(data.map(item => ({ ...item, checked: !isChecked })));
  };

  const handleToggle2 = (id) => {
    setData(data.map(item => {
      if (item.id === id) {
        return { ...item, checked: !item.checked };
      }
      return item;
    }));
  };

  const loadMore = () => {
    // if (!isFetching && !isPreviousData) {
      setPage((prevPage) => prevPage + 1);
    // }
  };

  useEffect(()=>{
    const Users=async()=>{
      let users=await NearUsers(userlogin.latitude,userlogin.longitude,userlogin.
        user_id,page)
      if(users){
        console.log(users);
      }
    }
    Users()
  },[userlogin.user_id])

  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers(prevUsers => {
        const newUserIds = new Set(near_user.map(item => item.user_id));
        return [...near_user, ...prevUsers.filter(item => !newUserIds.has(item.user_id))];
    });
}, [near_user]);
  

const uniqueObjects = Object.values(users.reduce((unique, obj) => {
  if (!unique[obj.user_id]) {
    unique[obj.user_id] = obj;
  }
  return unique;
}, {}));

const calculateDistance = (coord1, coord2) => {
  const R = 6371; // Radius of the Earth in km
  const dLat = (coord2.latitude - coord1.latitude) * (Math.PI / 180);
  const dLon = (coord2.longitude - coord1.longitude) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(coord1.latitude * (Math.PI / 180)) *
      Math.cos(coord2.latitude * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance; // Distance in km
};
const nearUsersdata = uniqueObjects.filter((user) => {
  if(Object.keys(location_data).length !== 0){
        const distance = calculateDistance(user.location, location_data);
        return distance <2; 
  }
      });
      
  console.log(nearUsersdata,"nearUsersdata");
  const handleOpenProfile=(id)=>{
    navigate(`/otherprofile/${new Date().getMilliseconds()}?user_id=${id}`)
  }
  return (
    <div className="modal-container-details" ref={modalRef}>
     <div className="shareuserinfo">
     <div className='sharealldetails'>
       <p className='sharetext'>Share your details</p>
         <label className="toggle-switch">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleToggle}
        />
        <span className="slider round"></span>
      </label>
      </div>
     </div>
<hr/>
<div className="shareuserscroll">
{/* <InfiniteScroll
        dataLength={data.length}
        next={loadMore}
        hasMore={true}
        // loader={data?.length!==0 &&<h4>Loading...</h4>}
      >  */}
{nearUsersdata.filter((item)=>item.message_id!==userlogin.message_id).map((item) => (
  <div style={{marginTop:"2px"}}>
  
  <div className="shareuserinfo">
   <img className="usershareimg" src={item.user_image} alt={item.name} />
   <h3 className="usersharename">{item.name}</h3>
   {/* <div className="usersharename"> */}
   <div className='viewnearuser' style={{cursor:"pointer"}} onClick={()=>handleOpenProfile(item.user_id)}>
   <p style={{color:"navy"}}>{"view >>"}</p>
  {/* <label className="toggle-switch">
  <input
    type="checkbox"
    checked={item.checked}
    onChange={() => handleToggle2(item.id)}
  />
  <span className="slider round"></span>
</label> */}
</div>
  </div>
   <p style={{marginTop:"-23px",marginBottom:"9px",textAlign:"center"}}>{item.work_title}</p>
  </div>
))}
 {/* </InfiniteScroll> */}
    </div>
    </div>
  );
};

export default ShareDetailsmodel;
