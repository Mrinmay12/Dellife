import React ,{useState}from 'react'
import "./Search.css"
import searchicon from "./search.png"
export default function Search() {
    const[search,setSearch]=useState("")
    const handleClear=()=>{
        setSearch("")
    }
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
      <div class="icon-close" onClick={handleClear}>
        <div class="x-up"></div>
        <div class="x-down"></div>
      </div>
    </div>
  </fieldset>
  </div>
  )
}
