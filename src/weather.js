import React, { useState } from "react";
import makeEventsAPICall from "./api/eventsAPI.js";
import makeForecastAPICall from "./api/forecastAPI.js";
import makeLocationAPICall from "./api/locationAPI.js";
import makeWeatherAPICall from "./api/weatherAPI.js";
import SmallWidget from "./components/smallwidget.js";
import CloudMapWidget from "./components/widgets/cloudMap/cloudMapWidget.js";
import {
  CalculateStargazingConditions,
  ConditionWidget,
} from "./components/widgets/condition/conditionWidget.js";
import ErrorWidget from "./components/widgets/error/errorWidget.js";
import EventsWidget from "./components/widgets/events/eventsWidget.js";
import LocationsWidget from "./components/widgets/locations/locationsWidget.js";
import TemperatureWidget from "./components/widgets/temperature/temperatureWidget.js";
import WindAndWeeklyForecastWidget from "./components/widgets/windAndWeeklyForecast/windAndWeeklyForecastWidget.js";
import LoadingWidget from "./components/widgets/loading/loadingWidget.js";
import "./weather.css";

function Weather({ isDarkMode, toggleDarkMode }) {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [locationRecommendations, setLocationRecommendations] = useState([]);
  const [events, setEvents] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [forecastData, setForecastData] = useState([]);
  const [locationCoords, setLocationCoords] = useState({ lat: 0, lon: 0 });
  const API_KEY = process.env.REACT_APP_API_KEY;
  const API_KEY_HOURLY_WEEKLY = process.env.REACT_APP_API_KEY_HOURLY_WEEKLY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`;
  const weeklyForecastUrl = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY_HOURLY_WEEKLY}&q=${location}&days=7&aqi=no&alerts=no`;
  const [apiLoading, setApiLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const searchLocation = async (event) => {
    if (event.key === "Enter") {
      setApiLoading(true);
      // General Weather
      const weatherData = await makeWeatherAPICall(location)
      console.log("weatherData", weatherData)
      if (!weatherData) {
        setApiError(`Weather API Error. Something went wrong. Please try again.`)
        setApiLoading(false);
        return;
      }
      setData(weatherData)

      const forecastData = await makeForecastAPICall(location)
      console.log("forecastData", forecastData)
      if (!forecastData) {
        setApiError(`Forecast API Error. Something went wrong. Please try again.`)
        setApiLoading(false);
        return;
      }
      setForecastData(forecastData)
      const coords = weatherData.coord;

      const eventsData = await makeEventsAPICall(coords.lon, coords.lat)
      setLocationCoords(coords)
      console.log("EventsData", eventsData)
      if (!eventsData) {
        setApiError(`Events API Error. Something went wrong. Please try again.`)
        return;
      }
      eventsData.forEach((resp) => {
        const data = resp.data.table.rows[0].cells;
        if (!data || data.length === 0) return;
        setEvents([...events, ...data]);
      });

      const locationData = await makeLocationAPICall(location);
      console.log("LocationData", locationData);
      if (!locationData) {
        setApiError(`Location API Error. Something went wrong. Please try again.`)
        setApiLoading(false);
        return;
      }

      setLocationRecommendations(
        locationData.map((place) => {
          return {
            location: {
              lat: place.location.lat,
              lng: place.location.lng,
            },
            displayName: place.displayName,
          };
        })
      );
      setApiLoading(false);
      setApiError(null);
    }
  };

  // console.log("Rendering events", events);
  // console.log("Weather data", data)

  return (
    <div className="App" id="dark-mode" onClick={() => setShowSidebar(false)}>
      <div className="top_bar">
        {showSidebar && (
          <div id="sidebar">
            <div
              className="sidebar-items"
              onClick={() => (window.location = "/weather")}
            >
              Locations
            </div>
            <div
              className="sidebar-items"
              onClick={() => (window.location = "/events")}
            >
              Upcoming Celestial Events
            </div>
            <div
              className="sidebar-items"
              onClick={() => (window.location = "/recommendations")}
            >
              Recommended Spots
            </div>
          </div>
        )}

        <div id="menu_bar">
          <svg
            id="sidebar_toggle"
            width="43"
            height="43"
            viewBox="0 0 43 43"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={(e) => {
              e.stopPropagation();
              setShowSidebar(true);
            }}
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M39.4167 12.5417V8.95833H3.58333V12.5417H39.4167ZM39.4167 19.7083V23.2917H3.58333V19.7083H39.4167ZM39.4167 30.4583V34.0417H3.58333V30.4583H39.4167Z"
              fill="white"
              fillOpacity="0.6"
            />
          </svg>
        </div>
        <div className="search">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.3833 12.7666C7.76953 12.7666 9.04785 12.3184 10.0938 11.5713L14.0283 15.5059C14.2109 15.6885 14.4517 15.7798 14.709 15.7798C15.2485 15.7798 15.6304 15.3647 15.6304 14.8335C15.6304 14.5845 15.5474 14.3438 15.3647 14.1694L11.4551 10.2515C12.2769 9.17236 12.7666 7.83594 12.7666 6.3833C12.7666 2.87207 9.89453 0 6.3833 0C2.88037 0 0 2.86377 0 6.3833C0 9.89453 2.87207 12.7666 6.3833 12.7666ZM6.3833 11.3887C3.64404 11.3887 1.37793 9.12256 1.37793 6.3833C1.37793 3.64404 3.64404 1.37793 6.3833 1.37793C9.12256 1.37793 11.3887 3.64404 11.3887 6.3833C11.3887 9.12256 9.12256 11.3887 6.3833 11.3887Z"
              fill="white"
              fillOpacity="0.98"
            />
          </svg>
          <input
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            onKeyPress={searchLocation}
            placeholder="Search Location"
            type="text"
          />
        </div>

        {isDarkMode ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="white"
            fillOpacity="0.6"
            className="lightbulb"
            viewBox="0 0 16 16"
            onClick={() => toggleDarkMode()}
          >
            <path d="M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13a.5.5 0 0 1 0 1 .5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1 0-1 .5.5 0 0 1 0-1 .5.5 0 0 1-.46-.302l-.761-1.77a2 2 0 0 0-.453-.618A5.98 5.98 0 0 1 2 6m6-5a5 5 0 0 0-3.479 8.592c.263.254.514.564.676.941L5.83 12h4.342l.632-1.467c.162-.377.413-.687.676-.941A5 5 0 0 0 8 1" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="white"
            fillOpacity="0.6"
            className="lightbulb"
            viewBox="0 0 16 16"
            onClick={() => toggleDarkMode()}
          >
            <path
              fillRule="evenodd"
              d="M2.23 4.35A6 6 0 0 0 2 6c0 1.691.7 3.22 1.826 4.31.203.196.359.4.453.619l.762 1.769A.5.5 0 0 0 5.5 13a.5.5 0 0 0 0 1 .5.5 0 0 0 0 1l.224.447a1 1 0 0 0 .894.553h2.764a1 1 0 0 0 .894-.553L10.5 15a.5.5 0 0 0 0-1 .5.5 0 0 0 0-1 .5.5 0 0 0 .288-.091L9.878 12H5.83l-.632-1.467a3 3 0 0 0-.676-.941 4.98 4.98 0 0 1-1.455-4.405zm1.588-2.653.708.707a5 5 0 0 1 7.07 7.07l.707.707a6 6 0 0 0-8.484-8.484zm-2.172-.051a.5.5 0 0 1 .708 0l12 12a.5.5 0 0 1-.708.708l-12-12a.5.5 0 0 1 0-.708"
            />
          </svg>
        )}
      </div>

      {apiLoading && <LoadingWidget isDarkMode={isDarkMode} />}

      {!apiLoading && apiError && <ErrorWidget error={apiError} isDarkMode={isDarkMode} />}

      {!apiLoading && !apiError && data.name !== undefined && (
        <div className="weather_container">
          <div className="conditions weather_element">
            <ConditionWidget
              title="Tonight's Stargazing Conditions"
              level={CalculateStargazingConditions(
                forecastData?.current?.temp_c,
                forecastData?.current?.cloud,
                forecastData?.current?.vis_miles,
                forecastData?.current?.wind_mph,
                forecastData?.current?.gust_mph,
                forecastData?.current?.windchill_c
              )}
              isDarkMode={isDarkMode}
            />
          </div>

          <div className="location weather_element">
            <TemperatureWidget
              region={
                forecastData?.location?.country ??
                data?.sys?.country ??
                "Unavailable"
              }
              isDarkMode={isDarkMode}
              city={data.name ?? "Unavailable"}
              feelsLike={data.main.feels_like?.toFixed(0) ?? "N/A"}
              temperature={data.main.temp?.toFixed(0) ?? "N/A"}
              highAndLow={`H:${data.main.temp_max?.toFixed(
                0
              )}°C L:${data.main.temp_min?.toFixed(0)}°C`}
            />
          </div>

          <div className="events weather_element">
            <EventsWidget events={events} isDarkMode={isDarkMode} />
          </div>

          <div className="wind_and_weekly weather_element">
            <WindAndWeeklyForecastWidget
              currentConditionIcon={
                forecastData?.current?.condition?.icon ?? ""
              }
              currentCondition={forecastData?.current?.condition?.text ?? "N/A"}
              windSpeed={forecastData?.current?.wind_mph ?? "N/A"}
              windDirection={forecastData?.current?.wind_dir ?? "N/A"}
              rain={forecastData?.current?.precip_mm ?? data?.rain?.["1h"] ?? "No rain"}
              hourlyForecast={
                forecastData?.forecast?.forecastday[0]?.hour ?? []
              }
              weeklyForecast={forecastData?.forecast?.forecastday ?? []}
              isDarkMode={isDarkMode}
            />
          </div>

          <div className="cloud_coverage weather_element">
            <CloudMapWidget
              cloudCoveragePercentage={forecastData?.current?.cloud ?? "N/A"}
              visibility={forecastData?.current?.vis_miles ?? "N/A"}
              coords={locationCoords}
              isDarkMode={isDarkMode}
            />
          </div>

          <div className="reccommendations weather_element">
            <LocationsWidget recommendations={locationRecommendations} isDarkMode={isDarkMode} />
          </div>

          <div className="humidity weather_element">
            <SmallWidget
              title="HUMIDITY"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M12 22C13.8565 22 15.637 21.2625 16.9497 19.9497C18.2625 18.637 19 16.8565 19 15C19 13 18 11.1 16 9.5C14 7.9 12.5 5.5 12 3C11.5 5.5 10 7.9 8 9.5C6 11.1 5 13 5 15C5 16.8565 5.7375 18.637 7.05025 19.9497C8.36301 21.2625 10.1435 22 12 22Z"
                    stroke="white"
                    stroke-opacity="0.6"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              }
              subtitle="Relative"
              level={
                forecastData?.current?.humidity
                  ? `${forecastData.current.humidity}%`
                  : "N/A"
              }
              subtext={
                forecastData?.current?.dewpoint_c
                  ? `Dew point: ${forecastData.current.dewpoint_c}°C`
                  : ""
              }
              isDarkMode={isDarkMode}
            />
          </div>

          <div className="light_pollution weather_element">
            <SmallWidget
              title="LIGHT POLLUTION"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="26"
                  viewBox="0 0 18 26"
                  fill="none"
                >
                  <path
                    d="M13 15.2222C13.25 14.1111 13.875 13.3334 14.875 12.4445C16.125 11.4445 16.75 10 16.75 8.55558C16.75 6.78747 15.9598 5.09178 14.5533 3.84154C13.1468 2.59129 11.2391 1.88892 9.25 1.88892C7.26088 1.88892 5.35322 2.59129 3.9467 3.84154C2.54018 5.09178 1.75 6.78747 1.75 8.55558C1.75 9.66669 2 11 3.625 12.4445C4.5 13.2222 5.25 14.1111 5.5 15.2222M5.5 19.6667H13M6.75 24.1111H11.75"
                    stroke="white"
                    stroke-opacity="0.6"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              }
              level="High"
              subtext="Conditions not ideal"
              isDarkMode={isDarkMode}
            />
          </div>
        </div>
      )}
      <div id="map"></div>
    </div>
  );
}

export default Weather;
