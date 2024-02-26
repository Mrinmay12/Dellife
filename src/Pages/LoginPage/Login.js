import React,{useState} from 'react'
import { userLogin } from '../../AllApi/Integrateapi'
import Button from '../../Component/LodingButton/Button'
import InputField from '../../Component/RegisterInput/InputField'
import Password from '../../Component/RegisterInput/PasswordInput/Password'
import "./Login.css"
export default function Login({setToken}) {
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
    const handleSubmit=async(e)=>{
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
  return (
    <div>
        <div className="containerlogin">
        <div className='submitbtn'> 
        <h2>Login</h2>
        </div>
    <InputField name={"Email"} id={"email"} onChange={handleemail}/>
    <Password onChange={handlepassword}/>
    <div className='submitbtn'>
    <Button handleClickbtn={handleSubmit} loader={loader} name="Login"/>
    </div>
    </div>
    </div>
  )
}
