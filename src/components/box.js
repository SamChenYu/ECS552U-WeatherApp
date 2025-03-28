import React from "react";
import Forecast from "./forecast";
import "./box.css";

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
