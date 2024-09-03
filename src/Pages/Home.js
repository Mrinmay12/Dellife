import React,{useState,useEffect,useRef} from 'react'
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
    useMutation
  } from 'react-query'
  import Loder from "../Component/LoderComponent/Loder"
  import InfiniteScroll from "react-infinite-scroll-component";
  import TextShow from '../Component/TextShow';
  import { userAllPost } from '../AllApi/Integrateapi';
import { useSelector, useDispatch } from 'react-redux';
import { io } from "socket.io-client"
import SmallTopbar from '../Navbar/SmallTopbar';
import Skeleton from '../Component/SkeletonLoder/Skeleton';
import checkImg from "../Images/check.svg"
import SearchUserIcon from "../Component/Images/SearchUser.svg"
import Button from '../Component/Button/Button';
import { removeDuplicates } from '../Utiles';
import { useNavigate } from 'react-router-dom';
export default function Home() {
  const userlogin = useSelector(state => state.myReducer.data)
  const userlocation = useSelector(state => state.UserLocation.data)
  const postreff = useSelector(state => state.UpdateReducer.data)
  const socket = useRef();
  const navigator=useNavigate()
  const queryClient = new QueryClient();
  const [page, setPage] = useState(1);
  const [reff,setRef]=useState("")
  const[isLoading,setIsLoading]=useState(false)
  const handlePagination = () => {
    if (!isFetching && data && data.length > 0) {
      setPage((prevPage) => prevPage + 1);
    }
  };
const [postdata,setPostdata]=useState([])
const [postdata2,setPostdata2]=useState([])
const[color,setColor]=useState("black")
useEffect(() => {
  setPostdata([]); 
  setPage(1);
}, [color]);
let user_latitude=userlocation.latitude||""
let user_longitude=userlocation.longitude||""

const fetchAllPost = async (page) => {
  if(userlogin?.user_id){
  const res = await userAllPost(page,userlogin?.user_id,color,user_latitude,user_longitude,userlogin.work_title||'',userlocation.locationName||'')
  return res.data.data;
  }
};
const { data, isFetching, isPreviousData } = useQuery({
  queryKey: ['projects', page,userlogin?.user_id,color,user_latitude,user_longitude],
  queryFn: () => fetchAllPost(page),
  keepPreviousData: true,
});
  // Mutations
  const mutation = useMutation({
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(['projects']);
    },
  });
  const loadMore = () => {
    // if (!isFetching && !isPreviousData) {
      setPage((prevPage) => prevPage + 1);
    // }
  };

  useEffect(() => {
    if (data && userlogin?.user_id) {
      setPostdata((prevData) => [...prevData, ...data]);
    }
    if(color==='black'&& data){
      setPostdata2((prevData) => [...prevData, ...data])
    }
  }, [data]);
    
  // useEffect(() => {
  //   const socket = io(process.env.REACT_APP_SOCKET_URL); // Connect to the backend WebSocket server
  //   // if (userlogin?.user_id) {
  //     socket.emit("add-user", "Mriisisid");
  //   // }

  //   socket.on("get-users", (users) => {
  //     console.log("Active Users:", users);
  //     // Update your UI with the active users
  //   });


  //   return () => {
  //     socket.disconnect(); // Disconnect the socket when component unmounts
  //   };
  // }, [userlogin?.user_id]);
  
  
const[report_postid,setReport_postid]=useState([])
useEffect(()=>{
  if(postreff){
    setReport_postid([...report_postid,postreff])
  }
},[postreff])

const handleFindUser=()=>{
  navigator(`/searchuser/${userlogin.work_title||''}`)
}
// console.log(userlogin.total_following,"mmdmdmdmdmdmdmdm",color);
let uniqueIds= removeDuplicates(postdata,"post_id")
let uniqueIds2= removeDuplicates(postdata2,"post_id")

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
let following=userlogin.total_following > 0?true:false
let show_style=[following,userlogin.location_post].every((ele)=>ele==false)


  return (
    <div>
    <SmallTopbar setColor={setColor} data={uniqueIds2?.length}/>
    {(userlogin.total_following>0 || color !=="green") ?(
      <>
         <div style={{paddingTop:isMobile?show_style?'0px':"63px":show_style?'0px':"62px"}}>
     <InfiniteScroll
        dataLength={uniqueIds.length}
        next={loadMore}
        hasMore={true}
        // loader={data?.length!==0 &&<h4>Loading...</h4>}
      >
    {uniqueIds.filter(item => !report_postid.includes(item.post_id)).map((item)=>(
      <TextShow item={item}/>
    ))}
    </InfiniteScroll>
</div>
    <div style={{textAlign:"center",paddingTop:"69px"}}>
    {/* {isFetching ?<Loder/>:"No more data"} */}
    {isFetching  &&uniqueIds?.length>0 ?<Loder/>:""}
    {isFetching&&uniqueIds?.length===0 ?<Skeleton/>:""}
    {!isFetching && data?.length===0?<>
    <img src={checkImg} width="30px" alt=''/>
    <p style={{ fontSize:"large" ,fontFamily:'Montserrat'}}>You're all caught up.</p>
    </>:""}
    </div> 
      </>
    ):(
      <div style={{ justifyContent:"center",display:"flex",marginTop:"150px",flexDirection:"column" ,alignItems:"center"}}>
      <img src={SearchUserIcon} alt='' width='80px'/>
      <div style={{ marginTop:"34px" }}>
      <Button value="Find users" handleClick={handleFindUser} backcolor={"#007bff"} icon={<i class="fa fa-search"></i>}/> 
      </div>
      </div>
    )}
 

   

    </div>
  )
}
