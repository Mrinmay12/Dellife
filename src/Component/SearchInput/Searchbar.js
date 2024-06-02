import React, { useState,useEffect } from "react";
import "./Searchbar.css";
import { useSelector,useDispatch } from 'react-redux';
import { SearchUser_and_Post } from '../../AllApi/Integrateapi';
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
const[loder,setLoder]=useState(false)
  useEffect(() => {
        
    const timer = setTimeout(() => {
    const getAlldata = async () => {
    try {
        setLoder(true)
    const response = await SearchUser_and_Post(query,userlogin.user_id,page,"")
    // setAlldata(response.data)
    setResults((prevData) => [...prevData, ...response.data])
    // setAlldata(response.data)
    
    // setAlldata2(response.data)
    } catch (e) {
        setLoder(false)
    // setAlldata(e.response.data.data);
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
//     if(page>1){

    
//     }

    
    }, [page,userlogin.user_id,query])

    const loadMore = () => {
        // if (!isFetching && !isPreviousData) {
          setPage((prevPage) => prevPage + 1);
        //   setAlldata((prevData) => [...prevData, ...alldata2]);
        // }
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

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setSelectedIndex((prevIndex) => (prevIndex + 1) % results.length);
     
    } else if (e.key === "ArrowUp") {
      setSelectedIndex(
        (prevIndex) => (prevIndex - 1 + results.length) % results.length
      );
    
    } else if (e.key === "Enter" && selectedIndex >= 0) {
        console.log(results[selectedIndex]);
          window.location.href=results[selectedIndex]?.link
    //   setQuery(results[selectedIndex].title);
      setResults([]);
    }
  };
  

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  const handleProfile = (id) => {
    setResults([]);
    setQuery('')
    navigate(`/otherprofile/${new Date().getMilliseconds()}?user_id=${id}`);


  };
  return (
    <div className="search-container">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Search..."
      />
         <div className="search-icon">
        <i class="fa fa-search"></i>
            </div>
      {results.length > 0 && (
        <div className="dropdownsearch">
        {/* <InfiniteScroll
        dataLength={alldata.length}
        next={loadMore}
        hasMore={true}
        style={{maxHeight:"300px"}}
        loader={loder && <h4>Loading...</h4>}
      > */}
          <div className="ul">
            {results.map((item, index) => (
              <div
                key={index}
                className={index === selectedIndex ? "selected li" : "li"}
               
              >
               {item.user_details ? (
                <a onClick={()=>handleProfile(item.user_id)} className='a'>
                  <img src={item.user_pic} alt={item.user_name} className='img'/>
                  {item.user_name}{" "}{("ufufuf")}
                </a>
               ):(
                <a onClick={()=>handleProfile(item.user_id)} className='a'>
                {item.post_img &&(  <img src={`${process.env.REACT_APP_FIREBASE}${process.env.REACT_APP_BUCKET}/o/${item.post_img}?alt=media`} alt={"post"} className='img'/>)}
                  {item.post_title?.length>30?item.post_title?.slice(0,30):item.post_title}
                </a>
               )}
              </div>
            ))}
          </div>
          {/* </InfiniteScroll> */}
        </div>
      )}
    </div>
  );
};

export default Searchbar;