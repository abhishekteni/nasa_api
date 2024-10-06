// src/App.js
import React, { useState } from 'react';
import APOD from './components/APOD';
import NEO from './components/NEO';
import MarsRover from './components/MarsRover';
import EpicImages from './components/EpicImages';
import HomePage from './components/HomePage';
import './App.css';

const App = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleDateChange = (start, end) => {
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <div className='app_container'>
      <div className='homepage_fullwidth'>
        <HomePage onDateChange={handleDateChange} />
      </div>

      {startDate && endDate && (
        <div className='content_container'>
          <div className='section'>
            <h1>Astronomy Picture of the Day</h1>
            <APOD selectedDate={startDate} />
          </div>
          <div className='section'>
            <h2>Near-Earth Objects</h2>
            <NEO startDate={startDate} endDate={endDate} />
          </div>
          <div className='section'>
            <h2>Mars Rover Photos</h2>
            <MarsRover />
          </div>
          <div className='section'>
            <EpicImages />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
