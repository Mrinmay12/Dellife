import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import "./Detailsmodel.css"
const ShareDetailsmodel = ({ onClose,postId }) => {
  const userlogin = useSelector(state => state.myReducer.data)
  const [inputValue, setInputValue] = useState('');
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);


  const [isChecked, setIsChecked] = useState(false);
  const [data, setData] = useState([
    { name: "Mri", id: "123", checked: false },
    { name: "Mri1", id: "1231", checked: false },
    { name: "Mri2", id: "1232", checked: false },
  ]);

  const handleToggle = () => {
    setIsChecked(!isChecked);
    setData(data.map(item => ({ ...item, checked: !isChecked })));
  };

  const handleToggle2 = (id) => {
    setData(data.map(item => {
      if (item.id === id) {
        return { ...item, checked: !item.checked };
      }
      return item;
    }));
  };
  return (
    <div className="modal-container-details" ref={modalRef}>
     <div className="shareuserinfo">
     <div className='sharealldetails'>
       <p className='sharetext'>Share your details</p>
         <label className="toggle-switch">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleToggle}
        />
        <span className="slider round"></span>
      </label>
      </div>
     </div>
<hr/>
<div>
{data.map((item) => (
  <div style={{marginTop:"2px"}}>
  <div className="shareuserinfo">
   <img className="usershareimg" src={"https://cloudinary-marketing-res.cloudinary.com/images/w_1000,c_scale/v1679921049/Image_URL_header/Image_URL_header-png?_i=AA"} alt={item.name} />
   <h3 className="usersharename">Mrinmay,a,ama</h3>
   <div className="usersharename">
  <label className="toggle-switch">
  <input
    type="checkbox"
    checked={item.checked}
    onChange={() => handleToggle2(item.id)}
  />
  <span className="slider round"></span>
</label>
</div>
  </div>
  </div>
))}
    </div>
    </div>
  );
};

export default ShareDetailsmodel;
