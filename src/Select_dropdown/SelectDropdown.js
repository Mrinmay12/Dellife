import React,{useState} from 'react'
import Select from 'react-select';
import "./Selectdrop.css"
export default function SelectDropdown({options,handleOption}) {

    const [selectedOption, setSelectedOption] = useState("");
  
    
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
        //   width:"485px"
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
      const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption);
        handleOption(selectedOption.value);
      };
  return (
  // <div className='select_drop'>
      <Select
      options={options}
      onChange={handleChange}
      value={selectedOption}
      isSearchable={true}
      placeholder={"Search profession"}
      styles={customStyles}
    />
  // </div>
  )
}
