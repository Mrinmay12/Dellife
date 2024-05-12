import React,{useState,useEffect} from 'react'
import "./UserCard.css"
import MessageIcon from "./message.png" 
import ConnectIcon from "./connection.png"
import { useSearchParams,useNavigate,useLocation } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { SearchUser_and_Post } from '../../AllApi/Integrateapi';
  import InfiniteScroll from "react-infinite-scroll-component";
import { setRefresh } from '../../redux/action/RefreshAction';
import { removeDuplicates } from '../../Utiles';
import Loder from '../LoderComponent/Loder';
export default function UserCard() {
     const navigate=useNavigate()
     const dispatch=useDispatch()
     const [searchParams,setSearchParams] = useSearchParams();
     const location = useLocation();
     // const [searchQuery, setSearchQuery] = useState('');
     const[page,setPage]=useState(1)
     const userlogin = useSelector(state => state.myReducer.data)
     // useEffect(() => {
     //      const queryParam = searchParams.get('query');
     //      setSearchQuery(queryParam || ''); 
     //    }, [searchParams]);

const searchQuery=useSelector(state => state.SearchReducer.data)
        const[alldata,setAlldata]=useState([])
        const[alldata2,setAlldata2]=useState([])
    const [search,setSearch]=useState(false)
        useEffect(() => {
          setPage(1)
          setAlldata([])
          setAlldata2([])
          setSearch(true)
          const timer = setTimeout(() => {
   
          const getAlldata = async () => {
          try {
            
          const response = await SearchUser_and_Post(searchQuery,userlogin.user_id,page,"")
          // setAlldata(response.data)
          setAlldata(response.data)
       
          } catch (e) {
          // setAlldata(e.response.data.data);
          setAlldata([])
          }
          
          }
          // if(searchQuery){
          getAlldata()
          setSearch(false)
          // }
          }, 1000); 
          
          return () => clearTimeout(timer); 
          
          }, [ searchQuery])

          useEffect(() => {
        
        
               const getAlldata = async () => {
               try {
               const response = await SearchUser_and_Post(searchQuery,userlogin.user_id,page,"")
               // setAlldata(response.data)
               setAlldata(response.data)
               // setAlldata2(response.data)
               } catch (e) {
               // setAlldata(e.response.data.data);
               setAlldata([])
               }
               
               }
          //     if(page>1){
               if(userlogin.user_id){
               getAlldata()
          }
               
          //     }
           
               
               }, [page,userlogin.user_id])

      const loadMore = () => {
          // if (!isFetching && !isPreviousData) {
            setPage((prevPage) => prevPage + 1);
          //   setAlldata((prevData) => [...prevData, ...alldata2]);
          // }
        };

        useEffect(() => {
    if(alldata){
          setAlldata2((prevData) => [...prevData, ...alldata]);
    }
        }, [alldata]);

        let uniqueIds= removeDuplicates(alldata2,"_id")
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
                                                       <p><img src={ConnectIcon} style={{ height: "31px" }} onClick={()=>handleProfile(item.user_id)}/>Connect</p>
                                                       <p><img src={MessageIcon} style={{ height: "25px" }} />Message</p>
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
                                                  <img src={`${process.env.REACT_APP_FIREBASE}${process.env.REACT_APP_BUCKET}/o/${item.post_img}?alt=media`} className="searchpostimg"/>
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
