import "./conditionWidget.css";

const ConditionWidget = ({ title, level, isDarkMode }) => {
  return (
    <div className={`widget condition-widget ${isDarkMode ? "dark" : "light"}`}>
      <div className="wheader">
        <h2 className="wtitle">{title}</h2>
      </div>
      <div className="wlevel-condition-container">
        <p className="wlevel wlevel-condition">{level}</p>
      </div>
    </div>
  );
};

function CalculateStargazingConditions(
  temperatureC,
  cloudCoveragePercentage,
  visibilityInMiles,
  windSpeedMph,
  windGustMph,
  windChillC
) {
  if ((temperatureC && temperatureC < 0) || windChillC & (windChillC < 5))
    return "Too cold";
  if (temperatureC && temperatureC > 30) return "Too hot";

  if (cloudCoveragePercentage && cloudCoveragePercentage > 75)
    return "Too cloudy";

  if (visibilityInMiles && visibilityInMiles < 0.5) return "Visibility too low";

  if ((windSpeedMph && windSpeedMph > 30) || (windGustMph && windGustMph > 30))
    return "Too windy";

  return "Good";
}

export { ConditionWidget, CalculateStargazingConditions };
