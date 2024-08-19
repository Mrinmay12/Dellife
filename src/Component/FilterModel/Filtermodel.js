import React,{useEffect, useState} from 'react'
import "./Filtermodel.css"
import Select from 'react-select';
import { AllLocation } from '../../AllApi/Integrateapi';
export default function Filtermodel({ isOpen, onClose ,setWork_title,setLocation_user}) {
  const[options2,setOption]=useState([])
  useEffect(()=>{
    const Data=async()=>{
  let res=await   AllLocation()
  setOption(res.data.location)
  
    }
    Data()
  },[])
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
    // const options2 = [
    //     { value: 'sonarpur', label: 'sonarpur' },
    //     { value: 'teacher', label: 'Teacher' },
    //     { value: 'orange', label: 'Orange' },
    //     { value: 'grape', label: 'Grape' },
    //   ];
      const [selectedOption2, setSelectedOption2] = useState(null);
      const handleChange2 = (selectedOption) => {
        setSelectedOption2(selectedOption);
      
      };
  
      const handleSearch = () => {
        setWork_title(selectedOption?.value || '');
        setLocation_user(selectedOption2?.value || '');
        setSelectedOption(null);
        setSelectedOption2(null);
        onClose();
    };
      const customStyles = {
        menu: (provided, state) => ({
          ...provided,
          marginBottom: 'auto', // This is important to prevent the dropdown from pushing the input field up
          marginTop: '0',       // Ensures no additional margin at the top
        }),
        menuPortal: base => ({ ...base, zIndex: 9999 })
      };
      
  return (
    <div className={`modal-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}>
    <div
      className={`modal-content ${isOpen ? 'slide-up' : 'slide-down'}`}
      onClick={e => e.stopPropagation()}
    >
      <span className="close-button" onClick={onClose}>&times;</span>
      <div  style={{ display:"flex",justifyContent:'space-between' }}>
      <h2>Filter</h2>
      <div className='filterUpdate' onClick={()=>handleSearch()}>Search</div>
      </div>
      <hr/>
      <h1>Search by work</h1>
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
    <h1>Search by location</h1>
      <Select
      options={options2}
      onChange={handleChange2}
      value={selectedOption2}
      isSearchable={true}
      placeholder={"Search location"}
      styles={customStyles}
      menuPlacement="top"  // Set the placement of the menu
    menuPortalTarget={document.body}  // Renders the dropdown in the portal

    />
     
    </div>
  </div>
  )
}
