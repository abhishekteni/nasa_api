// src/components/DatePicker.js
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateSelector = ({ onDateChange }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);

    // Format dates to YYYY-MM-DD
    const formattedStart = start ? start.toISOString().split('T')[0] : null;
    const formattedEnd = end ? end.toISOString().split('T')[0] : null;

    // Call the callback with both start and end date
    onDateChange(formattedStart, formattedEnd);
  };

  return (
    <div>
      <h3>Select a Date Range</h3>
      <DatePicker
        selected={startDate}
        onChange={handleDateChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        inline
      />
    </div>
  );
};

export default DateSelector;
