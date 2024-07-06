import React, { useState, useRef, useEffect } from 'react'
import "./Post.css"
import clickSound from "./Image/click.mp3"
import imagecard from "./Image/imagecard.png";
import Tagicon from "./Image/tag.png";
import Linkicon from "./Image/link.png"
import {
  useNavigate,
} from "react-router-dom"; 
import { useSelector } from 'react-redux';
import Texteditor from './TextEditor/Texteditor';
import { userNewPost } from '../../AllApi/Integrateapi';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from '../../FirebaseConfig/Firebase';
import InputField from '../RegisterInput/InputField';
import SelectDropdown from '../../Select_dropdown/SelectDropdown';
import Input from '../PostForm/Input';
import { isValidLink } from '../../Utiles';
export default function Post() {
  const userlogin = useSelector(state => state.myReducer.data)
  const userlocation = useSelector(state => state.UserLocation.data)
  const navigate=useNavigate();
  // const data = useSelector(state => state.myReducer.data);
  const [fimage, setFImage] = useState(null);
  const [simage, setSImage] = useState(null);
  const [fimageUrl, setFimageUrl] = useState("");
  const [imgnotexist, setImgnotExist] = useState(false)
  const [simageUrl, setSimageUrl] = useState("");
  const [link,setLink]=useState("")
  const [imgnotexist2, setImgnotExist2] = useState(false)
  const[description,setdescription]=useState("")
  const[tagshow,settagshow]=useState(false)
  const[linkshow,setlinkshow]=useState(false)
  const fimageRef = useRef();
  const simageRef = useRef();
  const clickSoundRef = useRef(null);
  let valid_link=isValidLink(link)
  console.log('====================================');
  console.log(valid_link,"valid_link");
  console.log('====================================');
  const [tagoption,setTagoption]=useState("")
const handleOption=(e)=>{
  setTagoption(e)
}

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


  const[textcolor,settextcolor]=useState("black")
  const [files, setFiles] = useState([]);
  const [text, setText] = useState(''); 
const handleSound=()=>{
  clickSoundRef.current.play();
}
// const handleSubmit = async (e) => {
//   const formData = new FormData();
//    Array.from(files).forEach((file, i) => {
//         formData.append('images', file);
//       });
//   formData.append('user_id', userlogin.user_id);
//   formData.append('post_title',text );
//   formData.append('color_code', textcolor);
//   formData.append('latitude', userlocation.latitude||0.00);
//   formData.append('longitude', userlocation.longitude||0.00);
  
//   if(text===""){
//     navigate("/")
    
//   }else{
  
//     try {
//       await userNewPost(formData)
      
//       navigate("/");
//       setFImage(null);
  
//     } catch (error) {
//       console.error(error);
//       alert('Error uploading images. Please try again later.');
//     }
//   }
//   }
  
const handleUpload = () => {
  if (files.length > 0) {
    const uploadPromises = files.map((file) => {
      const fileName = Date.now() + '-' + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      
      return new Promise((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            // Optionally handle the progress of the upload
          },
          (error) => {
            console.log(error);
            reject(error);
          },
          async () => {
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              resolve(fileName);
            } catch (error) {
              reject(error);
            }
          }
        );
      });
    });

    return Promise.all(uploadPromises);
  } else {
    console.log('No files selected!');
    return Promise.resolve([]);
  }
};

const handleSubmit = async (e) => {
  
  try {
    const uploadedFileNames = await handleUpload();

    let formData=JSON.stringify({
      image_files:uploadedFileNames,
      user_id:userlogin.user_id,
      post_title:text,
      color_code:textcolor,
      tag:tagoption,
      link:link,
      latitude: userlocation.latitude || 0.00,
      longitude:userlocation.longitude || 0.00

    })

    if (text === '') {
      navigate("/");
    } else {
      try {
        await userNewPost(formData);
        navigate("/");
        setFImage(null);
      } catch (error) {
        console.error(error);
        alert('Error uploading images. Please try again later.');
      }
    }
  } catch (error) {
    console.error('Error uploading files:', error);
    alert('Error uploading images. Please try again later.');
  }
};



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
// console.log('text',files)
 
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


 const handleColor=(e)=>{
  settextcolor(e)
 }

 const options = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange' },
  { value: 'grape', label: 'Grape' },
  // Add more options as needed
];

