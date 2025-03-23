import "./temperatureWidget.css";

const TemperatureWidget = ({
  region,
  city,
  feelsLike,
  temperature,
  highAndLow,
  isDarkMode,
}) => {
  return (
    <div
      className={`widget widget-temperature ${isDarkMode ? "dark" : "light"}`}
    >
      <div className="widget-temperature-location-container">
        <div>
          <h2 className="wtitle widget-temperature-region-title">{region}</h2>
          <h3 className="temperature-city-title">{city}</h3>
        </div>
        <div>
          <p className="widget-temperature-feels-like">
            Feels like {feelsLike}°C
          </p>
        </div>
      </div>
      <div className="widget-temperature-container">
        <h2 className="widget-temperature-current-temp">{temperature}°C</h2>
        <h3 className="widget-temperature-high-and-low">{highAndLow}</h3>
      </div>
    </div>
  );
};

export default TemperatureWidget;
