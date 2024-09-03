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
import { useNavigate } from 'react-router-dom';
import { removeDuplicates } from '../../Utiles';
import nopostimg from "../Images/nopost.svg"
import DealModel from '../UserPostComment/DealModel';
export default function Postcard({user_id,post_id,show}) { 
  const navigate=useNavigate()
  const userlogin = useSelector(state => state.myReducer.data)
  const refreshdata = useSelector(state => state.RefreshReducer.data)
  const postreff = useSelector(state => state.UpdateReducer.data)
  const [page, setPage] = useState(1);
  const [postdata,setPostdata]=useState([])
  const fetchAllPost = async (page) => {
   if(user_id){
    const res = await UserPostGet(user_id,page)
    return res.data.user_post;
   }    
    
  };
  console.log(user_id,"user_iduser_id");
  const { data, isFetching, isPreviousData } = useQuery({
    queryKey: ['userpost', page,user_id,refreshdata,show],
    queryFn: () => fetchAllPost(page),
    keepPreviousData: true,
    staleTime: Infinity,
  });
  // console.log('====================================');
  // console.log(refreshdata,"refreshdata");
  // console.log('====================================');
  useEffect(()=>{
    setPage(1)
  },[refreshdata])
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
  // console.log(uniqueIds,"dgfdg",postreff);
  const[report_postid,setReport_postid]=useState([])
useEffect(()=>{
  if(postreff){
    setReport_postid([...report_postid,postreff])
  }
},[postreff])
const [isModalOpen, setIsModalOpen] = useState(false);

const closeModal = () => {
  setIsModalOpen(false);
};
const [postId, setPostId] = useState("");
const handleDealOpen=(postid)=>{
  setIsModalOpen(true)
  setPostId(postid);
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

{uniqueIds?.filter(item => !report_postid.includes(item._id)).map((item)=>(
  <>
    {item.post_img.length>0?(
      <div class="gallery-item" >
          <div onClick={()=>handlePostid(item._id)} style={{ height:"100%" }}>
      <BlurredUpImage image={`${process.env.REACT_APP_FIREBASE}${process.env.REACT_APP_BUCKET}/o/${item.post_img[0]}?alt=media`}/>
    {/* <img src={`${process.env.REACT_APP_FIREBASE}${process.env.REACT_APP_BUCKET}/o/${item.post_img}?alt=media`}  alt="Image 1"/> */}
    </div>
    {item.user_deal &&(
 <div class="image-title">{item.post_title}<button className="edit-profile-btn" style={{ color:'#07b807',left:"1px",position:"absolute",top:"23px" }} onClick={()=>handleDealOpen(item._id)}>Deal</button>
    </div>
    )}
   
    
  </div>
    ):(
      <div class="text-card" >
        {item.user_deal&&(
          <button className="edit-profile-btn" style={{ color:'#07b807' }} onClick={()=>handleDealOpen(item._id)}>Deal</button>
        )}
                     
  <h2 onClick={()=>handlePostid(item._id)}>{item.post_title}</h2>
  {/* <p>{item.post_title}</p> */}
</div>
    )}
  </>
))}

  
 



</div>
</InfiniteScroll>  
 <div style={{textAlign:"center",paddingTop:"9px"}}>
 {isFetching ?<Loder/>:uniqueIds.length===0 &&<>
 <h3>You have no posts yet</h3>
 <img src={nopostimg} width='68px'/>
 </>}
    </div>{isModalOpen &&<DealModel  onClose={closeModal} postid={postId} userlogin={userlogin} show={"deal"}/> }
    </div>
  )
}