const handleTagshow=()=>{
  settagshow(!tagshow)
}
const handleLinkshow=()=>{
setlinkshow(!linkshow)
}
  return (
    <> 
     
    
      <div className='newpoststyle'>
  <div className='subpoststyle'>
  <div style={{display:"flex",flexDirection:"row"}}>
  <div style={{width:"60%",display:"flex"}}>
      <div className='colorchange3' value={textcolor} onClick={()=>handleColor("black")}></div>
      <div className='colorchange' value={textcolor} onClick={()=>handleColor("red")}></div>
      </div>
      <div style={{width:"40%",textAlign:"end"}}>
  <button onClick={()=>{handleSound();handleSubmit();}} className='uploadbtn'>Post</button>
  <audio ref={clickSoundRef}>
        <source src={clickSound} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
  </div>
      </div>
  {/* <div style={{textAlign:"end"}}>
  <button onClick={()=>{handleSound();handleSubmit();}} className='uploadbtn'>Upload</button>
  <audio ref={clickSoundRef}>
        <source src={clickSound} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
  </div> */}
  
  
  <textarea  type='text' placeholder='type.......'  className='inpttextarea'   value={text}
        onChange={handleInputChange}
        style={{ height: '50px',maxHeight:"300px",color:textcolor }}
        // onKeyUp={handleEnterPress}
        onKeyPress={handleEnterPress}
        ref={textareaRef}
        rows="1"
        />
        <div>
  <div className="image-preview" style={{ display: 'flex', flexWrap: 'wrap' }}>
   
    {files.map((file, index) => (
        <div key={index} style={{ position: 'relative', margin: '10px', marginLeft:"34px",textAlign: 'center' }}>
        <img
          src={URL.createObjectURL(file)}
          alt={`preview-${index}`}
          style={{ width: '94%', objectFit: 'cover' }}
        />
         <button
              onClick={() => handleRemove(index)}
              style={{
                position: 'absolute',
                top: '2px',
                // right: '17px',
                left:"17px",
                background: 'red',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '25px',
                height: '25px',
                textAlign: 'center',
                lineHeight: '25px',
                cursor: 'pointer',
              }}
            >
              X
            </button>
        {/* <button
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
        </button> */}
      </div>
    ))}
  </div>
  </div>
  <hr/>
 {linkshow && (
  <>
  <Input placeholder="link" onchange={setLink} value={link} inputtype="url"/>
  {!valid_link && link!==""?<span style={{marginTop:"5px",color:"red"}}>Link not valid</span>:""}
  </>
  )} 
 {tagshow &&(<SelectDropdown options={options} handleOption={handleOption}/>)} 
  <div style={{ marginTop:"0px",display:"flex",flexDirection:"row" }}>
  <p style={{ color:"black" }}><img src={imagecard} style={{ width:"60px" }} title="Upload images" onClick={handleButtonClick}/></p>
  <input type="file" id="file-input" name="files" multiple accept="image/*" onChange={(e) => handle(e)}   style={{ display: 'none' }}/>
  {error && <p style={{ color: 'red' }}>{error}</p>}
  <p style={{ color:"black" }} value={tagshow} onClick={handleTagshow}><img src={Tagicon} style={{ width:"60px" }} title="Tag people" /></p>
  <p style={{ color:"black" }} value={linkshow} onClick={handleLinkshow}><img src={Linkicon} title="Add link" style={{ width:"60px" }}/></p>
  

  </div>
  </div>
</div>
    </>
  )
}
