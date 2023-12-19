import React,{useState,useEffect} from 'react'
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
export default function Home() {
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
    console.log(data,"productsproducts",postdata);
    
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
