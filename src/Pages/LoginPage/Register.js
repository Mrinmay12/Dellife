import React,{useState,useEffect} from 'react'
import InputField from '../../Component/RegisterInput/InputField'
import Password from '../../Component/RegisterInput/PasswordInput/Password'
import Button from "../../Component/LodingButton/Button"
import { userRegister } from '../../AllApi/Integrateapi'
import { useNavigate } from 'react-router-dom'
import DateDropdown from '../../Component/Dobdropdown/DateDropdown'
import { validateEmail } from '../../Utiles'
import { useSelector } from 'react-redux'
import InformationIcon from "./Information.png"
import Select from 'react-select';
export default function Register({setToken}) {
  const userlocation = useSelector(state => state.UserLocation.data)
  const navigate=useNavigate()
  const[name,setName]=useState("")
  const[email,setEmail]=useState("")
  const[user_age,setUserAge]=useState("")
  const[dob,setDob]=useState('')
  const[password,setPassword]=useState("")
  const[inputValue,setInputValue]=useState('')
  const handlename=(e)=>{
    setName(e)
  }
  const handleemail=(e)=>{
    setEmail(e)
  }
 
  const handlepassword=(e)=>{
    setPassword(e)
  }
  // console.log(name,
  //   email,
  //   user_age,
  //   password,dob,dob.length,"MMMMMMMMMMRRR");
    const[loader,setLoder]=useState(false)
    const json=JSON.stringify({
      email, 
      password,
       age:user_age,
       dob:dob,
       name ,
       location_user: userlocation.locationName
    })
    const[validation,setValidation]=useState(false)
    const[valid_message,setValid_Message]=useState('')
    const[valid_message1,setValid_Message1]=useState('')
    const[valid_message2,setValid_Message2]=useState('')
    const[api_validation,setApi_validation]=useState('')
    const handleSubmit=async(e)=>{
      if(!email){
        setValidation(true)
        setValid_Message1('This field is required')
      }if(email){
      if(!validateEmail(email)){
        setValidation(true)
        setValid_Message1('Email format not valid')
      }} if(!password){
        setValidation(true)
        setValid_Message('This field is required')
      }if(!name){
        setValidation(true)
        setValid_Message('This field is required')
      }if(!inputValue){
        setValidation(true)
        setValid_Message('This field is required')
      }if(dob.length<9){
        setValidation(true)
        setValid_Message2('This field is required')
      }if(dob.length>=9){
        if(user_age<13){
          setValidation(true)
          setValid_Message2('Sorry, but this service is only available to users who are 13 years old or older.')
        }
      }
       if(email && validateEmail(email) && password && name && inputValue  && user_age>13){
      setLoder(true)
      try {
        let response = await userRegister(json)
          if(response){
            setLoder(false)
           const token = response.data.token;
           localStorage.setItem('token', token);
           setToken(token)
           navigate("/")
           // dispatch(setData(response.data.user_id))
          //  localStorage.setItem("user_id",response.data.user_id)
         
          //  setLogin_true(true)
          //  setIsLoggedIn(true)
          }
        }catch(err){
          setLoder(false)
          setApi_validation('Email already exist ')
     
        }
      }
    }
 console.log(dob.length,"dob.length");
 
    useEffect(()=>{
      if(validation){
      if(!email){
        setValidation(true)
        setValid_Message1('This field is required')
      }if(email){
        setApi_validation('')
        if(!validateEmail(email)){
          setValidation(true)
          setValid_Message1('Email format not valid')
        }}if(!password){
          setValidation(true)
          setValid_Message('This field is required')
        }if(!name){
          setValid_Message('This field is required')
        }if(!inputValue){
          setValid_Message('This field is required')
        }if(dob.length<9){
          setValidation(true)
          setValid_Message2('This field is required')
        }
        if(dob.length>=9){
          if(user_age<13){
            setValidation(true)
            setValid_Message2('Sorry, but this service is only available to users who are 13 years old or older.')
          }
        }
      }
    },[validation,email,password,name,inputValue,dob,user_age])
    

    const options = [
      { value: 'doctor', label: 'Doctor' },
      { value: 'teacher', label: 'Teacher' },
      { value: 'orange', label: 'Orange' },
      { value: 'grape', label: 'Grape' },
    ];
    const [selectedOption, setSelectedOption] = useState(null);
    const handleChange = (selectedOption) => {
      setSelectedOption(selectedOption);
   
    };
    const customStyles = {
      menu: (provided, state) => ({
        ...provided,
        marginBottom: 'auto', // This is important to prevent the dropdown from pushing the input field up
        marginTop: '0',  
             // Ensures no additional margin at the top
             width: 350,
  
      }),
      control: (provided) => ({
        ...provided,
        width: 350, // Set the width here
      }),
    
      menuPortal: base => ({ ...base, zIndex: 9999 })
    };
    
  return (
    <div>
        <div className="containerlogin">
        <div className='submitbtn'> 
        <img src="https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?size=338&ext=jpg&ga=GA1.1.1700460183.1713052800&semt=sph" alt='logo' style={{width:"100px"}}/>
        <h2>Register</h2>
        </div>
    <InputField name={"Full name"} onChange={handlename} id={"name"}/>
    {validation && <>
    {!name ?(
      <>
       <img src={InformationIcon} alt='' style={{ width:"16px",marginTop:"3px",marginRight:"3px" }}/>
       <span style={{ color:"red",marginTop:"3px" }}>{valid_message}</span>
      </>
    ):null}
    </>}
    <InputField name={"Email"} onChange={handleemail} id={"email"}/>
    {validation && <>
    {!email || !validateEmail(email) ?(
      <>
       <img src={InformationIcon} alt='' style={{ width:"16px",marginTop:"3px",marginRight:"3px" }}/>
       <span style={{ color:"red",marginTop:"3px" }}>{valid_message1}</span>
      </>
    ):null}
   
    </>}
    {/* <InputField name={"age"} onChange={handleage} id={"age"}/> */}
   
    <div className="container2" style={{ flexDirection:"row",marginTop:"15px" }}>
    <label className='dob' style={{ marginTop:"4px",marginRight:"28px" ,width:"24%"}}>Gander</label>
          <div className="radio" onClick={()=>setInputValue('1')}>
            <input id="radio-1" name="radio" type="radio"  value={inputValue}/>
            <label for="radio-1" className="radio-label">Male</label>
          </div>
        
          <div className="radio" onClick={()=>setInputValue('2')}>
            <input id="radio-2" name="radio" type="radio" value={inputValue}/>
            <label  for="radio-2" className="radio-label">Female </label>
          </div>
         
          </div>
          {validation && <>
    {!inputValue ?(
      <>
       <img src={InformationIcon} alt='' style={{ width:"16px",marginTop:"3px",marginRight:"3px" }}/>
       <span style={{ color:"red",marginTop:"3px" }}>{valid_message}</span>
      </>
    ):null}
    </>}
    <DateDropdown setUserAge={setUserAge}
setDob={setDob}/>
     {validation && <>
    {!dob || user_age<13 ?(
      <>
       <img src={InformationIcon} alt='' style={{ width:"16px",marginTop:"3px",marginRight:"3px" }}/>
       <span style={{ color:"red",marginTop:"3px" }}>{valid_message2}</span>
      </>
    ):null}
   
    </>}
    <div style={{ marginTop:"15px" }} autoComplete="off">
    <label  style={{ marginTop:"4px",marginRight:"28px"}}>Work title</label>
    <Select
      options={options}
      onChange={handleChange}
      value={selectedOption}
      isSearchable={true}
      placeholder={"Search profession"}
      styles={customStyles}
      menuPlacement="top"  // Set the placement of the menu
    menuPortalTarget={document.body}  // Renders the dropdown in the portal

    />
         
          </div>

    <Password onChange={handlepassword}/>
    {validation && <>
    {!password &&(
      <>
       <img src={InformationIcon} alt='' style={{ width:"16px",marginTop:"3px",marginRight:"3px" }}/>
       <span style={{ color:"red",marginTop:"3px" }}>{valid_message}</span>
      </>
    )}
   
    </>}
    {api_validation &&(
      <span style={{ color:"red",marginTop:"4px" }}>{api_validation}</span>
    )}
    <div className='submitbtn'>
    <Button handleClickbtn={handleSubmit} loader={loader} name="Register" />
    <p style={{paddingTop:"10px",fontSize:"19px",cursor:"pointer",color:"blueviolet"}} onClick={()=>navigate("/")}>Login</p>
    </div>

    </div>
    </div>
  )
}
