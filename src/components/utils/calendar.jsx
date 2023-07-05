
import format from 'date-fns/format';

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';



export default function Calendar ({ selectedDay, setSelectedDay, handleDateChange, isOpen, setIsOpen }) {
   
    const handleClick = (e) => {
      e.preventDefault();
      setIsOpen(!isOpen);
    };
    return (
      <div className='relative'>
        <button className="font-semibold text-xl text-[#1E1E1E] flex items-center gap-x-2" onClick={handleClick}>
          {format(selectedDay, "dd/MM/yyyy")}
        <p className='pb-[6px]'>
            <CalendarMonthRoundedIcon/>
        </p>
        </button>
        <div className=' absolute'>

        {isOpen && (
          <DatePicker selected={selectedDay} onChange={handleDateChange} inline />
        )}
        </div>
      </div>
    );
  };
