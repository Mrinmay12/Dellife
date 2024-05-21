import React, { useState, useRef, useEffect } from 'react'
import "./Post.css"
import clickSound from "./Image/click.mp3"
// import InputField from './InputField';
import InputArea from './InputArea';
import InputField from '../RegisterInput/InputField';
import PostForm from '../PostForm/PostForm';
import {
  useNavigate,
} from "react-router-dom"; 
import { useSelector } from 'react-redux';
import Texteditor from './TextEditor/Texteditor';
import apiUrl from '../../ApiAxios';
import { userNewPost } from '../../AllApi/Integrateapi';
export default function Post() {
  const userlogin = useSelector(state => state.myReducer.data)
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


const [Json,setJson]=useState({})
console.log("json data",fimage);

const handleSound=()=>{
  clickSoundRef.current.play();
}
const handleSubmit = async (e) => {
  
const formData = new FormData();
formData.append('image', fimage);
formData.append('user_id', userlogin.user_id);
formData.append('post_title', Json.text);
formData.append('color_code', Json.textcolor);
formData.append('textstyle', Json.textstyle);
// formData.append('status', true);
// formData.append('post_description', description);
if(Json.text===""){
  navigate("/")
  
}else{

  try {
    await userNewPost(formData)
    
    navigate("/");
    setFImage(null);

  } catch (error) {
    console.error(error);
    alert('Error uploading images. Please try again later.');
  }
}
}


const [files, setFiles] = useState([]);
const [error, setError] = useState(null);

const handle = (e) => {
  const newFiles = Array.from(e.target.files);
  const imageFiles = newFiles.filter(file => file.type.startsWith('image/'));
  if (imageFiles.length < newFiles.length) {
    setError('Only image files are allowed.');
  } else {
    setError(null);
  }

  setFiles((prevFiles) => {
    const updatedFiles = [...prevFiles];
    imageFiles.forEach((newFile) => {
      if (!prevFiles.some((file) => file.name === newFile.name && file.size === newFile.size && file.lastModified === newFile.lastModified)) {
        updatedFiles.push(newFile);
      }
    });
    return updatedFiles;
  });
};
console.log('text',files)
const [text, setText] = useState('');  
const handleButtonClick = () => {
  document.getElementById('file-input').click();
};

  const handleRemove = (index) => {
  setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
};
const textareaRef = useRef(null);
const resizeTextarea = () => {
  const textarea = textareaRef.current;
  textarea.style.height = 'auto';
  textarea.style.height = `${textarea.scrollHeight}px`; // Auto-grow the height
};

useEffect(() => {
  resizeTextarea();
}, [text]);

  // Event handler for textarea input changes
  const handleInputChange = (event) => {
    setText(event.target.value);
  
    // setMessage(event.target.value)
  };

  function handleEnterPress(event){
    if (event.key === 'Enter') {
      resizeTextarea();

    }
 }
  return (
    <> 
     <div>
          <p style={{color:"#4caf50",fontSize:"22px",textAlign:"end",paddingRight:"36px",marginTop:"2px",cursor:"pointer"}} onClick={()=>{handleSound();handleSubmit();}}><button className='postbtn'>Post</button></p>
          <audio ref={clickSoundRef}>
        <source src={clickSound} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      </div>
    
      <div className='newpoststyle'>
  <div>
  <button onClick={handleButtonClick} className='uploadbtn'>Upload</button>
  <input type="file" id="file-input" name="files" multiple accept="image/*" onChange={(e) => handle(e)}   style={{ display: 'none' }}/>
  {error && <p style={{ color: 'red' }}>{error}</p>}
  <div>
  <textarea  type='text' placeholder='type.......'  className='inpttextarea'    value={text}
        onChange={handleInputChange}
        style={{ height: '50px',maxHeight:"300px" }}
        // onKeyUp={handleEnterPress}
        onKeyPress={handleEnterPress}
        ref={textareaRef}
        rows="1"
        />
  <div className="image-preview" style={{ display: 'flex', flexWrap: 'wrap' }}>
   
    {files.map((file, index) => (
      <div key={index} style={{ position: 'relative', margin: '10px' ,marginLeft:"34px"}}>
        <img
          src={URL.createObjectURL(file)}
          alt={`preview-${index}`}
          style={{ width: '94%', objectFit: 'cover' }}
        />
        <button
          onClick={() => handleRemove(index)}
          style={{
            position: 'absolute',
            top: '-3px',
            right: '17px',
            background: 'red',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '25px',
            height: '25px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0',
            lineHeight: '1',
            fontSize:"large"
          }}
        >
          &times;
        </button>
      </div>
    ))}
  </div>

  <div style={{ marginTop:"0px",display:"flex",flexDirection:"row" }}>
  <p style={{ color:"black" }}>jghjthyh</p>
  <p style={{ color:"black" }}>jghjthyh</p>
  <p style={{ color:"black" }}>jghjthyh</p>
  </div>

  </div>
  </div>
</div>
    </>
  )
}
