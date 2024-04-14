import React ,{useState,useEffect}from 'react'
import "./Search.css"
import searchicon from "./search.png"
import { useSearchParams } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { setSearchdata } from '../../redux/action/SearchAction';
export default function Search() {
  const dispatch=useDispatch()
    const[search,setSearch]=useState("")
    const handleClear=()=>{
        setSearch("")
  dispatch(setSearchdata(""))

    }
    const otherUserid = sessionStorage.getItem("other_user")
    const [searchParams, setSearchParams] = useSearchParams();

    // useEffect(() => {
    //   setSearchParams({ query: search });
    // }, [search, searchParams]);
 useEffect(()=>{
  dispatch(setSearchdata(search))
 },[search])
  return (
    <div>
        {/* <div class="title-container">
    <h1 class="title">It's all about context.</h1>
    <h1 class="title-down">Ajax'ing something...</h1>
  </div> */}
  
  <fieldset class="field-container">
    <input type="text" placeholder="Search..." class="field" value={search} onChange={(e)=>setSearch(e.target.value)}/>
    <div class="icons-container">
      <div class="icon-search"><img src={searchicon} style={{width:"28px"}}/></div>
      <div class="icon-close" onClick={()=>handleClear()}>
        <div class="x-up" onClick={()=>handleClear()}></div>
        <div class="x-down" onClick={()=>handleClear()} ></div>
      </div>
    </div>
  </fieldset>
  </div>
  )
}
