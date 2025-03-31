import React, { useState } from "react";
import "./forecast_style.css";

const Forecast = ({ className, hourlyForecast, weeklyForecast }) => {
  const [property1, setProperty1] = useState("default");
  const [forecastView, setForecastView] = useState("hourly");

  const handleWeeklyClick = () => {
    setForecastView("weekly");
  };

  const handleHourlyClick = () => {
    setForecastView("hourly");
  };

  if (!hourlyForecast || hourlyForecast.length != 24) {
    console.warn("hourlyForecast should have 24 entries, could be api error", hourlyForecast);
  }

  if (!weeklyForecast || weeklyForecast.length != 7) {
    console.warn("weeklyForecast should have 7 entries, could be api error", weeklyForecast);
  }

  return (
    <div className={`forecast ${className}`}>
      <div id="forecast-toggle">
        <div className={`text-wrapper ${forecastView == "hourly" ? "forecast-toggle-active" : "forecast-toggle-inactive"}`} onClick={handleHourlyClick}>
          Hourly
        </div>

        <div
          className={`div ${forecastView == "weekly" ? "forecast-toggle-active" : "forecast-toggle-inactive"}`}
          onClick={handleWeeklyClick} // Handle the click
        >
          Weekly
        </div>
      </div>

      <img
        className="line"
        alt="Line"
        src={
          forecastView === "hourly"
            ? "https://c.animaapp.com/HlVE0F6Z/img/line-12-3.svg"
            : "https://c.animaapp.com/HlVE0F6Z/img/line-12-2.svg"
        }
      />

      <div className={`hourly property-1-0-default`}>
        {forecastView === "hourly" && hourlyForecast.map((hour, idx) => {
          return <div className="group" key={idx}>
            <div className="overlap-group">
              {forecastView === "weekly" && (
                <>
                  <div className="text-wrapper-10">FRI</div>
                  <div className="text-wrapper-2">12°</div>
                </>
              )}

              <img
                className="emoji-neutral-face-2"
                alt="Emoji neutral face"
                src={hour.condition.icon}
              />

              {forecastView === "hourly" && (
                <>
                  <div className="text-wrapper-7">{convertNumberTo24HourFormat(idx)}</div>
                  <div className="text-wrapper-2">{hour.temp_c.toFixed(0)}°C</div>
                </>
              )}
            </div>
          </div>
        })}

        {forecastView === "weekly" && weeklyForecast.map((day, idx) => {
          const date = new Date(day.date)
          return <div className="group" key={idx}>
            <div className="overlap-group">
              {forecastView === "weekly" && (
                <>
                  <div className="text-wrapper-7">{date.getDate()}/{date.getMonth()}</div>
                  <div className="text-wrapper-2">{day.day.avgtemp_c.toFixed(0)}°C</div>
                </>
              )}

              <img
                className="emoji-neutral-face-2"
                alt="Emoji neutral face"
                src={day.day.condition.icon}
              />
            </div>
          </div>
        })}

      </div>
    </div>
  );
};

function convertNumberTo24HourFormat(hour) {
  const period = hour >= 12 ? "PM" : "AM";
  let newHour = hour % 12;

  if (newHour == 0) newHour = 12;

  return `${newHour}${period}`
}

export default Forecast;
