import React from 'react'
import InputField from '../../Component/RegisterInput/InputField'
import Password from '../../Component/RegisterInput/PasswordInput/Password'
import "./Login.css"
export default function Login() {
  return (
    <div>
        <div className="containerlogin">
        <h2>Login</h2>
    <InputField name={"Full name"}/>
    <InputField name={"Age"}/>
    <InputField name={"Full name"}/>
    <Password/>
    </div>
    </div>
  )
}
