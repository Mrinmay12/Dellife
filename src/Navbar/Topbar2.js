import React from 'react'
import Button from '../Component/Button/Button'
import { useNavigate } from 'react-router-dom'
export default function Topbar2() {
    const navigate=useNavigate()
    const handleLogin=()=>{
        navigate("/")
    }
    const handleLogin2=()=>{
        navigate("/register")
    }
  return (
    <main>
      <header
        className={ "clearfix"}
      >
    <div className="home">
            <a  className="logo">
              DelLife
            </a>
            </div>
            <div className='with_out_log_botton'>
                <Button value="Login" handleClick={handleLogin} backcolor="green"/>
                <div style={{marginLeft:"8px"}}></div>
                <Button value="Register" handleClick={handleLogin2} backcolor="#0050ff"/>
                <div style={{marginRight:"10px"}}></div>
            </div>
            </header>
            </main>
  )
}
