import React,{useEffect, useState} from 'react'
import { userLogin } from '../../AllApi/Integrateapi'
import Button from '../../Component/LodingButton/Button'
import InputField from '../../Component/RegisterInput/InputField'
import Password from '../../Component/RegisterInput/PasswordInput/Password'
import "./Login.css"
import { useNavigate } from 'react-router-dom'
import { validateEmail } from '../../Utiles'
import InformationIcon from "./Information.png"
export default function Login({setToken}) {
  const navigate=useNavigate()
  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")
  const handlepassword=(e)=>{
    setPassword(e)
  }
  const handleemail=(e)=>{
    setEmail(e)
  }

  const[loader,setLoder]=useState(false)
    const json=JSON.stringify({
      email, 
      password,
    })
    const[validation,setValidation]=useState(false)
    const[valid_message,setValid_Message]=useState('')
    const[valid_message1,setValid_Message1]=useState('')
    // console.log(email , validateEmail(email),"jgjgjhjghj");
    
    const handleSubmit=async(e)=>{
      if(!email){
        setValidation(true)
        setValid_Message1('This field is required')
      }if(email){
      if(!validateEmail(email)){
        setValidation(true)
        setValid_Message1('Email format not valid')
      }} if(!password){
        setValidation(true)
        setValid_Message('This field is required')
      } if(email && validateEmail(email) && password){
        setValidation(false)
      setLoder(true)
      try {
        let response = await userLogin(json)
          if(response){
            setLoder(false)
           const token = response.data.token;
           setToken(token)
           // dispatch(setData(response.data.user_id))
          //  localStorage.setItem("user_id",response.data.user_id)
           localStorage.setItem('token', token);
          //  setLogin_true(true)
          //  setIsLoggedIn(true)
          }
        }catch(err){
          setLoder(false)
     
        }
      }
    }
   
    useEffect(()=>{
      if(validation){
      if(!email){
        setValidation(true)
        setValid_Message1('This field is required')
      }if(email){
        if(!validateEmail(email)){
          setValidation(true)
          setValid_Message1('Email format not valid')
        }}if(!password){
          setValidation(true)
          setValid_Message('This field is required')
        }
      }
    },[validation,email,password])
  return (
    <div>
        <div className="containerlogin">
    
        <div className='submitbtn'> 
        <img src="https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?size=338&ext=jpg&ga=GA1.1.1700460183.1713052800&semt=sph" alt='logo' style={{width:"100px"}}/>
        <h2>Login</h2>
        </div>
    <InputField name={"Email"} id={"email"} onChange={handleemail}/>
    {validation && <>
    {!email || !validateEmail(email) ?(
      <>
       <img src={InformationIcon} alt='' style={{ width:"16px",marginTop:"3px",marginRight:"3px" }}/>
       <span style={{ color:"red",marginTop:"3px" }}>{valid_message1}</span>
      </>
    ):null}
   
    </>}
    <Password onChange={handlepassword}/>
    {validation && <>
    {!password &&(
      <>
       <img src={InformationIcon} alt='' style={{ width:"16px",marginTop:"3px",marginRight:"3px" }}/>
       <span style={{ color:"red",marginTop:"3px" }}>{valid_message}</span>
      </>
    )}
   
    </>}
    <div className='submitbtn'>
    <Button handleClickbtn={handleSubmit} loader={loader} name="Login" />
    <p style={{paddingTop:"10px",fontSize:"15px",cursor:"pointer"}} onClick={()=>navigate("/resetpassword")}>Forgot password?</p>
    <button style={{ backgroundColor: '#4CAF50', 
    paddingTop:"10px",
    // marginTop:"10px",
    border: 'none',
    color: 'white',
    padding: '15px 32px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    margin: '10px 2px',
    transitionDuration: '0.4s',
    cursor: 'pointer',
    borderRadius: '8px',
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)'}} onClick={()=>navigate("/register")}>Create new account</button>
    </div>
  
    </div>
    </div>
  )
}
