import Box from "../../box";
import "./forecastWidget.css";

// This widget shows the forecast for the next 24 hours and 7 days
const ForecastWidget = ({
    hourlyForecast,
    weeklyForecast,
    isDarkMode,
}) => {
    return (
        <div
            className={`widget forecast_widget ${isDarkMode ? "dark" : "light"
                }`}
        >
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

export default ForecastWidget;
