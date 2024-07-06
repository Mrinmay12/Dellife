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
  import { getPerticular_post } from '../AllApi/Integrateapi';
import { useSelector, useDispatch } from 'react-redux';
import { useParams} from 'react-router-dom';
import Skeleton from '../Component/SkeletonLoder/Skeleton';

const Perticularpost=()=>{
    const userlogin = useSelector(state => state.myReducer.data)
    let user_id=userlogin?.user_id?userlogin?.user_id:new Date().getMilliseconds()
    let { post_id } = useParams();
    const[data,setData]=useState([])
    const fetchAllPost = async () => {
        try{
        const res = await getPerticular_post(post_id,user_id)
        if(res){
            setData(res.data.post);
        }
    }catch{
        setData([])
    }
      };

      useEffect(()=>{
        if(post_id){
            fetchAllPost()
        }
      },[post_id,user_id])
 
      return (
        <div>

{data.length===0 ?<Skeleton/>: <TextShow item={data}/>}

     


    <div style={{textAlign:"center",paddingTop:"9px"}}>

    </div>
        </div>
      )

}

export default Perticularpost