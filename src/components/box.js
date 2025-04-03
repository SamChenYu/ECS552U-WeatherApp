import React from "react";
import Forecast from "./forecast";
import "./box.css";

// This component is used to display the forecast for the next 24 hours and 7 days

const Box = ({ hourlyForecast, weeklyForecast }) => {
  return (
    <div className="box">
      <div className="forecast-2">
        <Forecast className="property-default" property1="default" hourlyForecast={hourlyForecast} weeklyForecast={weeklyForecast} />
      </div>
    </div>
  );
};

export default Box;
