import React,{useState} from 'react'
import "./Password.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faE } from '@fortawesome/free-solid-svg-icons';
export default function Password() {
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
      setShowPassword(!showPassword);
    };
  const[password,setpassword]=useState("")
  const handlePassword=(e)=>{
    setpassword(e.target.value)
  }
  return (
    <div className="form__group">
      <i
        className={`eye-icon ${showPassword ?  'fa fa-eye':'fa fa-eye-slash'}`}
        onClick={handleTogglePassword}
      
      ></i>
      <input
        className="pass_field"
        placeholder="Password"
        name="name"
        id="name"
        value={password}
        onChange={(e) => handlePassword(e)}
        type={showPassword ? 'text' : 'password'}
      />
      <label htmlFor="name" className="form__label">
        Password
      </label>
    </div>
  )
}
