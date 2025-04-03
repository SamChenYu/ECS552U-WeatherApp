import React from 'react';
import { useState } from 'react';
import Weather from './weather';
import Stars from './stars';

/*
  This wrapper component is used to display the weather page along with the stars background
*/



function WeatherPage() {

  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("isDarkMode") === "true";
  }); // get dark mode state from local storage 

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("isDarkMode", !isDarkMode); // save the opposite of the current value
    console.log("Dark mode toggled");
  }

  return (
    <div>
      <div className="weather">
        <Weather isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      </div>

      {isDarkMode ? (
        <div className="stars">
          <Stars />
        </div>
      ) : (
        <div
          className="lightMode"
          style={{
            background:
              'linear-gradient(142deg, #5A40F9 22.71%, #9F91FB 40.7%, #A99CFC 57.29%, #573CF9 78.94%)',
            width: '100%',
            height: '100vh'
          }}
        ></div>
      )}
    </div>
  );
}

export default WeatherPage;