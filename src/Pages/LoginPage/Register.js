import React,{useState,useEffect} from 'react'
import InputField from '../../Component/RegisterInput/InputField'
import Password from '../../Component/RegisterInput/PasswordInput/Password'
import Button from "../../Component/LodingButton/Button"
import { userRegister } from '../../AllApi/Integrateapi'
import { useNavigate } from 'react-router-dom'
import DateDropdown from '../../Component/Dobdropdown/DateDropdown'
import { validateEmail } from '../../Utiles'
import { useSelector } from 'react-redux'
import InformationIcon from "./Information.png"
export default function Register({setToken}) {
  const userlocation = useSelector(state => state.UserLocation.data)
  const navigate=useNavigate()
  const[name,setName]=useState("")
  const[email,setEmail]=useState("")
  const[age,setAge]=useState("")
  const[password,setPassword]=useState("")
  const handlename=(e)=>{
    setName(e)
  }
  const handleemail=(e)=>{
    setEmail(e)
  }
  const handleage=(e)=>{
    setAge(e)
  }
  const handlepassword=(e)=>{
    setPassword(e)
  }
  console.log(name,
    email,
    age,
    password);
    const[loader,setLoder]=useState(false)
    const json=JSON.stringify({
      email, 
      password,
       age,
       name ,
       location_user: userlocation.locationName
    })
    const[validation,setValidation]=useState(false)
    const[valid_message,setValid_Message]=useState('')
    const handleSubmit=async(e)=>{
      if(!email){
        setValidation(true)
        setValid_Message('This field is required')
      }if(email){
      if(!validateEmail(email)){
        setValidation(true)
        setValid_Message('Email format not valid')
      }} if(!password){
        setValidation(true)
        setValid_Message('This field is required')
      } if(email && validateEmail(email) && password){
      setLoder(true)
      try {
        let response = await userRegister(json)
          if(response){
            setLoder(false)
           const token = response.data.token;
           setToken(token)
           navigate("/")
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
        setValid_Message('This field is required')
      }if(email){
        if(!validateEmail(email)){
          setValidation(true)
          setValid_Message('Email format not valid')
        }}if(!password){
          setValidation(true)
          setValid_Message('This field is required')
        }
      }
    },[validation,email,password])


    const[inputValue,setInputValue]=useState('')

  return (
    <div>
        <div className="containerlogin">
        <div className='submitbtn'> 
        <img src="https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?size=338&ext=jpg&ga=GA1.1.1700460183.1713052800&semt=sph" alt='logo' style={{width:"100px"}}/>
        <h2>Register</h2>
        </div>
    <InputField name={"Full name"} onChange={handlename} id={"name"}/>
    <InputField name={"Email"} onChange={handleemail} id={"email"}/>
    {validation && <>
    {!email || !validateEmail(email) ?(
      <>
       <img src={InformationIcon} alt='' style={{ width:"16px",marginTop:"3px",marginRight:"3px" }}/>
       <span style={{ color:"red",marginTop:"3px" }}>{valid_message}</span>
      </>
    ):null}
   
    </>}
    {/* <InputField name={"age"} onChange={handleage} id={"age"}/> */}
   
    <div className="container2" style={{ flexDirection:"row",marginTop:"15px" }}>
    <label className='dob' style={{ marginTop:"4px",marginRight:"28px" }}>Gander</label>
          <div className="radio" onClick={()=>setInputValue('1')}>
            <input id="radio-1" name="radio" type="radio"  value={inputValue}/>
            <label for="radio-1" className="radio-label">Male</label>
          </div>
        
          <div className="radio" onClick={()=>setInputValue('2')}>
            <input id="radio-2" name="radio" type="radio" value={inputValue}/>
            <label  for="radio-2" className="radio-label">Female </label>
          </div>
          </div>
    <DateDropdown/>
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
    <Button handleClickbtn={handleSubmit} loader={loader} name="Register" />
    </div>
    </div>
    </div>
  )
}
