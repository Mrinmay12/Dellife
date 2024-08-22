import React,{useState,useEffect} from 'react'
import InputField from '../../Component/RegisterInput/InputField'
import Password from '../../Component/RegisterInput/PasswordInput/Password'
import Button from "../../Component/LodingButton/Button"
import { CreateJob, userRegister } from '../../AllApi/Integrateapi'
import { useNavigate } from 'react-router-dom'
import DateDropdown from '../../Component/Dobdropdown/DateDropdown'
import { validateEmail } from '../../Utiles'
import { useSelector } from 'react-redux'
import InformationIcon from "./Information.png"
import Select from 'react-select';
export default function Register({setToken}) {
  const userlocation = useSelector(state => state.UserLocation.data)
  const job_data = useSelector(state => state.JobReducer.data)
  const navigate=useNavigate()
  const[name,setName]=useState("")
  const[email,setEmail]=useState("")
  const[user_age,setUserAge]=useState("")
  const[dob,setDob]=useState('')
  const[password,setPassword]=useState("")
  const[inputValue,setInputValue]=useState('')
  const[validation,setValidation]=useState(false)
  const[valid_message,setValid_Message]=useState('')
  const[valid_message1,setValid_Message1]=useState('')
  const[valid_message2,setValid_Message2]=useState('')
  const[api_validation,setApi_validation]=useState('')
  const [options, setOptions] = useState(job_data);
  const [selectedOption, setSelectedOption] = useState(null);
  const [inputValue2, setInputValue2] = useState(null);
  const handlename=(e)=>{
    setName(e)
  }
  const handleemail=(e)=>{
    setEmail(e)
  }
 
  const handlepassword=(e)=>{
    setPassword(e)
  }
  const SaveData=async()=>{
    try{
     
       let res=await CreateJob(selectedOption?.value)
      
    }catch(err){
      console.log(err);
      
    }


      }

      // console.log(inputValue2,"mrinmay",selectedOption?.value);
    const[loader,setLoder]=useState(false)
    const json=JSON.stringify({
      email, 
      password,
       age:user_age,
       dob:dob,
       name ,
       location_user: userlocation.locationName,
       work_title:selectedOption?.value,
       sex:inputValue
    })
 
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
      }if(!selectedOption?.value){
        setValidation(true)
        setValid_Message('This field is required')
      }
       if(email && validateEmail(email) && password && name && inputValue  && user_age>13 && selectedOption?.value){
      setLoder(true)
      try {
        
        let response = await userRegister(json)
          if(response){
            SaveData()
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
//  console.log(dob.length,"dob.length");
 
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
    


    const handleChange = (selectedOption) => {
      setSelectedOption(selectedOption);
   
    };
    useEffect(() => {
      if (inputValue2) {
        const intervalId = setInterval(() => {
          const foundOption = options.find(
            (option) => option.label.toLowerCase() === inputValue2.toLowerCase()
          );
  
          if (!foundOption) {
            const newOption = { value: inputValue2.toLowerCase(), label: inputValue2 };
            setOptions((prevOptions) => [...prevOptions, newOption]);
            setSelectedOption(newOption);
          }
        }, 1000);
  
        return () => clearInterval(intervalId);
      }
    }, [inputValue2, options]);
  
    const handleInputChange = (newValue) => { 
      setInputValue2(newValue);
    };

    // console.log(inputValue2,selectedOption?.value,"mrinmY");

  
     
  
    
    const customStyles = {
      menu: (provided, state) => ({
        ...provided,
        marginBottom: 'auto', // This is important to prevent the dropdown from pushing the input field up
        marginTop: '3px',  
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
    <label  style={{ marginTop:"4px",marginRight:"28px",fontSize:"19px"}}>Work title</label>
    <Select
      options={options}
      onChange={handleChange}
      onInputChange={handleInputChange}
      value={selectedOption}
      isSearchable={true}
      placeholder={"Search or create job"}
      styles={customStyles}
      menuPlacement="top"  // Set the placement of the menu
    menuPortalTarget={document.body}  // Renders the dropdown in the portal

    />
         {validation && <>
    {!selectedOption?.value &&(
      <>
       <img src={InformationIcon} alt='' style={{ width:"16px",marginTop:"3px",marginRight:"3px" }}/>
       <span style={{ color:"red",marginTop:"3px" }}>{valid_message}</span>
      </>
    )}
     </>}
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
    <div class="line-container">
  <div class="line"></div>
  <span class="center-text">OR</span>
  <div class="line"></div>
</div>
    <p style={{paddingTop:"4px",fontSize:"19px",cursor:"pointer",color:"#2b7de2"}} onClick={()=>navigate("/")}>Login</p>
    </div>

    </div>
    </div>
  )
}
