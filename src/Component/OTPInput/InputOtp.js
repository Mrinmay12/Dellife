import { useState,useRef,useEffect } from "react";
import "./Otp.css"
export const OTPInput = ({ length, onChange }) => {
  const [otp, setOtp] = useState(Array(length).fill(""));
  const inputRefs = React.useRef([]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;

    setOtp(newOtp);
    onChange(newOtp.join(""));

    if (element.nextSibling && element.value) {
      element.nextSibling.focus();
    }
  };

  const handleKeyDown = (element, index, e) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      if (!element.value && element.previousSibling) {
        newOtp[index - 1] = '';
        setOtp(newOtp);
        element.previousSibling.focus();
      } else {
        newOtp[index] = '';
        setOtp(newOtp);
      }
      onChange(newOtp.join(""));
    } else if (e.key === "ArrowLeft" && element.previousSibling) {
      element.previousSibling.focus();
    } else if (e.key === "ArrowRight" && element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handlePaste = (e) => {
    const pastedData = e.clipboardData.getData('text').split('').slice(0, length);
    const newOtp = pastedData.map((char, i) => (isNaN(char) ? "" : char)).concat(Array(length).fill("")).slice(0, length);
    setOtp(newOtp);
    onChange(newOtp.join(""));

    setTimeout(() => {
      if (inputRefs.current[pastedData.length - 1]) {
        inputRefs.current[pastedData.length - 1].focus();
      }
    }, 0);
  };

  return (
    <div onPaste={handlePaste}>
      {otp.map((data, index) => (
        <input
          className="otp-field"
          type="text"
          maxLength="1"
          key={index}
          value={data}
          onChange={e => handleChange(e.target, index)}
          onKeyDown={e => handleKeyDown(e.target, index, e)}
          onFocus={e => e.target.select()}
          ref={el => (inputRefs.current[index] = el)}
        />
      ))}
    </div>
  );
};