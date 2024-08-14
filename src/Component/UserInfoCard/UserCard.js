import React, { useState, useEffect } from "react";
import "./UserCard.css";
import MessageIcon from "./message.png";
import ConnectIcon from "./connection.png";
import {
  useSearchParams,
  useNavigate,
  useLocation,
  useParams,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SearchUser_and_Post, SearchTags, FollowUser } from "../../AllApi/Integrateapi";
import InfiniteScroll from "react-infinite-scroll-component";
import { setRefresh } from "../../redux/action/RefreshAction";
import { removeDuplicates } from "../../Utiles";
import Loder from "../LoderComponent/Loder";
import { setData } from "../../redux/action/LoginAction";
import HandleFollow from "../HandleFollow";

export default function UserCard({ searchby_data ,work_title,location_user}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { title } = useParams();
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");
 
  
  const [page, setPage] = useState(1);
  const userlogin = useSelector((state) => state.myReducer.data);
  const userlocation = useSelector((state) => state.UserLocation.data);
  const searchQuery = useSelector((state) => state.SearchReducer.data);
  let query = title || searchQuery;
  const [alldata, setAlldata] = useState([]);
  const [alldata2, setAlldata2] = useState([]);
  const [search, setSearch] = useState(true);

  //post data
  const [alldata3, setAlldata3] = useState([]);
  const [search1, setSearch1] = useState(false);
  const [page1, setPage1] = useState(1);
  // console.log(splitLocation[1],"splitLocation",search1);
  //profile data api call start
  useEffect(() => {
    setPage(1);
    setAlldata2([]);
    setSearch(true);
    const timer = setTimeout(() => {
      const getAlldata = async () => {
        try {
          const response = await SearchUser_and_Post(
            query,
            userlogin.user_id,
            page,
            work_title || "",
            location_user||'',
            userlocation.latitude,
            userlocation.longitude,
            searchby_data
          );
          // setAlldata(response.data)
          setAlldata2(response.data);
          setSearch(false)
        } catch (e) {
          // setAlldata(e.response.data.data);
          setAlldata2([]);
          setSearch(false)
        }
      };
      if(userlogin.user_id && searchby_data==="profile"){
      getAlldata();
      // setSearch(false);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchQuery, title,userlogin.user_id,searchby_data,work_title,location_user]);



  const loadMore = async () => {
    setPage((prevPage) => prevPage + 1);
    setSearch(true);
    try {
      const response = await SearchUser_and_Post(
        query,
        userlogin.user_id,
        page,
        work_title || "",
        location_user||'',
        userlocation.latitude,
        userlocation.longitude,
        searchby_data
      );

      setAlldata2((prevData) => [...prevData, ...response.data]);
      setSearch(false);
    } catch (e) {
      // setAlldata(e.response.data.data);
      setAlldata2([]);
      setSearch(false);
    }
  };

    //profile data api call end

    //post data api call start

  useEffect(() => {
    setPage1(1);
    setAlldata3([]);
    setSearch1(true);
    const timer = setTimeout(() => {
      const getAlldata = async () => {
        try {
          const response = await SearchUser_and_Post(
            query,
            userlogin.user_id,
            page,
            work_title || "",
            userlocation.latitude,
            userlocation.longitude,
            searchby_data
          );
          // setAlldata(response.data)
          setAlldata3(response.data);
          setSearch1(false)
        } catch (e) {
          // setAlldata(e.response.data.data);
          setAlldata3([]);
          setSearch1(false)
        }
      };
      if(userlogin.user_id && searchby_data==="post"){
      getAlldata();
      // setSearch(false);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchQuery, title,userlogin.user_id,searchby_data]);

  const loadMore2 = async () => {
    setPage1((prevPage) => prevPage + 1);
    setSearch1(true);
    try {
      const response = await SearchUser_and_Post(
        query,
        userlogin.user_id,
        page,
        work_title || "",
        userlocation.latitude,
        userlocation.longitude,
        searchby_data
      );

      setAlldata3((prevData) => [...prevData, ...response.data]);
      setSearch1(false);
    } catch (e) {
      // setAlldata(e.response.data.data);
      setAlldata3([]);
      setSearch1(false);
    }
  };

   //post data api call end

  useEffect(() => {
    const timer = setTimeout(() => {
      const getAlldata = async () => {
        try {
          setSearch(true);
          setSearch1(true);
          const response = await SearchTags(searchQuery);

          setAlldata(response.data);
          setSearch(false);
          setSearch1(false)
        } catch (e) {
          setSearch(false);
          setSearch1(false);
          setAlldata([]);
        } finally {
          setSearch(false);
           setSearch1(false);
        }
      };
      if (userlogin.user_id && searchQuery.trim() && searchQuery.length > 0) {
        getAlldata();
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  let uniqueIds = removeDuplicates(alldata2, "_id");
  let uniqueIds2 = removeDuplicates(alldata3, "_id");



  const handleProfile = (id) => {
    navigate(`/otherprofile/${new Date().getMilliseconds()}?user_id=${id}`);
  };




  // const HandleFollow=({id,user_follow})=>{
  //   const [Follow,setFollow]=useState(user_follow)
  //  console.log(Follow,"FollowFollowFollowFollow");
  // const handleFollowuser=async()=>{
  //   setFollow(!Follow)
  //   try{
  //    let res= await FollowUser(id,userlogin.user_id)
  //    if(res ){
  //     if(!Follow){
  //       dispatch(setData({...userlogin,total_following:userlogin.total_following+1}))
  //       setFollow(!Follow)
  //     }else{
  //       dispatch(setData({...userlogin,total_following:userlogin.total_following-1}))
  //       setFollow(!Follow)
  //     }
    
  //    }
  //   }catch(err){

  //     setFollow(false)
  //   }
    
  // }

  // useEffect(()=>{

  // })
  // return(
  //   <>
  //    <div className="btn-theme icon-left" onClick={()=>handleFollowuser()}>{Follow?('Following' ):"+Follow"}</div>
  // {/* <span className='followuser' onClick={()=>handleFollowuser()}>{Follow?('Following' ):"Follow"}</span> */}
  //   </>
  // )
  // }

  //screen size
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
 const[show_tag,setShow_tag]=useState(true)
  const handleSearchMobile=(e)=>{
    setShow_tag(false)
    navigate(`/searchuser/${e}`)
  }
 
  return (
    <>
    {searchby_data==='profile'?(
  <div>
  <InfiniteScroll
    dataLength={alldata2.length}
    next={loadMore}
    hasMore={true}
    // loader={data?.length!==0 &&<h4>Loading...</h4>}
  >
    <body>
      <div class="wrapper">
        {isMobile &&!show_tag ?(
       <div className="tages" style={{ marginTop:"-34px" }}>
       {alldata.map((item, index) => (
         <div
           key={index}
           className="li"
           
          
         >
         
           <a onClick={()=>handleSearchMobile(item.tages)} className='a'>
           <i class="fa fa-search" style={{ marginRight:"2px" }}></i>
             {item.tages}
           </a>
          
         </div>
       ))}
</div>
        ):""}

        {uniqueIds.map((item) => (
          <>
         
                <div className="containeruser">
                  <div className="topbotton_bar">
                    {/* {item.work_title&&( */}
                      <p className="jobtitle">{item.work_title||''}</p>
                    {/* )} */}
                     
                    {/* <div className="btn-theme icon-left">+FOLLOW</div> */}
                  </div>
                  <div>
                  <img src={item.user_pic} alt="" className="profile-image" onClick={()=>handleProfile(item.user_id)}/>
                  </div>
                  
                  <h1 className="name" onClick={()=>handleProfile(item.user_id)}>{item.user_name}</h1>
                  {/* <p class="description">My name is not Keith, but I am a Kitten. This is just basically dummy text. Do not be fooled by the dogs - Cats rule, dogs drool  mrinmay!</p> */}
                  {/* <div class="bottonbtn">
                                                   <p><img src={ConnectIcon} style={{ height: "31px" }} onClick={()=>handleProfile(item.user_id)} alt=''/>Connect</p>
                                                   <p><img src={MessageIcon} style={{ height: "25px" }} alt=''/>Message</p>
                                              </div> */}
                                              <HandleFollow id={item.message_id} user_follow={item.user_follow} user_id={userlogin.user_id}/>
                                              {/* <HandleFollow id={item.message_id} user_follow={item.user_follow}/> */}
                </div>
              </>
          
        ))}
      </div>
    </body>
  </InfiniteScroll>
  <div style={{ alignItems: "center", textAlign: "center" }}>
    {search && <Loder />}
    {/* {!search &&(<>{alldata2.length === 0 ? <div>No data found</div> : ""}</>)} */}
    {splitLocation[1]==='location'?(<>
          {!search &&(<>{alldata.length === 0 ? <div>No data found</div> : ""}</>)}</>):(
            <>
            {!search &&(<>{alldata2.length === 0 ? <div>No data found</div> : ""}</>)}
            </>
          )}
  </div>
</div>
    ):(
      <div>
      <InfiniteScroll
        dataLength={alldata3.length}
        next={loadMore2}
        hasMore={true}
        // loader={data?.length!==0 &&<h4>Loading...</h4>}
      >
        <body>
          <div class="wrapper">
            {isMobile &&show_tag ?(
           <div className="tages" style={{ marginTop:"-34px" }}>
           {alldata.map((item, index) => (
             <div
               key={index}
               className="li"
              
             >
             
               <a onClick={()=>handleSearchMobile(item.tages)} className='a'>
               <i class="fa fa-search" style={{ marginRight:"2px" }}></i>
                 {item.tages}
               </a>
              
             </div>
           ))}
</div>
            ):""}
 
            {uniqueIds2.map((item) => (
              <>
             
                    <div className="containeruser">
                      <div className="banner-image"></div>
                      <img src={item.user_pic} alt="" className="profile-image" />
                      <h1 className="name">{item.user_name}</h1>
                      {/* <HandleFollow id={item.message_id} user_follow={item.user_follow}/> */}
                      <HandleFollow id={item.message_id} user_follow={item.user_follow} user_id={userlogin.user_id}/>
                      {item.post_img && (
                        <img
                          src={`${process.env.REACT_APP_FIREBASE}${process.env.REACT_APP_BUCKET}/o/${item.post_img}?alt=media`}
                          className="searchpostimg"
                          alt=""
                        />
                      )}
                      <p className="description">
                        {item.post_title?.length > 30
                          ? item.post_title?.slice(0, 30)
                          : item.post_title}
                      </p>
                    </div>
                
              </>
            ))}
          </div>
        </body>
      </InfiniteScroll>
      <div style={{ alignItems: "center", textAlign: "center" }}>
        {search1 && <Loder />}
        {splitLocation[1]==='location'?(<>
          {!search1 &&(<>{alldata.length === 0 ? <div>No data found</div> : ""}</>)}</>):(
            <>
            {!search1 &&(<>{alldata3.length === 0 ? <div>No data found</div> : ""}</>)}
            </>
          )}
        
      </div>
    </div>
    )}
  
    </>
  );
}
