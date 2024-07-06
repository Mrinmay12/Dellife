import React,{useState} from "react";
import Select, { components } from "react-select";
import Input from "../PostForm/Input";
import "./PhoneSelect.css"
const countryOptions = [
  {
    value: "usa",
    label: "United States",
    flag: "https://cdn.britannica.com/33/4833-004-828A9A84/Flag-United-States-of-America.jpg",
  },
  {
    value: "uk",
    label: "+91",
    flag: "https://img.freepik.com/free-vector/illustration-india-flag_53876-27130.jpg",
  },
  // Add more countries with their flag images here
];

const CustomOption = ({ data, ...props }) => (
  <components.Option {...props}>
    <img
      src={data.flag}
      alt={data.label}
      style={{ width: 20, marginRight: 10 }}
    />
    {data.label}
  </components.Option>
);

const SingleValue = ({ data }) => (
  <div>
    <img
      src={data.flag}
      alt={data.label}
      style={{ width: 20, marginRight: 10 }}
    />
    {data.label}
  </div>
);

const handleChange = (selectedOption) => {
  console.log("Selected Option:", selectedOption);
};

  
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
      borderRadius:"20px",
      // width:"200px"
    }),

    
  };
const PhoneSelect = () => {
    const[phone,setPhone]=useState("") 
    const handlePhone=(e)=>{
        const newValue = e.target.value.replace(/[^0-9]/g, "").slice(0,10)
        setPhone(newValue)
    }
    return(
    <div className="phoneclass">
  <Select
    className="basic-singlephone"
    classNamePrefix="select"
    name="color"
    options={countryOptions}
    components={{ Option: CustomOption }} //if only image show in option
    // components={{ Option: CustomOption, SingleValue }} //if  image show in both
    onChange={handleChange}
    styles={customStyles}
    placeholder="Country code"
  />
  
  <input className="phoneselect" onChange={handlePhone} value={phone} placeholder="Phone"/>
       {/* <Input placeholder="phone" onchange={setPhone} value={phone} inputtype="tel"/> */}
       
  </div>
    )
}

export default PhoneSelect;
