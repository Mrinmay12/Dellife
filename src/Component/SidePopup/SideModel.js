import React, { useEffect, useState, useRef } from "react";
import "./Sidebar.css";
import { FollowersUserList, addTwoUser } from "../../AllApi/Integrateapi";
import { useSelector } from "react-redux";
import Loder from "../LoderComponent/Loder";
import { useNavigate } from "react-router-dom";
import "../SearchInput/Searchbar.css";
const SideModel = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
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
        const res = await FollowersUserList(userlogin?.message_id, page,debouncedValue);
        setLoader(false);
        if (res.data.total_following?.length) {
          setPostdata((prevData) => [...prevData, ...res.data.total_following]);
        }
      } catch (err) {
        setLoader(false);
        console.error(err);
      }
    };
    if (userlogin?.message_id && isOpen) {
      fetchData();
    }
  }, [page, userlogin?.message_id,isOpen,debouncedValue]);

  const handleScroll = () => {
    if (sidebarRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = sidebarRef.current;
      console.log(
        scrollTop,
        scrollHeight,
        clientHeight,
        "scrollTop, scrollHeight, clientHeight"
      );
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

  const handleMessage = async (receive_user_id, message_id, present) => {
    if (isMobile) {
      if (present) {
        navigate(`/chats/${message_id}?userid=${window.btoa(receive_user_id)}`);
      } else {
        const json = JSON.stringify({
          senderId: userlogin.message_id,
          receiverId: receive_user_id,
        });
        const response = await addTwoUser(json);
        if (response) {
          navigate(
            `/chats/${response.data.data._id}?userid=${window.btoa(
              receive_user_id
            )}`
          );
        }
      }
    } else {
      if (present) {
        navigate(
          `/message/${message_id}?userid=${window.btoa(receive_user_id)}`
        );
      } else {
        const json = JSON.stringify({
          senderId: userlogin.message_id,
          receiverId: receive_user_id,
        });
        const response = await addTwoUser(json);
        if (response) {
          navigate(
            `/message/${response.data.data._id}?userid=${window.btoa(
              receive_user_id
            )}`
          );
        }
      }
    }
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`} ref={sidebarRef}>
      <h2 style={{ textAlign: "end" }}>Followers</h2>
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

        {postdata.map((user, index) => (
          <div
            key={index}
            className="user-info"
            style={{ paddingBottom: "44px" }}
          >
            <img src={user.user_pic} alt="User" />
            <span className="user-name side-model-name">{user.user_name}</span>
            <div
              className="edit-content"
              onClick={() =>
                handleMessage(
                  user.message_id,
                  user.connect_message_id,
                  user.present
                )
              }
            >
              <button className="edit-profile-btn">Message</button>
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

export default SideModel;
