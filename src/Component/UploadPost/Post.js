import React, { useState, useRef, useEffect } from 'react'
import "./Post.css"
import clickSound from "./Image/click.mp3"
import InputField from './InputField';
import InputArea from './InputArea';
import {
  useNavigate,
} from "react-router-dom"; 
import { useSelector } from 'react-redux';
export default function Post() {
  const navigate=useNavigate();
  // const data = useSelector(state => state.myReducer.data);
  const [fimage, setFImage] = useState(null);
  const [simage, setSImage] = useState(null);
  const [fimageUrl, setFimageUrl] = useState("");
  const [imgnotexist, setImgnotExist] = useState(false)
  const [simageUrl, setSimageUrl] = useState("");
  const [imgnotexist2, setImgnotExist2] = useState(false)
  const[description,setdescription]=useState("")
  const fimageRef = useRef();
  const simageRef = useRef();
  const clickSoundRef = useRef(null);
  
  useEffect(() => {
    if (fimage !== null) {
      setFimageUrl("")
    }
  }, [fimage])
  useEffect(() => {
    if (simage !== null) {
      setSimageUrl("")
    }
  }, [simage])

  //Image URL valid or not check
  function checkImage(url) {
    var image = new Image();
    image.onload = function () {
      if (this.width > 0) {
        setImgnotExist(false);
      }
    }
    image.onerror = function () {
      setImgnotExist(true);
    }
    image.src = url;
  }
  checkImage(fimageUrl);
  function checkImage2(url) {
    var image = new Image();
    image.onload = function () {
      if (this.width > 0) {
        setImgnotExist2(false);
      }
    }
    image.onerror = function () {
      setImgnotExist2(true);
    }
    image.src = url;
  }
  checkImage2(simageUrl);

  const handleChnageImageF = (e) => {
    setFimageUrl(e)
  }
  const handleChnageImageS = (e) => {
    setSimageUrl(e)
  }
const handleTitle=(e)=>{
  setdescription(e)
}
// useEffect(()=>{
//   if(imgnotexist===true){
//     fimageRef.current.focus()                      
//     setFImage(null)
//   }
// },[imgnotexist])

const handleSound=()=>{
  clickSoundRef.current.play();
}
const handleSubmit = async (e) => {
  
// const formData = new FormData();
// formData.append('image1', fimage);
// formData.append('image2', simage);
// formData.append('user_id', "Mrinmayljv0j9f7q7940");
// formData.append('status', true);
// formData.append('post_description', description);
// if((fimage===null ||imgnotexist===true) && (simage===null || imgnotexist2===true) && description===""){
//   navigate("/")
  
// }else{

//   try {
//     await apiUrl.post('/api/userpost/newupload', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });
    
//     navigate("/");
//     // Reset the form
//     setFImage(null);
//     setSImage(null);
//     setdescription('');
//   } catch (error) {
//     console.error(error);
//     alert('Error uploading images. Please try again later.');
//   }
// }
}

const [textcolor,setTextcolor]=useState("black") 
const [textstyle,setTextstyle]=useState("1") 

const handleColor=(e)=>{
  setTextcolor(e)
}
const handleTextstyle=(e)=>{
  setTextstyle(e)
}



  return (
    <div className='allinone'>
   
     
      

      <div className='mmm'>
        <div className="file-upload-card">
         
          <>
            {fimageUrl || fimage ? (
              <>
               
                    {fimage && (
                      <>
                        <label for="file-upload" className="imgstyle">
                          <img alt='img' src={URL.createObjectURL(fimage)} className="imgstyle" />
                        </label>
                        <input type="file" name={fimage} ref={fimageRef} className="file-upload-input"
                          id="file-upload"
                          onChange={(e) => setFImage(e.target.files[0])} />
                      </>

                    )}
                  </>
              
            ) : (
              <>
                <label for="file-upload" className="file-upload-label">
                  <span className="file-upload-icon"></span>
                  <span className="file-upload-text">Choose a file</span>
                </label>
                <input type="file" name={fimage} ref={fimageRef} className="file-upload-input"
                  id="file-upload"
                  onChange={(e) => setFImage(e.target.files[0])} />
              </>
            )}
          </>


        </div>
       


      </div>
      <div className="texteditor">
      <div className='colorchange3' value={textcolor} onClick={()=>handleColor("black")}></div>
      <div className='colorchange' value={textcolor} onClick={()=>handleColor("red")}></div>
      <div className='colorchange1' value={textcolor} onClick={()=>handleColor("green")}></div>
      <div className='colorchange2' value={textcolor} onClick={()=>handleColor("blue")}></div>
      <div className='textmanustyle'>
        <p className='manutext' value={textstyle} onClick={()=>handleTextstyle("1")}>Text</p>
        <p className='manutext1' value={textstyle} onClick={()=>handleTextstyle("2")}>Text</p>
        <p className='manutext2'  value={textstyle} onClick={()=>handleTextstyle("3")}>Text</p>
      </div>
      </div>
      <InputArea handleChnage={handleTitle} textcolor={textcolor} textstyle={textstyle}/>
      <div className='btn'>
        <div className='btn_click'>
          <button className='clickpost' onClick={()=>{handleSound();handleSubmit();}}>Post</button>
          <audio ref={clickSoundRef}>
        <source src={clickSound} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
        </div>
      </div>
    </div>
  )
}
