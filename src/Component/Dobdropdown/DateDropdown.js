import React, { useState, useEffect } from 'react';
import './DateDropdown.css';

const DateDropdown = () => {
  const [days, setDays] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [age, setAge] = useState(null);
  const calculateAge = (birthDate) => {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };
  const handleDayChange = (e) => {
    setSelectedDay(e.target.value);
    if (selectedYear && selectedMonth && e.target.value) {
        const birthDate = new Date(selectedYear, selectedMonth - 1, e.target.value);
        setAge(calculateAge(birthDate));
      }
    console.log('Selected Day:', e.target.value);
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
    if (selectedYear && e.target.value && selectedDay) {
        const birthDate = new Date(selectedYear, e.target.value - 1, selectedDay);
        setAge(calculateAge(birthDate));
      }
    console.log('Selected Month:', e.target.value);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
    if (e.target.value && selectedMonth && selectedDay) {
        const birthDate = new Date(e.target.value, selectedMonth - 1, selectedDay);
        setAge(calculateAge(birthDate));
      }
    console.log('Selected Year:', e.target.value);
  };

  useEffect(() => {
    // Populate days
    const daysArray = [];
    for (let i = 1; i <= 31; i++) {
      daysArray.push(i);
    }
    setDays(daysArray);

    // Populate years
    const yearsArray = [];
    const currentYear = new Date().getFullYear();
    for (let i = currentYear - 100; i <= currentYear; i++) {
      yearsArray.push(i);
    }
    setYears(yearsArray);
  }, []);
console.log(age,"this s9s age");
  return (
    <div style={{paddingTop:"24px"}}>
       <label className='dob'>Date of birth</label>
    
    <div className="dropdown-container">
      <select value={selectedDay} onChange={handleDayChange}>
        <option value="">Day</option>
        {days.map(day => (
          <option key={day} value={day}>
            {day}
          </option>
        ))}
      </select>

      <select value={selectedMonth} onChange={handleMonthChange}>
        <option value="">Month</option>
        <option value="1">January</option>
        <option value="2">February</option>
        <option value="3">March</option>
        <option value="4">April</option>
        <option value="5">May</option>
        <option value="6">June</option>
        <option value="7">July</option>
        <option value="8">August</option>
        <option value="9">September</option>
        <option value="10">October</option>
        <option value="11">November</option>
        <option value="12">December</option>
      </select>

      <select value={selectedYear} onChange={handleYearChange}>
        <option value="">Year</option>
        {years.map(year => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
     
    </div>
    </div>
  );
};

export default DateDropdown;
