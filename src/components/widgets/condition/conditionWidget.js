import getMoonPhaseIcon from "../../moonPhases/moonPhases";
import "./conditionWidget.css";

// This component displays the current overall stargazing condition and moon phase with icon
const ConditionWidget = ({ title, level, isDarkMode, isMobile, moonPhase }) => {
  return (
    <div className={`widget condition-widget ${isDarkMode ? "dark" : "light"}`}>
      <div className="wheader">
        <h2 className={`wtitle${isMobile ? "_mobile" : ""}`}>{title}</h2>
      </div>
      <div className="wlevel-condition-container">
        <p className={`wlevel wlevel-condition${isMobile ? "_mobile" : ""}`}>{level}</p>
        <div className="wlevel-condition-moon-phase">
          {/* Get and display the moon phase icon */}
          {getMoonPhaseIcon(moonPhase)}
          <p>{moonPhase}</p>
        </div>
      </div>
    </div>
  );
};

/**
 * This function guesses the current stargazing conditions based on some weather conditions like
 * temperature, cloud coverage and wind. 
 */
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
