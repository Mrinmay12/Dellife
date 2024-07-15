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
export default function Home() {
  const userlogin = useSelector(state => state.myReducer.data)
  const userlocation = useSelector(state => state.UserLocation.data)
  const postreff = useSelector(state => state.UpdateReducer.data)
  const socket = useRef();

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
const[color,setColor]=useState("black")
useEffect(() => {
  setPostdata([]); 
  setPage(1);
}, [color]);
let user_latitude=userlocation.latitude||""
let user_longitude=userlocation.longitude||""

const fetchAllPost = async (page) => {
  if(userlogin?.user_id){
  const res = await userAllPost(page,userlogin?.user_id,color,user_latitude,user_longitude)
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
console.log(page,"page");
  useEffect(() => {
    if (data && userlogin?.user_id) {
      setPostdata((prevData) => [...prevData, ...data]);
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
  
  console.log(
    userlocation,"this is userlocation",postdata
  );
const[report_postid,setReport_postid]=useState([])
useEffect(()=>{
  if(postreff){
    setReport_postid([...report_postid,postreff])
  }
},[postreff])

  return (
    <div>
    <SmallTopbar setColor={setColor}/>
    <div style={{paddingTop:"69px"}}>
     <InfiniteScroll
        dataLength={postdata.length}
        next={loadMore}
        hasMore={true}
        // loader={data?.length!==0 &&<h4>Loading...</h4>}
      >
    {postdata.filter(item => !report_postid.includes(item.post_id)).map((item)=>(
      <TextShow item={item}/>
    ))}
    </InfiniteScroll>
</div>
    <div style={{textAlign:"center",paddingTop:"69px"}}>
    {/* {isFetching ?<Loder/>:"No more data"} */}
    {isFetching  &&postdata?.length>0 ?<Loder/>:""}
    {isFetching&&postdata?.length===0 ?<Skeleton/>:""}
    {!isFetching && data?.length===0?<>
    <img src={checkImg} width="30px"/>
    <p style={{ fontSize:"large" ,fontFamily:'Montserrat'}}>You're all caught up.</p>
    </>:""}
    </div> 
    </div>
  )
}
