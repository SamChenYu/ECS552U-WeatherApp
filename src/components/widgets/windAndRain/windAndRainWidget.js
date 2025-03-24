import "./windAndRainWidget.css";

const WindAndRainWidget = ({
    currentConditionIcon,
    currentCondition,
    windSpeed,
    windDirection,
    rain,
    isDarkMode,
    isMobile
}) => {
    return (
        <div
            className={`widget wind_and_rain ${isDarkMode ? "dark" : "light"
                }`}
        >
            <div className={`wind_and_rain_widget`}>
                <div className="wind_and_rain_weeky_widget_wind_header">
                    <div className={`wind_and_weekly_widget_wind_title${isMobile ? "_mobile" : ""}`}>
                        <div>
                            <h2>{currentCondition}</h2>

                            <p>
                                {windSpeed} mp/h {windDirection}{" "}
                            </p>
                        </div>
                        <p>
                            {rain}
                            {rain == "No rain" ? "" : " mm/h of rain"}
                        </p>
                    </div>
                    <img className={`current-condition-icon${isMobile ? "-mobile" : ""}`} src={currentConditionIcon} alt="Current Condition" />
                </div>

            </div>
        </div>
    );
};

export default WindAndRainWidget;
