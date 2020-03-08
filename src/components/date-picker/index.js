import React, { useState } from 'react';
import ReactDatePicker, { } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './date-picker.scss';

function DatePicker({ onDateChange }) {
  const [startDate, setStartDate] = useState(new Date());

  function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  return (
    <ReactDatePicker
      selected={startDate}
      onChange={date => {
        setStartDate(date);
        onDateChange(date);
      }}
      minDate={new Date()}
      maxDate={addDays(new Date(), 365)}
    />
  );
}

export default DatePicker;
