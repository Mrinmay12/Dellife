import React, { useEffect, useState } from 'react'
import { CheckOtp, forgetPassword, resetPassword, userLogin } from '../../AllApi/Integrateapi'
import Button from '../../Component/LodingButton/Button'
import InputField from '../../Component/RegisterInput/InputField'
import Password from '../../Component/RegisterInput/PasswordInput/Password'
import "./Login.css"
import { useNavigate } from 'react-router-dom'
import { OTPInput } from '../../Component/OTPInput/InputOtp'
export default function ForgetPassword({ setToken }) {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [otpview, setOtpview] = useState(false)
   const[otp,setOtp]=useState("")
   const[err,setErr]=useState("")
    const handlepassword = (e) => {
        setPassword(e)
    }
    const handleemail = (e) => {
        setEmail(e)
    }

    const handleOtpChange=(e)=>{
        setOtp(e)
    }

    const [loader, setLoder] = useState(false)
    const json = JSON.stringify({
        email,
    })
    const handleSubmit = async (e) => {
        // setLoder(true)
     
        try {
            if(email.trim().length===0){
                setErr(true)
            }else{
                let response = await forgetPassword(json)
                if (response) {
                    setOtpview(true)
                }
            }
            
        } catch (err) {

        }
    }
   

    const[nextpassword,setNextPassword]=useState(false)
const handleResetPassword=()=>{
    setNextPassword(true)
}

 const handleSubmit2=async(e)=>{
      setLoder(true)

      const json2=JSON.stringify({
        email, otp, newPassword:password
      })
      try {
        let response = await resetPassword(json2)
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

    const [otpErr, setOtpErr] = useState('');

    useEffect(() => {
    //   const json2 = JSON.stringify({ email, otp });
  
      const checkOtpData = async () => {
        try {
          let res = await CheckOtp(email,otp);
          setOtpErr(res.data.status);
      
        } catch (err) {
 
          setOtpErr(true);
        }
      };
  

      let timeoutId;
  
   
      timeoutId = setTimeout(() => {
        if(email &&otp ){
        checkOtpData();
        }
      }, 1000); 
      return () => clearTimeout(timeoutId);
  
    }, [email, otp]);
    console.log(otpErr);
    
    return (
        <div>
            {!nextpassword &&
            
            (

                <>
                   {!otpview ? (
                <div className="containerlogin">

                    <div className='submitbtn'>
                        <img src="https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?size=338&ext=jpg&ga=GA1.1.1700460183.1713052800&semt=sph" alt='logo' style={{ width: "100px" }} />
                        <h2>Forgot password</h2>
                    </div>
                    <div style={{marginBottom:"5px" }}>
                    <InputField name={"Email"} id={"email"} onChange={handleemail} />
                    </div>
                    {err &&(
                        <>
                        {email.trim().length===0&&(
                    <span style={{ color:"red" }}>This field is required</span>

                        )}
                        </>

                    )}
                    {/* <Password onChange={handlepassword} /> */}
                    <div className='submitbtn'>
                    <button style={{
                            backgroundColor: '#4CAF50',
                            paddingTop: "10px",
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
                            boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)'
                        }} onClick={() => handleSubmit()}>{"Reset"}</button>
                      
                        <div style={{ display:"flex",justifyContent:"space-around"}}>
                        <p style={{ paddingTop: "10px", fontSize: "15px", cursor: "pointer",color:"blueviolet" }} onClick={handleSubmit}>Resend email</p>
                        <p style={{ paddingTop: "10px", fontSize: "15px", cursor: "pointer" }} onClick={() => navigate("/")}>Back to login</p>
                        </div>
                    </div>

                </div>
            ) : (
                <div className="containerlogin">

                    <div className='submitbtn'>
                        <img src="https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?size=338&ext=jpg&ga=GA1.1.1700460183.1713052800&semt=sph" alt='logo' style={{ width: "100px" }} />
                        <h2>OTP</h2>
                    </div>
                    <div style={{ marginLeft:"24px",marginTop:"6px" }}>
                    <OTPInput length={6} onChange={handleOtpChange} />
                    {otpErr &&(
                        <span style={{ color:"red",marginTop:"3px" }}>Invalid OTP Code</span>
                    )}
                    
                    </div>
                    {/* <Password onChange={handlepassword} /> */}
                    <div className='submitbtn'>
                    <button style={{
                            backgroundColor: '#4CAF50',
                            paddingTop: "10px",
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
                            boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)'
                        }} onClick={() => navigate("/")}>Back to login</button>
                        {otpErr===false &&(
                            <button style={{
                            backgroundColor: '#4CAF50',
                            paddingTop: "10px",
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
                            boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)'
                        }} onClick={() => handleResetPassword()}>{"Next >>>"}</button>
                        )}
                        
                    </div>

                </div>
            )}
                </>
            )}
         

{nextpassword &&(
    <div className="containerlogin">

    <div className='submitbtn'>
        <img src="https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?size=338&ext=jpg&ga=GA1.1.1700460183.1713052800&semt=sph" alt='logo' style={{ width: "100px" }} />
        <h2>New password</h2>
    </div>
    <div style={{ marginLeft:"24px",marginTop:"6px" }}>
    </div>
    <Password onChange={handlepassword} />
    <div className='submitbtn'>
    <button style={{
            backgroundColor: '#4CAF50',
            paddingTop: "10px",
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
            boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)'
        }} onClick={() => handleSubmit2()}>Login</button>
       
    </div>

</div>
)}
        </div>
    )
}
