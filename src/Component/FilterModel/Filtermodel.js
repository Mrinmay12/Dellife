import React,{useState} from 'react'
import "./Filtermodel.css"
import Select from 'react-select';
export default function Filtermodel({ isOpen, onClose }) {
    const options = [
        { value: 'apple', label: 'Apple' },
        { value: 'banana', label: 'Banana' },
        { value: 'orange', label: 'Orange' },
        { value: 'grape', label: 'Grape' },
        // Add more options as needed
      ];
      const [selectedOption, setSelectedOption] = useState("");
      const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption);
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
      <div className='filterUpdate'>Update</div>
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
      options={options}
      onChange={handleChange}
      value={selectedOption}
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
