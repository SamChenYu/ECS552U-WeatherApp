import Box from "../../box";
import "./windAndWeeklyForecastWidget.css";

// This widget is not used anymore but kept as a reference
// It was seperated into the windAndRain widget and the forecast widget
const WindAndWeeklyForecastWidget = ({
    currentConditionIcon,
    currentCondition,
    windSpeed,
    windDirection,
    rain,
    hourlyForecast,
    weeklyForecast,
    isDarkMode,
}) => {
    return (
        <div
            className={`widget wind_and_weekly_widget ${isDarkMode ? "dark" : "light"
                }`}
        >
            <div className="wind_and_weekly_widget_wind">
                <div className="wind_and_weekly_widget_wind_header">
                    <div className="wind_and_weekly_widget_wind_title">
                        <h2>{currentCondition}</h2>

                        <p>
                            {windSpeed} mp/h {windDirection}{" "}
                        </p>
                    </div>
                    <img src={currentConditionIcon} alt="Current Condition" />
                </div>
                <p>
                    {rain}
                    {rain == "No rain" ? "" : " mm/h of rain"}
                </p>
            </div>
            <div className="vertical_line"></div>
            <div className="wind_and_weekly_widget_forecast ">
                <div className="weekly weather_element">
                    <Box
                        hourlyForecast={hourlyForecast}
                        weeklyForecast={weeklyForecast}
                    />
                </div>
            </div>
        </div>
    );
};

export default WindAndWeeklyForecastWidget;
