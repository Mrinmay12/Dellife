import React,{useState,useEffect} from 'react'
import InputField from '../../Component/RegisterInput/InputField'
import Password from '../../Component/RegisterInput/PasswordInput/Password'
import Button from "../../Component/LodingButton/Button"
import { userRegister } from '../../AllApi/Integrateapi'
import { useNavigate } from 'react-router-dom'
export default function Register({setToken}) {
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
    })
    const handleSubmit=async(e)=>{
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
     console.log('====================================');
     console.log(err);
     console.log('====================================');
     
        }
    }
    console.log(loader,"loaderloader");  
  return (
    <div>
        <div className="containerlogin">
        <div className='submitbtn'> 
        <h2>Register</h2>
        </div>
    <InputField name={"Full name"} onChange={handlename} id={"name"}/>
    <InputField name={"Email"} onChange={handleemail} id={"email"}/>
    <InputField name={"age"} onChange={handleage} id={"age"}/>
    <Password onChange={handlepassword}/>
    <div className='submitbtn'>
    <Button handleClickbtn={handleSubmit} loader={loader} name="Register"/>
    </div>
    </div>
    </div>
  )
}
