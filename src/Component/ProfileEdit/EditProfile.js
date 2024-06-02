import React,{useState,useEffect} from 'react'
import Input from '../PostForm/Input'
import Select from 'react-select';
import SelectDropdown from '../../Select_dropdown/SelectDropdown';
export default function EditProfile({setEditejson,userlogin}) {
    const[about,setAbout]=useState("")
    const[phone,setPhone]=useState("") 
    const [link,setLink]=useState("")
    const[email,setEmail]=useState("")
    const [selectedOption, setSelectedOption] = useState("");
    useEffect(()=>{
      if(userlogin){
        setAbout(userlogin.about)
        setPhone(userlogin.phone_number)
        setLink(userlogin.sitelink)
        setSelectedOption(userlogin.work_title)
        setEmail(userlogin.email)
      }
    },[userlogin])
    const Json={ 
      about:about,
      phone_number:phone,
        sitelink:link,
        work_title:selectedOption,
        user_id:userlogin?.user_id,
        email:email
    }
    useEffect(()=>{
      setEditejson(Json)
    },[Json])
    
  

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };
  const options = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'orange', label: 'Orange' },
    { value: 'grape', label: 'Grape' },
    // Add more options as needed
  ];

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused ? '#007bff' : '#ced4da', // border color when focused
      boxShadow: state.isFocused ? '0 0 0 0.2rem rgba(0,123,255,.25)' : null, // box shadow when focused
      border:  '3px solid #98d4f3' ,
      '&:hover': {
        border: '3px solid #98d4f3', // border color when hovered
       
      },
      marginTop:"20px",
      borderRadius:"20px"
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#007bff' : '#fff', // background color when selected
      color: state.isSelected ? '#fff' : '#495057', // text color when selected
      '&:hover': {
        backgroundColor: 'orange', // background color when hovered
        color: '#fff' // text color when hovered
      }
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: state.isFocused ? 'red' : '#ced4da', // color of the dropdown indicator
    }),
    indicatorSeparator: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? 'orange' : '#ced4da', // color of the indicator separator
    }),
    
  };


  return (
    <div>
     {/* <textarea id="message" className="input" value={about} placeholder="About" onChange={(e)=>setAbout(e.target.value)}></textarea> */}
        <Input placeholder="About" onchange={setAbout} value={about} inputtype="text"/>
        <Input placeholder="link" onchange={setLink} value={link} inputtype="url"/>
        <Input placeholder="phone" onchange={setPhone} value={phone} inputtype="tel"/>
        <Input placeholder="email" onchange={setEmail} value={email} inputtype="email"/>
        <SelectDropdown  options={options} handleOption={handleChange}/>
        <Select
      options={options}
      onChange={handleChange}
      value={selectedOption}
      isSearchable={true}
      placeholder={"Search profession"}
      styles={customStyles}
    />
    </div>
  )
}
