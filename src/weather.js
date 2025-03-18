import React, { useState } from "react";
import axios from "axios";
import "./weather.css";
import SmallWidget from "./components/smallwidget.js";
import { getEventAPIAuthString, getEventAPIUrls } from "./events_api";
import Box from "./box";

function Weather() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [locationRecommendations, setLocationRecommendations] = useState([]);
  const [events, setEvents] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const API_KEY = process.env.REACT_APP_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`;

  const searchLocation = async (event) => {
    if (event.key === "Enter") {
      setEvents([]);
      axios
        .get(url)
        .then(async (response) => {
          setData(response.data);
          console.log(response.data);

          // Call event API using location coordinates from previous response
          const coords = response.data.coord;

          const currentDate = new Date();

          const maxQueryRange = new Date();
          maxQueryRange.setDate(currentDate.getDate() + 366);

          const oneHourFromNow = new Date();
          oneHourFromNow.setHours(currentDate.getHours() + 1);
          const responses = await Promise.all(
            getEventAPIUrls().map((url) =>
              axios
                .get(url, {
                  params: {
                    latitude: coords.lon,
                    longitude: coords.lat,
                    elevation: 0,
                    from_date: currentDate.toISOString().split("T")[0],
                    to_date: maxQueryRange.toISOString().split("T")[0],
                    time: oneHourFromNow.toTimeString().split(" ")[0],
                  },
                  headers: {
                    Authorization: `Basic ${getEventAPIAuthString()}`,
                  },
                })
                .then((response) => {
                  console.log("events", response.data);
                  return response.data;
                })
                .catch((error) => {
                  console.error("Error fetching event:", error);
                  return null;
                })
            )
          );
          console.log("responses", responses);
          responses.forEach((resp) => {
            const data = resp.data.table.rows[0].cells;
            if (!data || data.length === 0) return;
            setEvents([...events, ...data]);
          });
        })
        .catch((error) => {
          console.log(error);
          alert("Location not found");
        });

      // Google Map Location Recommendations
      if (!window.google) {
        console.error("Google API not loaded");
        return;
      }

      const googleMapsAPIEnabled =
        process.env.REACT_APP_GOOGLE_MAP_API_ENABLED === "true" ? true : false;

      if (!googleMapsAPIEnabled) {
        console.warn("Google API disabled during development");
        setLocation("");
        setLocationRecommendations(
          [1, 2, 3].map((el) => {
            return {
              location: {
                lat: el,
                lng: el,
              },
              displayName: `Development Location ${el}`,
            };
          })
        );
        return;
      }

      const request = {
        textQuery: `Viewpoints in ${location}`,
        fields: ["displayName", "location"],
        language: "en-GB",
        maxResultCount: 3,
        region: "uk",
      };

      const { Place } = await window.google.maps.importLibrary("places");
      const { places } = await Place.searchByText(request);
      if (places) {
        setLocationRecommendations(
          places.map((place) => {
            return {
              location: {
                lat: place.location.lat(),
                lng: place.location.lng(),
              },
              displayName: place.displayName,
            };
          })
        );
      }
      setLocation("");
    }
  };

  console.log("Rendering events", events);

  return (
    <div className="App" id="dark-mode" onClick={() => setShowSidebar(false)}>
      <div className="top_bar">
        {showSidebar && (
          <div id="sidebar">
            <div
              className="sidebar-items"
              onClick={() => (window.location = "/")}
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
              onClick={() => (window.location = "/")}
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
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M39.4167 12.5417V8.95833H3.58333V12.5417H39.4167ZM39.4167 19.7083V23.2917H3.58333V19.7083H39.4167ZM39.4167 30.4583V34.0417H3.58333V30.4583H39.4167Z"
              fill="white"
              fill-opacity="0.6"
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
              fill-opacity="0.98"
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
      </div>

      {data.name !== undefined && (
        <div className="weather_container">
          <div className="conditions weather_element">
            <SmallWidget
              title="Tonight's Stargazing Conditions"
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
              level="Good"
            />
          </div>

          <div className="location weather_element">
            <SmallWidget
              title={data.name}
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
              level={
                data.main ? `${data.main.feels_like.toFixed(0)}°C` : "Unknown"
              }
            />
          </div>

          <div className="events weather_element">
            <h2>{events.length} Upcoming events</h2>
            <div>
              {events.map((event, idx) => {
                return (
                  <div key={idx}>
                    <p>{event.type.split("_").join(" ")}</p>
                    <p>Starts at: {new Date(event.rise).toLocaleString()}</p>
                    <p>Ends at at: {new Date(event.set).toLocaleString()}</p>
                  </div>
                );
              })}
            </div>

            {/* <SmallWidget
              title="Events"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 22C13.8565 22 15.637 21.2625 16.9497 19.9497C18.2625 18.637 19 16.8565 19 15C19 13 18 11.1 16 9.5C14 7.9 12.5 5.5 12 3C11.5 5.5 10 7.9 8 9.5C6 11.1 5 13 5 15C5 16.8565 5.7375 18.637 7.05025 19.9497C8.36301 21.2625 10.1435 22 12 22Z" stroke="white" stroke-opacity="0.6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              }
              level="ISS Pass Overhead"
            /> */}
          </div>

          <div className="general_weather weather_element">
            <SmallWidget
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
              level={
                data.main || data.weather || data.wind
                  ? `${data.main ? `${data.main.temp.toFixed()}°C` : ""} ${
                      data.weather ? data.weather[0].main : ""
                    } ${
                      data.wind ? `${data.wind.speed.toFixed()} km/h` : ""
                    }`.trim()
                  : "No weather data"
              }
            />
            <div className="weekly weather_element">
              <Box></Box>
            </div>
          </div>

          <div className="cloud_coverage weather_element">
            <img src="cloud-coverage.png" alt="Cloud Coverage" />
          </div>

          <div className="reccommendations weather_element">
            <div id="recommended_locations_header">
              <h2>Recommended Locations</h2>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-telescope"
              >
                <path d="m10.065 12.493-6.18 1.318a.934.934 0 0 1-1.108-.702l-.537-2.15a1.07 1.07 0 0 1 .691-1.265l13.504-4.44" />
                <path d="m13.56 11.747 4.332-.924" />
                <path d="m16 21-3.105-6.21" />
                <path d="M16.485 5.94a2 2 0 0 1 1.455-2.425l1.09-.272a1 1 0 0 1 1.212.727l1.515 6.06a1 1 0 0 1-.727 1.213l-1.09.272a2 2 0 0 1-2.425-1.455z" />
                <path d="m6.158 8.633 1.114 4.456" />
                <path d="m8 21 3.105-6.21" />
                <circle cx="12" cy="13" r="2" />
              </svg>
            </div>
            <div className="reccommendations">
              {locationRecommendations.map((rec, idx) => {
                return (
                  <div key={idx} className="recommendation">
                    <p>
                      {idx + 1}. {rec.displayName}
                    </p>
                    <div className="recommendation_open_map">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="lucide lucide-land-plot"
                      >
                        <path d="m12 8 6-3-6-3v10" />
                        <path d="m8 11.99-5.5 3.14a1 1 0 0 0 0 1.74l8.5 4.86a2 2 0 0 0 2 0l8.5-4.86a1 1 0 0 0 0-1.74L16 12" />
                        <path d="m6.49 12.85 11.02 6.3" />
                        <path d="M17.51 12.85 6.5 19.15" />
                      </svg>
                      <a
                        target="_blank"
                        href={`https://www.google.com/maps/place/${rec.location.lat},${rec.location.lng}`}
                      >
                        Open in map
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
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
              level="90%"
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
            />
          </div>
        </div>
      )}
      <div id="map"></div>
    </div>
  );
}

export default Weather;
