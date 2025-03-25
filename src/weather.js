import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
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
import LoadingWidget from "./components/widgets/loading/loadingWidget.js";
import "./weather.css";
import WindAndRainWidget from "./components/widgets/windAndRain/windAndRainWidget.js";
import ForecastWidget from "./components/widgets/forecast/forecastWidget.js";
import getMoonPhaseIcon from "./components/moonPhases/moonPhases.js";
import LocationSidebar from "./components/locationSidebar/locationSidebar.js";

const MOBILE_THRESHOLD = 1200;

function Weather({ isDarkMode, toggleDarkMode }) {
  const [data, setData] = useState({});
  const [locationRecommendations, setLocationRecommendations] = useState([]);
  const [events, setEvents] = useState([]);
  const [showSidebar, setShowSidebar] = useState(true);
  const [forecastData, setForecastData] = useState([]);
  const [locationCoords, setLocationCoords] = useState({ lat: 0, lon: 0 });
  const [apiLoading, setApiLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [isMobile, setIsMobile] = useState(screenWidth < MOBILE_THRESHOLD);

  function handleResize() {
    setIsMobile(window.innerWidth < MOBILE_THRESHOLD);
    setScreenWidth(window.innerWidth);
  }

  useEffect(() => {
    const locationParam = searchParams.get("location");
    if (locationParam) {
      const location = locationParam.split(",").join(" ");
      searchLocation(location);
    }
    if (isMobile && !locationParam && !forecastData) {
      navigate("/home")
      return
    }
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    }
  }, []);

  const searchLocation = async (location) => {
    console.log("searchLocation", location)
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
  };

  // console.log("Rendering events", events);
  // console.log("Weather data", data)

  return (
    <div className="App-container">
      {
        !isMobile && <LocationSidebar isOpen={showSidebar} setIsOpen={setShowSidebar} searchLocation={searchLocation} />
      }

      <div className="App" id="dark-mode" onClick={() => setShowSidebar(false)}>
        <div className="top_bar">
          {
            (!isMobile && !showSidebar) ? <div>
              <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" fillOpacity="0.6" stroke-linejoin="round" class="sidebar-toggle" onClick={(e) => {
                e.stopPropagation();
                setShowSidebar(true);
              }}
              ><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M15 3v18" /><path d="m10 15-3-3 3-3" /></svg>
            </div> : (isMobile ? <div>
              <a href="/home">
                <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" fillOpacity="0.6" stroke-linejoin="round" class="sidebar-toggle" onClick={(e) => {
                  e.stopPropagation();
                  setShowSidebar(true);
                }}
                ><path d="m15 18-6-6 6-6" /></svg>
              </a>
            </div> : <div></div>)
          }
          <div>


            {isDarkMode ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="white"
                fillOpacity="0.6"
                className="lightbulb"
                viewBox="0 0 16 16"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDarkMode()
                }}
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
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDarkMode()
                }}
              >
                <path
                  fillRule="evenodd"
                  d="M2.23 4.35A6 6 0 0 0 2 6c0 1.691.7 3.22 1.826 4.31.203.196.359.4.453.619l.762 1.769A.5.5 0 0 0 5.5 13a.5.5 0 0 0 0 1 .5.5 0 0 0 0 1l.224.447a1 1 0 0 0 .894.553h2.764a1 1 0 0 0 .894-.553L10.5 15a.5.5 0 0 0 0-1 .5.5 0 0 0 0-1 .5.5 0 0 0 .288-.091L9.878 12H5.83l-.632-1.467a3 3 0 0 0-.676-.941 4.98 4.98 0 0 1-1.455-4.405zm1.588-2.653.708.707a5 5 0 0 1 7.07 7.07l.707.707a6 6 0 0 0-8.484-8.484zm-2.172-.051a.5.5 0 0 1 .708 0l12 12a.5.5 0 0 1-.708.708l-12-12a.5.5 0 0 1 0-.708"
                />
              </svg>
            )}
          </div>
        </div>

        {apiLoading && <LoadingWidget isDarkMode={isDarkMode} isMobile={isMobile} />}

        {!apiLoading && apiError && <ErrorWidget error={apiError} isDarkMode={isDarkMode} isMobile={isMobile} />}

        {!apiLoading && !apiError && data.name !== undefined && (
          <div className={isMobile ? "weather_container_mobile" : "weather_container"}>
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
                isMobile={isMobile}
                moonPhase={forecastData?.forecast?.forecastday[0]?.astro?.moon_phase ?? "Not available"}
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
                isMobile={isMobile}
              />
            </div>

            {!isMobile && (
              <div className="events weather_element">
                <EventsWidget events={events} isDarkMode={isDarkMode} />
              </div>
            )}

            <div className="wind_and_rain weather_element">
              <WindAndRainWidget
                currentConditionIcon={
                  forecastData?.current?.condition?.icon ?? ""
                }
                currentCondition={forecastData?.current?.condition?.text ?? "N/A"}
                windSpeed={forecastData?.current?.wind_mph ?? "N/A"}
                windDirection={forecastData?.current?.wind_dir ?? "N/A"}
                rain={forecastData?.current?.precip_mm ?? data?.rain?.["1h"] ?? "No rain"}
                isMobile={isMobile}
                isDarkMode={isDarkMode}
              />
            </div>

            <div className="forecast_container weather_element">
              <ForecastWidget
                hourlyForecast={
                  forecastData?.forecast?.forecastday[0]?.hour ?? []
                }
                weeklyForecast={forecastData?.forecast?.forecastday ?? []}
                isDarkMode={isDarkMode}
                isMobile={isMobile}
              />
            </div>

            <div className={`${isMobile ? "cloud_coverage_mobile" : "cloud_coverage"} weather_element`}>
              <CloudMapWidget
                cloudCoveragePercentage={forecastData?.current?.cloud ?? "N/A"}
                visibility={forecastData?.current?.vis_miles ?? "N/A"}
                coords={locationCoords}
                isDarkMode={isDarkMode}
                isMobile={isMobile}
              />
            </div>

            {!isMobile && (
              <div className="reccommendations weather_element">
                <LocationsWidget recommendations={locationRecommendations} isDarkMode={isDarkMode} />
              </div>
            )}


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
                isMobile={isMobile}
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
                isMobile={isMobile}
              />
            </div>

            {isMobile && (
              <>
                <div className="humidity weather_element">
                  <SmallWidget
                    title="VISIBILITY"
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        stroke-opacity="0.6"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="lucide lucide-eye">
                        <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    }
                    level={
                      forecastData?.current?.vis_miles + " miles" ?? "N/A"
                    }
                    isDarkMode={isDarkMode}
                    isMobile={isMobile}
                  />
                </div>
                <div className="humidity weather_element">
                  <SmallWidget
                    title="MOON PHASE"
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
                    image={getMoonPhaseIcon(forecastData?.forecast?.forecastday[0]?.astro?.moon_phase ?? "Not available")}
                    subtext={forecastData?.forecast?.forecastday[0]?.astro?.moon_phase ?? "Not available"}
                    isDarkMode={isDarkMode}
                    isMobile={isMobile}
                  />
                </div>
              </>
            )}
          </div>
        )}
        <div id="map"></div>
      </div>
    </div>
  );
}

export default Weather;
