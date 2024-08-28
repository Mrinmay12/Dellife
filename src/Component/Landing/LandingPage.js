import React from 'react'
import './Landing.css'
import Logo from "./logo.png"
export default function LandingPage() {
  return (
    <div className='landingepage'>
    <img src={Logo} className='landinglogoimg'/>
        <h2 className='landingtext'>DELLIFE</h2>
    </div>
  )
}