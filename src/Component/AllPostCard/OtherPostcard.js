import React ,{useEffect,useState}from 'react'
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useMutation
} from 'react-query'
import Loder from "../LoderComponent/Loder"
import InfiniteScroll from "react-infinite-scroll-component";
import { UserPostGet,AnotherUserPostGet } from '../../AllApi/Integrateapi'
import "./Postcard.css"
import { useSelector } from 'react-redux';
import BlurredUpImage from '../ImageLoad/BlurredUpImage';
export default function OtherPostcard({post_id}) { 
  const userlogin = useSelector(state => state.myReducer.data)
  const [page, setPage] = useState(1);
  const [postdata,setPostdata]=useState([])
  const fetchAllPost = async (page) => {
   
      const res = await AnotherUserPostGet(post_id,page)
    return res.data.postdetails;
  }
  const { data, isFetching, isPreviousData } = useQuery({
    queryKey: ['otheruserpost', page,post_id],
    queryFn: () => fetchAllPost(page),
    keepPreviousData: true,
    staleTime: Infinity,
  });
  const loadMore = () => {
    // if (!isFetching && !isPreviousData) {
      setPage((prevPage) => prevPage + 1);
    // }
  };

// useEffect(()=>{
//   if(user_id){
//     fetchAllPost(page)
//   }
// },[user_id])
  useEffect(() => {
    if (data) {
      setPostdata((prevData) => [...postdata, ...data]);
    }
  }, [data]);
  const handlePostid=(id)=>{
alert(id)
  }
  return (
    <div>
       <InfiniteScroll
        dataLength={postdata.length}
        next={loadMore}
        hasMore={true}
        // loader={data?.length!==0 &&<h4>Loading...</h4>}
      > 
<div class="gallery">
{postdata?.map((item)=>(
  <>
    {item.post_img?(
      <div class="gallery-item" onClick={()=>handlePostid(item._id)}>
      <BlurredUpImage image={`${process.env.REACT_APP_FIREBASE}${process.env.REACT_APP_BUCKET}/o/${item.post_img}?alt=media`}/>
    {/* <img src={`${process.env.REACT_APP_FIREBASE}${process.env.REACT_APP_BUCKET}/o/${item.post_img}?alt=media`}  alt="Image 1"/> */}
    <div class="image-title">{item.post_title}</div>
  </div>
    ):(
      <div class="text-card" onClick={()=>handlePostid(item._id)}>
  <h2>{item.post_title}</h2>
  {/* <p>{item.post_title}</p> */}
</div>
    )}
  </>
))}

  
 



</div>
</InfiniteScroll>  
 <div style={{textAlign:"center",paddingTop:"9px"}}>
    {isFetching ?<Loder/>:"No more data"}
    </div>
    </div>
  )
}
