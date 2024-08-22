import React ,{useEffect,useState}from 'react'
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useMutation
} from 'react-query'
import Loder from "../LoderComponent/Loder"
import InfiniteScroll from "react-infinite-scroll-component";
import { UserSavePostGet } from '../../AllApi/Integrateapi'
import "./Postcard.css"
import { useSelector } from 'react-redux';
import BlurredUpImage from '../ImageLoad/BlurredUpImage';
import { useNavigate } from 'react-router-dom';
import { removeDuplicates } from '../../Utiles';
import nopostimg from "../Images/nopost.svg"
export default function SavePostcard({user_id,post_id}) { 
  const navigate=useNavigate()
  const userlogin = useSelector(state => state.myReducer.data)
  const [page, setPage] = useState(1);
  const [postdata,setPostdata]=useState([])
  const fetchAllPost = async (page) => {
   if(user_id){
    const res = await UserSavePostGet(user_id,page)
    return res.data.user_post;
   }    
    
  };
  // console.log(user_id,"user_iduser_id");
  const { data, isFetching, isPreviousData } = useQuery({
    queryKey: ['usersavepost', page,user_id],
    queryFn: () => fetchAllPost(page),
    keepPreviousData: true,
    staleTime: Infinity,
  });
  const loadMore = () => {
    // if (!isFetching && !isPreviousData) {
      setPage((prevPage) => prevPage + 1);
    // }
  };
// console.log(page,"page",postdata,data);
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
    navigate(`/sharepost/${id}`)
  }
 let uniqueIds= removeDuplicates(postdata,"_id")

  return (
    <div>
       <InfiniteScroll
        dataLength={postdata.length}
        next={loadMore}
        hasMore={true}
        // loader={data?.length!==0 &&<h4>Loading...</h4>}
      > 
<div class="gallery">

{uniqueIds?.map((item)=>(
  <>
    {item.post_img.length>0?(
      <div class="gallery-item" onClick={()=>handlePostid(item._id)}>
      <BlurredUpImage image={`${process.env.REACT_APP_FIREBASE}${process.env.REACT_APP_BUCKET}/o/${item.post_img[0]}?alt=media`}/>
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
 {isFetching ?<Loder/>:uniqueIds.length===0 &&
 <>
 <h3>You have no save posts yet</h3>
 <img src={nopostimg} width='68px'/>
 </>}
    </div>
    </div>
  )
}
