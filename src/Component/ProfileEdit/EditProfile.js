import React,{useState,useEffect} from 'react'
import Input from '../PostForm/Input'
import Select from 'react-select';
import SelectDropdown from '../../Select_dropdown/SelectDropdown';
import PhoneSelect from './PhoneSelect';
import "../FilterModel/Filtermodel.css"
import { UpdateUser } from '../../AllApi/Integrateapi';
import { setRefresh } from '../../redux/action/RefreshAction';
import { useDispatch, useSelector } from 'react-redux';
export default function EditProfile({setEditejson,userlogin,isOpen, onClose }) {
  const job_data = useSelector(state => state.JobReducer.data)
  const dispatch=useDispatch()
    const[about,setAbout]=useState("")
    const[phone,setPhone]=useState("") 
    const [link,setLink]=useState("")
    const[email,setEmail]=useState("")
    const [selectedOption, setSelectedOption] = useState("");
    const[work_title,setWork_title]=useState('')
    const [loding,setLoding]=useState(false)
  
    useEffect(()=>{
      if(userlogin){
        setAbout(userlogin.about)
        setPhone(userlogin.phone_number)
        setLink(userlogin.sitelink)
        setWork_title(userlogin.work_title)
        // setSelectedOption(job_data.filter((item)=>item.value===userlogin.work_title))
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
    // useEffect(()=>{
    //   setEditejson(Json)
    // },[Json])
    
    const handleEdit2 = async() => {
      setLoding(true)
      try {
        const response = await UpdateUser(Json);
  
        if (response) {
          setLoding(false)
  
        }
      } catch (error) {
        console.error(error);
        setLoding(false)
      } finally {
        dispatch(setRefresh(new Date().getMilliseconds()))
        onClose()
        // setrefress(new Date().getMilliseconds())
      }
     
  
    }

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };
  const options = job_data

  const customStyles = {
    menu: (provided, state) => ({
      ...provided, 
      marginBottom: 'auto', // This is important to prevent the dropdown from pushing the input field up
      marginTop: '0',       // Ensures no additional margin at the top
    }),
    menuPortal: base => ({ ...base, zIndex: 9999 }),
    control: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused ? '#007bff' : '#ced4da', // border color when focused
      boxShadow: state.isFocused ? '0 0 0 0.2rem rgba(0,123,255,.25)' : null, // box shadow when focused
      border:  '3px solid #0186ca' ,
      '&:hover': {
        border: '3px solid #0186ca', // border color when hovered
       
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
    <div className={`modal-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}>
    <div
      className={`modal-content ${isOpen ? 'slide-up' : 'slide-down'}`}
      onClick={e => e.stopPropagation()}
    >
    {loding?(
            <p style={{marginTop:"2px",cursor:"pointer"}} ><button className='postbtn'>Saved....</button></p>
          ):(
            <p style={{marginTop:"2px",cursor:"pointer"}} onClick={()=>handleEdit2()}><button className='postbtn'>Save</button></p>
          )}
      <span className="close-button" onClick={onClose}>&times;</span>
     {/* <textarea id="message" className="input" value={about} placeholder="About" onChange={(e)=>setAbout(e.target.value)}></textarea> */}
        <Input placeholder="About" onchange={setAbout} value={about} inputtype="text" title={"Write about yourself"}/>
        <Input placeholder="link" onchange={setLink} value={link} inputtype="url" title={"Enter link"}/>
        {/* <Input placeholder="phone" onchange={setPhone} value={phone} inputtype="tel" title={"Enter phone number"}/> */}
        {/* <Input placeholder="email" onchange={setEmail} value={email} inputtype="email"/> */}
        {/* <SelectDropdown  options={options} handleOption={handleChange}/> */}
        <PhoneSelect onchange={setPhone}/>
        {/* <SelectDropdown  options={options} handleOption={handleChange}/> */}

        <Input placeholder="link"  value={work_title} inputtype="url" title={"Profession"} disabled={true}/>
        {/* <Select
      options={options}
      onChange={handleChange}
      value={selectedOption}
      isSearchable={true}
      placeholder={"Search profession"}
      styles={customStyles}
      menuPlacement="top"  
    menuPortalTarget={document.body}  
    /> */}
    </div>
    </div>
  )
}
