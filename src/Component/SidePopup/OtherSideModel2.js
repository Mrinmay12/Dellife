import React, { useEffect, useState, useRef } from "react";
import "./Sidebar.css";
import { FollowOtherUserList, FollowUser, FollowUserList, addTwoUser } from "../../AllApi/Integrateapi";
import { useSelector ,useDispatch} from "react-redux";
import Loder from "../LoderComponent/Loder";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { setData } from "../../redux/action/LoginAction";

const OtherSideModel2 = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  let { post_id } = useParams();
  const [searchParams] = useSearchParams();
  const queryParam = searchParams.get('user_id');
  const dispatch=useDispatch()
  const userlogin = useSelector((state) => state.myReducer.data);
  const [postdata, setPostdata] = useState([]);
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(false);
  const sidebarRef = useRef(null);
  const [query, setQuery] = useState("");
  const [debouncedValue, setDebouncedValue] = useState('');
  const timerRef = useRef(null);
  const handleInputChange = (e) => {
    const query = e.target.value;
    setQuery(query);
     // Clear the previous timeout
     if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Set a new timeout to update the debounced value after a delay
    timerRef.current = setTimeout(() => {
      setDebouncedValue(query);
      // Perform save operation here
    }, 1000); // Delay of 1 second
  }
  useEffect(()=>{
    if(!isOpen){
      setPage(1)
      setPostdata([])
    }
  },[isOpen])
  useEffect(()=>{
    // if(debouncedValue){
      setPage(1)
      setPostdata([])
    // }
  },[debouncedValue])
  useEffect(() => {
    const fetchData = async () => {
      setLoader(true);
      try {
        const res = await FollowOtherUserList(queryParam||post_id, page,debouncedValue);
        setLoader(false);
        if (res.data.total_following?.length) {
          setPostdata((prevData) => [...prevData, ...res.data.total_following]);
        }
      } catch (err) {
        setLoader(false);
        console.error(err);
      }
    };
    if ((queryParam||post_id) && isOpen) {
      fetchData();
    }
  }, [page,isOpen,debouncedValue]);

  const handleScroll = () => {
    if (sidebarRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = sidebarRef.current;
   
      if (scrollTop > 150) {
        // Adjust this value as needed
        // alert(1)
        setPage((prevPage) => prevPage + 1);
      }
    }
  };

  useEffect(() => {
    const currentSidebar = sidebarRef.current;
    if (currentSidebar) {
      currentSidebar.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (currentSidebar) {
        currentSidebar.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

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
  
  const[report_postid,setReport_postid]=useState([])
  const handleFollowuser=async(receive_user_id)=>{

    try{
    let res=  await FollowUser(receive_user_id,userlogin.user_id)
    if (res) {
        setReport_postid([...report_postid,receive_user_id])
        dispatch(setData({...userlogin,total_following:userlogin.total_following-1}))
    }
    }catch(err){

    }
  
  }

  const handleViewProfile = async (id,message_id) => {
    if(message_id===userlogin.message_id){
        navigate('/profile')
        toggleSidebar()
    }else{
        navigate(`/otherprofile/${new Date().getMilliseconds()}?user_id=${id}`);
        toggleSidebar()
    }
   
  };
  // dispatch(setData(user_data.data.data))

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`} ref={sidebarRef}>
      <h2 style={{ textAlign: "end" }}>Follow</h2>
      <button className="close-btn" onClick={toggleSidebar}>
        ×
      </button>
      <div className="sidebar-content">

      <div className="search-container" style={{ marginBottom:"9px" }}>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}

        style={{ width:"255px" }}
        placeholder="Search..."
      />
         <div className="search-icon2">
        <i class="fa fa-search"></i>
            </div>
            </div>

        {postdata.filter(item => !report_postid.includes(item.message_id)).map((user, index) => (
          <div
            key={index}
            className="user-info"
            style={{ paddingBottom: "44px" ,marginTop:"3px"}}
          >
            <img src={user.user_pic} alt="User" />
            <span className="user-name side-model-name">{user.user_name}</span>
            <div
              className="edit-content"
              onClick={() =>
                handleViewProfile(
                    user._id,
                  user.message_id,
                )
              }
            >
              <button className="edit-profile-btn">View profile</button>
            </div>
          </div>
        ))}
      </div>
      {loader && (
        <div className="sidemodel-loader">
          <Loder />
        </div>
      )}
    </div>
  );
};

export default OtherSideModel2;
