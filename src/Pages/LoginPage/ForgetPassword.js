import React, { useState } from 'react'
import { forgetPassword, userLogin } from '../../AllApi/Integrateapi'
import Button from '../../Component/LodingButton/Button'
import InputField from '../../Component/RegisterInput/InputField'
import Password from '../../Component/RegisterInput/PasswordInput/Password'
import "./Login.css"
import { useNavigate } from 'react-router-dom'
export default function ForgetPassword({ setToken }) {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [otpview, setOtpview] = useState(false)

    const handlepassword = (e) => {
        setPassword(e)
    }
    const handleemail = (e) => {
        setEmail(e)
    }

    const [loader, setLoder] = useState(false)
    const json = JSON.stringify({
        email,
    })
    const handleSubmit = async (e) => {
        setLoder(true)
        try {
            let response = await forgetPassword(json)
            if (response) {
                setOtpview(true)
            }
        } catch (err) {

        }
    }
    // const handleSubmit=async(e)=>{
    //   setLoder(true)
    //   try {
    //     let response = await forgetPassword(json)
    //       if(response){
    //         setLoder(false)
    //        const token = response.data.token;
    //        setToken(token)
    //        // dispatch(setData(response.data.user_id))
    //       //  localStorage.setItem("user_id",response.data.user_id)
    //        localStorage.setItem('token', token);
    //       //  setLogin_true(true)
    //       //  setIsLoggedIn(true)
    //       }
    //     }catch(err){
    //       setLoder(false)

    //     }
    // }

    return (
        <div>
            {!otpview ? (
                <div className="containerlogin">

                    <div className='submitbtn'>
                        <img src="https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?size=338&ext=jpg&ga=GA1.1.1700460183.1713052800&semt=sph" alt='logo' style={{ width: "100px" }} />
                        <h2>Forgot password</h2>
                    </div>
                    <InputField name={"Email"} id={"email"} onChange={handleemail} />
                    {/* <Password onChange={handlepassword} /> */}
                    <div className='submitbtn'>
                        <Button handleClickbtn={handleSubmit} loader={loader} name="Reset" />
                        <p style={{ paddingTop: "10px", fontSize: "15px", cursor: "pointer" }} onClick={handleSubmit}>resend email</p>
                        <p style={{ paddingTop: "10px", fontSize: "15px", cursor: "pointer" }} onClick={() => navigate("/")}>back to login</p>
                    
                    </div>

                </div>
            ) : (
                <div className="containerlogin">

                    <div className='submitbtn'>
                        <img src="https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?size=338&ext=jpg&ga=GA1.1.1700460183.1713052800&semt=sph" alt='logo' style={{ width: "100px" }} />
                        <h2>Login</h2>
                    </div>
                    <InputField name={"Email"} id={"email"} onChange={handleemail} />
                    <Password onChange={handlepassword} />
                    <div className='submitbtn'>
                        <Button handleClickbtn={handleSubmit} loader={loader} name="Login" />
                        <p style={{ paddingTop: "10px", fontSize: "15px", cursor: "pointer" }}>Forgot password?</p>
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
                        }} onClick={() => navigate("/")}>back to login</button>
                    </div>

                </div>
            )}

        </div>
    )
}
