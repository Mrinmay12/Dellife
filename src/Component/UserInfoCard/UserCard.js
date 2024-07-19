import React,{useState,useEffect} from 'react'
import "./UserCard.css"
import MessageIcon from "./message.png" 
import ConnectIcon from "./connection.png"
import { useSearchParams,useNavigate,useLocation,useParams } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { SearchUser_and_Post,SearchTags } from '../../AllApi/Integrateapi';
  import InfiniteScroll from "react-infinite-scroll-component";
import { setRefresh } from '../../redux/action/RefreshAction';
import { removeDuplicates } from '../../Utiles';
import Loder from '../LoderComponent/Loder';

export default function UserCard({searchby_data}) {
     const navigate=useNavigate()
     const dispatch=useDispatch()
     const { title } = useParams();
   
     const[page,setPage]=useState(1)
     const userlogin = useSelector(state => state.myReducer.data)
     const userlocation = useSelector(state => state.UserLocation.data)
const searchQuery=useSelector(state => state.SearchReducer.data)
let query=title||searchQuery
        const[alldata,setAlldata]=useState([])
        const[alldata2,setAlldata2]=useState([])
    const [search,setSearch]=useState(false)
        useEffect(() => {
          setPage(1)
          setAlldata2([])
          setSearch(true)
          const timer = setTimeout(() => {
   
          const getAlldata = async () => {
          try {
          const response = await SearchUser_and_Post(query,userlogin.user_id,page,userlogin.work_title||"",userlocation.latitude,userlocation.longitude,searchby_data)
          // setAlldata(response.data)
          setAlldata2(response.data)
       
          } catch (e) {
          // setAlldata(e.response.data.data);
          setAlldata2([])
          }
          
          }
          // if(searchQuery){
          getAlldata()
          setSearch(false)
          // }
          }, 1000); 
          
          return () => clearTimeout(timer); 
          
          }, [ searchQuery,title])

        console.log(alldata2,"alldata2");

      const loadMore = async() => {
       
            setPage((prevPage) => prevPage + 1);
            setSearch(true)
            try {
            
              const response = await SearchUser_and_Post(query,userlogin.user_id,page,userlogin.work_title||"",userlocation.latitude,userlocation.longitude,searchby_data)
        
              setAlldata2((prevData) => [...prevData, ...response.data]);
              setSearch(false)
              } catch (e) {
              // setAlldata(e.response.data.data);
              setAlldata2([])
              setSearch(false)
              }
          
        };

 

useEffect(() => {
        
     const timer = setTimeout(() => {
     const getAlldata = async () => {
     try {
          setSearch(true)
     const response = await SearchTags(searchQuery)
  
     setAlldata(response.data)
    
     } catch (e) {
         setSearch(false)
     setAlldata([])
     }finally{
     setSearch(false)
     }
     
     }
     if(userlogin.user_id && searchQuery.trim() && searchQuery.length > 0){
         getAlldata()
     }
 }, 1000); 
           
 return () => clearTimeout(timer); 
   
     }, [searchQuery])

        let uniqueIds= removeDuplicates(alldata2,"_id")
        console.log(uniqueIds,"uniqueIds");
        const handleProfile = (id) => {
 
          navigate(`/otherprofile/${new Date().getMilliseconds()}?user_id=${id}`);

  
        };
     //    console.log(alldata2);
  return (
    <div>
     <InfiniteScroll
        dataLength={alldata2.length}
        next={loadMore}
        hasMore={true}
        // loader={data?.length!==0 &&<h4>Loading...</h4>}
      >
   <body> 
     <div class="wrapper">
     {/* {uniqueIds.map((item, index) => (
              <div
                key={index}
                className="li"
               
              >
              
                <a onClick={()=>handleProfile(item.tages)} className='a'>
                <i class="fa fa-search" style={{ marginRight:"2px" }}></i>
                  {item.tages}
                </a>
               
              </div>
            ))} */}
     {uniqueIds.map((item) => (
                              <>
                                   {item.user_details ? (
                                        <>
                                             <div class="containeruser">
                                                  <div class="banner-image"></div>
                                                  <img src={item.user_pic} alt="" class="profile-image" />
                                                  <h1 class="name">{item.user_name}</h1>
                                                  <p class="description">My name is not Keith, but I am a Kitten. This is just basically dummy text. Do not be fooled by the dogs - Cats rule, dogs drool  mrinmay!</p>
                                                  <div class="bottonbtn">
                                                       <p><img src={ConnectIcon} style={{ height: "31px" }} onClick={()=>handleProfile(item.user_id)} alt=''/>Connect</p>
                                                       <p><img src={MessageIcon} style={{ height: "25px" }} alt=''/>Message</p>
                                                  </div>

                                             </div>
                                        </>
                                   ) : (
                                        <>
                                        <div class="containeruser">
                                                  <div class="banner-image"></div>
                                                  <img src={item.user_pic} alt="" class="profile-image" />
                                                  <h1 class="name">{item.user_name}</h1>
                                                {item.post_img &&(
                                                  <img src={`${process.env.REACT_APP_FIREBASE}${process.env.REACT_APP_BUCKET}/o/${item.post_img}?alt=media`} className="searchpostimg" alt=''/>
                                                )}  
                                                  <p class="description">{item.post_title?.length>30?item.post_title?.slice(0,30):item.post_title}</p>
                                                  

                                             </div>
                                        </>
                                   )}

                              </>
                         ))}
       
        
     </div>
     </body>
     </InfiniteScroll>
     <div style={{alignItems:"center",textAlign:"center"}}>
     {search &&<Loder/>}
     {uniqueIds.length===0 && !search?<div>No data found</div>:""}
     </div>
    </div>

  )
}
