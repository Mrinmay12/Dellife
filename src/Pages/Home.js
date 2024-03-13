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

export default function Home() {
  const userlogin = useSelector(state => state.myReducer.data)
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

const fetchAllPost = async (page) => {
  const res = await userAllPost(page)
  return res.data.data;
};
const { data, isFetching, isPreviousData } = useQuery({
  queryKey: ['projects', page],
  queryFn: () => fetchAllPost(page),
  keepPreviousData: true,
  staleTime: Infinity,
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
    if (data) {
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
  

    console.log(userlogin?.user_id,"user_id");
  return (
    <div>
     <InfiniteScroll
        dataLength={postdata.length}
        next={loadMore}
        hasMore={true}
        // loader={data?.length!==0 &&<h4>Loading...</h4>}
      >
    {postdata.map((item)=>(
      <TextShow item={item}/>
    ))}
    </InfiniteScroll>

    <div style={{textAlign:"center",paddingTop:"9px"}}>
    {isFetching ?<Loder/>:"No more data"}
    </div> 
    </div>
  )
}
