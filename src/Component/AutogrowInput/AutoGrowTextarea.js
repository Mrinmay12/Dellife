import React, { useState, useRef, useEffect } from 'react';
import "./AutoGrow.css"
// import '@fortawesome/fontawesome-free/css/all.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane} from '@fortawesome/free-solid-svg-icons';
// import { sendMessage ,UpdateLastMessage} from '../../APIintegrate/AllApi';
import { useParams,useSearchParams  } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { sendMessage } from '../../AllApi/Integrateapi';
import { encryptText } from '../../Utiles';

const AutoGrowTextarea = ({setMessage,id,setmessagedata,messagedata,setMessagestatus,messageref,Onsubmit}) => {
  const userId=useSelector(state=>state.myReducer.data)
  const [searchParams, setSearchParams] = useSearchParams();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);



 
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
    setMessage(event.target.value)
    // setMessage(event.target.value)
  };

  // UseEffect to resize the textarea whenever the text changes
  // useEffect(() => {
  //   resizeTextarea();
  // }, [text]);
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
// const correctSecretCode = "MessageApp123";
// const base64 = encryptText(text,correctSecretCode)
// useEffect(()=>{
//   setmessagedata([...messagedata,{  messageId:id,
//       sender:userId.message_id,
//       messagetext:base64}])
// },[messageref])

const [disable,setDisable]=useState(false)
  const handlesend=async()=>{
    Onsubmit()
    setText("")
    const textarea = textareaRef.current;
    textarea.style.height = 'auto';
    textarea.style.height = `50px`;
  //  socket.current.emit("sendMessage", {
  //   senderId: userId,
  //   receiverId:connect_userId,
  //   text: text, 
  // });

  }

  console.log("mmmmdjdjdjdjdjd",text);

  function handleEnterPress(event){
    if (event.key === 'Enter') {
      if (event.shiftKey) {
        resizeTextarea();
      } else {
        handlesend()
        event.preventDefault();
      }
    }

 }

 const handleKeyDown = (event) => {
  if (event.key === 'Enter') {
    if (event.shiftKey) {
      // // Insert a newline at the current cursor position
      // const cursorPosition = event.target.selectionStart;
      // const newValue = 
      //   text.slice(0, cursorPosition) + 
      //   '\n' + 
      //   text.slice(cursorPosition);
        resizeTextarea();
      // setText(newValue);

      // setTimeout(() => {
      //   event.target.selectionStart = cursorPosition + 1;
      //   event.target.selectionEnd = cursorPosition + 1;
      // }, 0);
    } else {
      event.preventDefault();
      setText(''); // Clear the input value
      handlesend()
    }
  }
};
  // console.log(connect_userId,"connect_userId");
  return (
    <div className="textarea-container">
    <div className="textarea-wrapper">
      <textarea
        ref={textareaRef}
        rows="1"
        placeholder="Message"
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
