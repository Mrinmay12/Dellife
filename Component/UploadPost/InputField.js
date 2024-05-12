import React, { useState } from 'react'
import "./Input.css"
export default function InputField({ value, handleChnage }) {
    const OnChnage = (e) => {
        handleChnage(e.target.value)
    }
    return (
        <div>
            <input value={value} className="input" type="text" onChange={OnChnage} placeholder="Search image by url"/>
        </div>
    )
}
