import React, { useState,useEffect } from "react";
import "./Searchbar.css";
import { useSelector,useDispatch } from 'react-redux';
import { SearchTags, SearchUser_and_Post } from '../../AllApi/Integrateapi';
  import InfiniteScroll from "react-infinite-scroll-component";
  import { useNavigate } from 'react-router-dom';
const Searchbar = () => {
    const navigate=useNavigate()
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const[alldata,setAlldata]=useState([])
  const[page,setPage]=useState(1)
  const userlogin = useSelector(state => state.myReducer.data)
  const userlocation = useSelector(state => state.UserLocation.data)
  console.log(userlogin,"userloginuserloginuserlogin",userlocation);

const[loder,setLoder]=useState(false)
//   useEffect(() => {
        
//     const timer = setTimeout(() => {
//     const getAlldata = async () => {
//     try {
//         setLoder(true)
//     const response = await SearchUser_and_Post(query,userlogin.user_id,page,userlogin.work_title||"",userlocation.latitude,userlocation.longitude)
 
//     setResults((prevData) => [...prevData, ...response.data])
   
//     } catch (e) {
//         setLoder(false)
//     setResults([])
//     }finally{
//     setLoder(false)
//     }
    
//     }
//     if(userlogin.user_id && query.trim() && query.length > 0){
//         getAlldata()
//     }
// }, 1000); 
          
// return () => clearTimeout(timer); 
// //     if(page>1){

    
// //     }

    
//     }, [page,userlogin.user_id,query])


  useEffect(() => {
        
    const timer = setTimeout(() => {
    const getAlldata = async () => {
    try {
        setLoder(true)
    const response = await SearchTags(query)
 
    setResults((prevData) => [...prevData, ...response.data])
   
    } catch (e) {
        setLoder(false)
    setResults([])
    }finally{
    setLoder(false)
    }
    
    }
    if(userlogin.user_id && query.trim() && query.length > 0){
        getAlldata()
    }
}, 1000); 
          
return () => clearTimeout(timer); 
  
    }, [query])

    const loadMore = () => {
      
          setPage((prevPage) => prevPage + 1);
    
      };
 

  const handleInputChange = (e) => {
    const query = e.target.value;
    setQuery(query);
    setResults([]);
    if (query.trim() && query.length > 0) {
      setSelectedIndex(-1);
     
    } else {
    //   setResults([]);
    }
  };

  const handleClickOutside = (e) => {
    if (!e.target.closest(".search-container")) {
      setResults([]);
    }
  };
const [searchdata,setSearchdata]=useState("")
  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setSelectedIndex((prevIndex) => (prevIndex + 1) % results.length);
     
    } else if (e.key === "ArrowUp") {
      setSelectedIndex(
        (prevIndex) => (prevIndex - 1 + results.length) % results.length
      );
    
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      setSearchdata(results[selectedIndex]?.tages)

    navigate(`/searchuser/${results[selectedIndex]?.tages}`)
      setResults([]);
      setQuery('')
    }
  };
  

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);   
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  const handleProfile = (id) => {
    setSearchdata(id)
    navigate(`/searchuser/${id}`)
    setResults([]);
    setQuery('')
    // navigate(`/otherprofile/${new Date().getMilliseconds()}?user_id=${id}`);


  };

  let show='near'
  return (
    <div className="search-container">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Search user or job"
      />
         <div className="search-icon">
        <i class="fa fa-search"></i>
            </div>
            {/* <div className="search-icon" style={{ cursor: "pointer", position: "absolute", right: "-276px",color:"red" }} onClick={() => setQuery('')}>
    <i className="fa fa-close"></i>
  </div> */}
          
          
              <>
                  {results.length > 0 && (
        <div className="dropdownsearch">
    
          <div className="ul">
          {results.map((item, index) => (
              <div
                key={index}
                className={index === selectedIndex ? "selected li" : "li"}
               
              >
              
                <a onClick={()=>handleProfile(item.tages)} className='a'>
                <i class="fa fa-search" style={{ marginRight:"2px" }}></i>
                  {item.tages}
                </a>
               
              </div>
            ))}
           
          </div>
      
        </div>
      )}
              </>
          
  
    </div>
  );
};

export default Searchbar;