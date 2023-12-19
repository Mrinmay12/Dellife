import React, { useState, useRef, useEffect } from 'react';
import "./AutoGrow.css"
// import '@fortawesome/fontawesome-free/css/all.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane} from '@fortawesome/free-solid-svg-icons';
// import { sendMessage ,UpdateLastMessage} from '../../APIintegrate/AllApi';
import { useParams,useSearchParams  } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const AutoGrowTextarea = ({setMessage,id,setmessagedata,messagedata,setMessagestatus,socket}) => {
  const userId=useSelector(state=>state.myReducer.data)
  const [searchParams, setSearchParams] = useSearchParams();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);


  const[messageref,setMessageref]=useState("")
 
  const userid = searchParams.get('userid');
  const textareaRef = useRef(null);
  const [text, setText] = useState('');   
  let connect_userId=window.atob(userid)
  const resizeTextarea = () => {
    const textarea = textareaRef.current;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`; // Auto-grow the height
  };

  // Event handler for textarea input changes
  const handleInputChange = (event) => {
    setText(event.target.value);
    // setMessage(event.target.value)
  };

  // UseEffect to resize the textarea whenever the text changes
  useEffect(() => {
    resizeTextarea();
  }, [text]);
// const UpdateLastUpdateMessage=async()=>{
//   try{
//     let res=await UpdateLastMessage(id).then((res)=>{
//       console.log(res);
//     }).finally(()=>{
//     })
//   }catch(err){
//     console.log(err);
//   }
// }
const correctSecretCode = "MessageApp123";
function encryptText(inputText, secretCode) {
  let encryptedText = '';
  for (let i = 0; i < inputText.length; i++) {
    const char = inputText[i];
    const charCode = char.charCodeAt(0);
    const secretCharCode = secretCode.charCodeAt(i % secretCode.length); // Repeating the secret code
    const encryptedCharCode = charCode + secretCharCode;
    encryptedText += String.fromCodePoint(encryptedCharCode);
  }
  return encryptedText;
}

const base64 = encryptText(text,correctSecretCode)
const json =JSON.stringify({
  messageId:id,
    sender:userId,
    messagetext:base64
})

// useEffect(()=>{
//   setmessagedata([...messagedata,{  messageId:id,
//       sender:userId,
//       messagetext:base64}])
// },[messageref])
console.log(messagedata,"my new and old message data");
const [disable,setDisable]=useState(false)
  const handlesend=async()=>{
    try{
      if(text.trim()!==""){
        setMessageref(new Date().getMilliseconds())
        setDisable(true)
        socket.current.emit("send-msg", {
          to: connect_userId,
          from: userId, 
          messagetext:base64,
          messageid:id
        });
        
    //   let response= await sendMessage(json).then((response)=>{
    //     if(response.status===201){
    //       setMessagestatus(new Date().getMilliseconds())
    //       setText("")
    //       UpdateLastUpdateMessage()
    //     }
    //   }).finally(()=>{
    //     setDisable(false)
    //   })  
      
      }
     
    }catch(err){
      console.log(err)
    }
   
  //  socket.current.emit("sendMessage", {
  //   senderId: userId,
  //   receiverId:connect_userId,
  //   text: text,
  // });

  }

  function handleEnterPress(event){
    if(event.key=== 'Enter'){
      handlesend()
         }
 }
  console.log(connect_userId,"connect_userId");
  return (
    <div className="textarea-container">
    <div className="textarea-wrapper">
      <textarea
        ref={textareaRef}
        rows="1"
        placeholder="Type your comment here..."
        value={text}
        onChange={handleInputChange}
        style={{ height: '50px' }}
        // onKeyUp={handleEnterPress}
        onKeyPress={handleEnterPress}
      ></textarea>
    </div>
    {text.trim().length!==0?(
      <>
      <div className="autoicon-container">
    {disable?(
      <FontAwesomeIcon
        icon={faPaperPlane}
        style={{ color: 'gray', height: '19px', width: '24px', cursor: 'pointer' }}

      />
    ):(
      <FontAwesomeIcon
        icon={faPaperPlane}
        style={{ color: 'white', height: '19px', width: '24px', cursor: 'pointer' }}
        onClick={handlesend}
      />
    )} 
      
    </div>
      </>
    ):(
      <>
      <div className="autoicon-container2">
      <FontAwesomeIcon
        icon={faPaperPlane}
        style={{ color: 'gray', height: '19px', width: '24px', cursor: 'pointer' }}

      />
      </div> 
      </>
    )}
  
  </div>
  );
};

export default AutoGrowTextarea;
