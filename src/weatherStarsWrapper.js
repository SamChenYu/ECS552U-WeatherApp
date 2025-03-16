import React from 'react';
import Weather from './weather';
import Stars from './stars';

function WeatherPage() {
  return (
    <div>
      <div className="weather">
        <Weather />
      </div>
      <div className="stars">
        <Stars />
      </div>
    </div>
  );
}

export default WeatherPage;