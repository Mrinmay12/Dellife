import React,{useState} from 'react'
import { userLogin } from '../../AllApi/Integrateapi'
import Button from '../../Component/LodingButton/Button'
import InputField from '../../Component/RegisterInput/InputField'
import Password from '../../Component/RegisterInput/PasswordInput/Password'
import "./Login.css"
import { useNavigate } from 'react-router-dom'
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
        <img src="https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?size=338&ext=jpg&ga=GA1.1.1700460183.1713052800&semt=sph" alt='logo' style={{width:"100px"}}/>
        <h2>Login</h2>
        </div>
    <InputField name={"Email"} id={"email"} onChange={handleemail}/>
    <Password onChange={handlepassword}/>
    <div className='submitbtn'>
    <Button handleClickbtn={handleSubmit} loader={loader} name="Login" />
    <p style={{paddingTop:"10px",fontSize:"15px",cursor:"pointer"}}>Forgot password?</p>
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
