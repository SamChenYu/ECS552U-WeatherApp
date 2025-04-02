import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import makeEventsAPICall from "./api/eventsAPI.js";
import makeForecastAPICall from "./api/forecastAPI.js";
import makeLocationAPICall from "./api/locationAPI.js";
import makeWeatherAPICall from "./api/weatherAPI.js";
import makeIPLookupAPICall from "./api/ipLookupAPI.js";
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
import LocationSidebar from "./components/locationSidebar/locationSidebar.js";

const MOBILE_THRESHOLD = 1200; // screen width threshold when the app is mobile or not

function Weather({ isDarkMode, toggleDarkMode }) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams(); // search parameters in the url

  const [data, setData] = useState({}); // weather data from the weather API
  const [locationRecommendations, setLocationRecommendations] = useState([]); // location data from the location API
  const [events, setEvents] = useState([]); // events data from the events API
  const [forecastData, setForecastData] = useState([]); // forecast data from the forecast API
  const [locationCoords, setLocationCoords] = useState({ lat: 0, lon: 0 }); // location coordinates from the weather API

  const [apiLoading, setApiLoading] = useState(false); // is the API loading or waiting for response
  const [apiError, setApiError] = useState(null); // is there an API error

  const [showSidebar, setShowSidebar] = useState(true); // sidebar state if the sidebar is open or closed
  const [screenWidth, setScreenWidth] = useState(window.innerWidth); // current screen width
  const [isMobile, setIsMobile] = useState(screenWidth < MOBILE_THRESHOLD); // is the screen mobile or not
  const [cloudCoverageIsFullScreen, setCloudCoverageIsFullScreen] = useState(false); // is the cloud coverage map full screen or not

  /**
   * Function which is called when the window is resized.
   * Is used to change dynamically between the mobile and desktop view
   */
  function handleResize() {
    setIsMobile(window.innerWidth < MOBILE_THRESHOLD);
    setScreenWidth(window.innerWidth);
  }

  useEffect(() => {
    // Add event listener to dynamically check if the screen is changing from desktop to mobile
    window.addEventListener("resize", handleResize);

    // When the page first loads, check if there is a location in the URL.
    // This is used in the mobile view when the user clicks a location on the home page
    const locationParam = searchParams.get("location");
    if (locationParam) {
      // If there is a location, do the search and load the data
      const location = locationParam.split("_").join(" ");
      searchLocation(location);
      return;
    }

    if (isMobile && !locationParam && !forecastData) {
      // If we are in the mobile view and there is no data or location, the app should
      // go back to home so the user can search for a location
      navigate("/home")
      return
    }

    // If there is no location but we are on desktop, the app can get the users current location
    // using the ip lookup API.
    setApiLoading(true)
    // This asks the user for location permission, and the callback function is only called if the user allows it
    navigator.geolocation.getCurrentPosition(async (pos) => {
      if (!pos && !pos.coords) return;
      // make the api lookup call
      const ipLookupData = await makeIPLookupAPICall();
      console.log("ipLookupData", ipLookupData)
      if (!ipLookupData) {
        console.warn("IP Lookup API Error. Something went wrong. Please try again.")
        return;
      }
      let locationName = ipLookupData?.city;
      // London can appear as "London (City of Westminster)" which doesnt work in the weather api so just use "London"
      locationName = locationName.includes("London") ? "London" : locationName;

      // Make the function call to get all of the api data for this location
      searchLocation(locationName)
    });

    return () => {
      window.removeEventListener("resize", handleResize);
    }
  }, []);

  /**
   * This function makes all of the API calls for a location.
   * If any of the calls fail, set the error state to show the error widget
   */
  const searchLocation = async (location) => {
    console.log("searchLocation", location)
    // Set the loading state to show the loading widget
    if (!apiLoading) setApiLoading(true);

    // Get General Location and Weather Information
    const weatherData = await makeWeatherAPICall(location)
    console.log("weatherData", weatherData)
    if (!weatherData) {
      setApiError(`Weather API Error. Something went wrong. Please try again.`)
      setApiLoading(false);
      return;
    }
    setData(weatherData)
    const coords = weatherData.coord;

    // Get Forecast data and coordinates
    const forecastData = await makeForecastAPICall(location)
    console.log("forecastData", forecastData)
    if (!forecastData) {
      setApiError(`Forecast API Error. Something went wrong. Please try again.`)
      setApiLoading(false);
      return;
    }
    setForecastData(forecastData)

    // Get upcoming events data 
    const eventsData = await makeEventsAPICall(coords.lon, coords.lat)
    setLocationCoords(coords)
    console.log("EventsData", eventsData)
    if (!eventsData) {
      setApiError(`Events API Error. Something went wrong. Please try again.`)
      return;
    }
    const newEvents = [];
    eventsData.forEach((resp) => {
      const data = resp.data.table.rows[0].cells;
      if (data && data.length > 0) {
        newEvents.push(...data); // Collect events
      }
    });

    // Save events to local storage to see on the events pages
    const saveEventsToLocalStorage = (events) => {
      localStorage.setItem("events", JSON.stringify(events));
    };
    setEvents(newEvents);
    saveEventsToLocalStorage(newEvents);

    // Get the stargazing location recommendations information
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

    // All of the API calls have been made and the data has been set
    // Set the loading state to false and remove the error if there is one
    setApiLoading(false);
    setApiError(null);
  };

  // console.log("Rendering events", events);
  // console.log("Weather data", data)

  return (
    <div className="App-container">
      {/* Only show the sidebar if it is not on mobile */}
      {
        !isMobile && <LocationSidebar isOpen={showSidebar} setIsOpen={setShowSidebar} searchLocation={searchLocation} />
      }
      <div className="App" id="dark-mode">
        <div className="top_bar">
          {/* Show the sidebar toggle button or back button depending on whether on mobile and if the sidebar is open */}
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
            {/* Show the icon for changing between light and dark mode, depending on the current mode */}
            {isDarkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg"
                width="50px"
                height="50px"
                fill="currentColor"
                class="bi bi-sun"
                viewBox="0 0 20 20"
                color="white"
                fillOpacity="0.8"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDarkMode()
                }}
                style={{
                  cursor: "pointer", // Show pointer cursor
                  marginTop: "0px",
                }}

              >
                <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708" />
              </svg>
            ) : (
              <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="50px"
                height="50px"
                fill="none"
                viewBox="0 0 26 26"
                color="white"
                fillOpacity="0.6"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDarkMode()
                }}

                style={{
                  cursor: "pointer", // Show pointer cursor
                  marginTop: "0px",
                }}
              >
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M17 5v3m0 0v3m0-3h-3m3 0h3m-3.3556 7.0913c-1.6389 0-2.58-.2487-3.7085-.9576-1.1285-.709-2.0191-1.7196-2.5631-2.9086-.54402-1.1891-.71806-2.50523-.5009-3.78809.2172-1.28287.8161-2.47705 1.724-3.43701-1.3427.20491-2.60689.74436-3.66765 1.56511-1.06077.82074-1.88149 1.8944-2.38113 3.11496-.49965 1.22056-.66094 2.54583-.46795 3.84493.19298 1.2992.73357 2.5273 1.56839 3.563.83482 1.0358 1.93501 1.8435 3.19194 2.3433 1.2569.4999 2.6272.6745 3.9754.5068 1.3482-.1676 2.6279-.6719 3.7125-1.463 1.0847-.7911 1.937-1.8416 2.4726-3.0478-1.0063.5199-1.9323.664-3.3556.664Z" />
              </svg>
            )}
          </div>
        </div>

        {/* Show the loading widget if the API is still loading */}
        {apiLoading && <LoadingWidget isDarkMode={isDarkMode} isMobile={isMobile} />}

        {/* If the API has finished loading and there is an error, show the error widget */}
        {!apiLoading && apiError && <ErrorWidget error={apiError} isDarkMode={isDarkMode} isMobile={isMobile} />}

        {!apiLoading && !apiError && data.name !== undefined && (
          // If the API has finished loading and there is no error, show the weather widgets
          // The widgets are in a container which is a grid on desktop and a column on mobile
          <div className={isMobile ? "weather_container_mobile" : "weather_container"}>
            <div className="conditions weather_element">
              {/* Show the stargazing conditions widget */}
              {/* This is a custom function which takes the weather data and calculates the stargazing conditions */}
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
              {/* Show the location and current temperature widget as well as daily high and low */}
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
              // Show the events widget only on desktop. The mobile version is in a different location
              <div className="events weather_element">
                <EventsWidget events={events} isDarkMode={isDarkMode} />
              </div>
            )}

            <div className="wind_and_rain weather_element">
              {/* Show the current wind and rain level widget */}
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
              {/* Show the hourly and weekly forecast widget */}
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
              {/* Show the cloud map of the location based on the forecast data */}
              <CloudMapWidget
                cloudCoveragePercentage={forecastData?.current?.cloud ?? "N/A"}
                visibility={forecastData?.current?.vis_miles ?? "N/A"}
                coords={locationCoords}
                isDarkMode={isDarkMode}
                isMobile={isMobile}
                isFullScreen={cloudCoverageIsFullScreen}
              />
            </div>

            {isMobile && (
              // Show the events widget here only on mobile.
              <div className={`${isMobile ? "events_mobile" : "events"} weather_element`}>
                <EventsWidget events={events.slice(0, 2)} isDarkMode={isDarkMode} isMobile={isMobile} />
              </div>
            )}

            <div className={`${isMobile ? "reccommendations_mobile" : "reccommendations"} weather_element`}>
              {/* Show the location recommendations */}
              <LocationsWidget recommendations={locationRecommendations} isDarkMode={isDarkMode} isMobile={isMobile} />
            </div>

            <div className="humidity weather_element">
              {/* Show the current relative humidity */}
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
              {/* Show the current light pollution */}
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
          </div>
        )}
        <div id="map"></div>
      </div>
    </div>
  );
}

export default Weather;
