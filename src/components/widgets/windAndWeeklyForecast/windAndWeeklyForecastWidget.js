import Box from "../../box";
import "./windAndWeeklyForecastWidget.css";

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
