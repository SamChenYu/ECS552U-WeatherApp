import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./locationSidebar.css";
import makeForecastAPICall from "../../api/forecastAPI";
import { useSearchParams } from "react-router-dom";

// This shows either the home page on mobile view or the sidebar on desktop view
const LocationSidebar = ({ isOpen, setIsOpen, searchLocation, isDarkMode, isMobile, toggleDarkMode }) => {
    const [searchParams, setSearchParams] = useSearchParams(); // search parameters in the url
    const navigate = useNavigate();
    const [location, setLocation] = useState(""); // currently entered location in the search bar
    const [savedLocations, setSavedLocations] = useState(() => {
        return JSON.parse(localStorage.getItem("savedLocations")) ?? [];
    }) // saved locations in local storage
    const [locationData, setLocationData] = useState([]); // location data for the saved locations

    useEffect(() => {
        // This part of the code might not be needed. It checks if the location is in the url but
        // this should only happen on /weather page and is checked there.
        const locationParam = searchParams.get("location");
        console.log("searchParam", searchParams.get("location"))
        if (locationParam) {
            // If there is a location in the url, set the current location to that when the page loads
            const location = locationParam.split("_").join(" ");
            setLocation(location)
            searchLocation(location);
        }

        // This function fetches the current data for all the user's saved locations to show
        // in the location widgets in the sidebar / home page
        const fetchLocationData = async () => {
            const newLocationData = [];

            for (let i = 0; i < savedLocations.length; i++) {
                // Only make forecast API call as we only need temperature and current conditions which
                // is from this api
                const forecastData = await makeForecastAPICall(savedLocations[i].name, 1);
                console.log("ForecastData presaved", forecastData);

                if (!forecastData) {
                    continue;
                }

                newLocationData.push({
                    name: forecastData.location.name,
                    country: forecastData.location.country,
                    currentTemp: forecastData.forecast.forecastday[0].day.avgtemp_c,
                    minTemp: forecastData.forecast.forecastday[0].day.mintemp_c,
                    maxTemp: forecastData.forecast.forecastday[0].day.maxtemp_c,
                    currentConditionIcon: forecastData.current.condition.icon
                });
            }

            if (!isMobile && location == "" && savedLocations.length > 0) {
                // If we are on desktop and don't have a location currently selected, but have saved locations,
                // load the first saved location so the screen is not empty
                setLocation(savedLocations[0].name)
                searchLocation(savedLocations[0].name)
            }

            setLocationData(newLocationData);
        };

        fetchLocationData();
    }, []);

    // This function is called when the user types in the serach bar. It is used to get the data for the location widget in the
    // sidebar / home page. it also saves the location to local storage
    const handleSearch = async (event) => {
        // Only search if the user presses enter
        if (event.key === "Enter") {
            // Make the forecast API call to get the data overview for the location
            const forecastData = await makeForecastAPICall(location, 1);
            console.log("ForecastData", forecastData);
            if (!forecastData) {
                return null
            }

            // If the location is already in the saved locations, do not add it again, otherwisde add it to local storage 
            if (savedLocations.find(location => location.name == forecastData.location.name && location.country == forecastData.location.country)) {
                return null
            }
            localStorage.setItem("savedLocations", JSON.stringify([...savedLocations, {
                name: forecastData.location.name,
                country: forecastData.location.country
            }]))

            // Update the saved locations state
            setLocationData([...locationData, {
                name: forecastData.location.name,
                country: forecastData.location.country,
                currentTemp: forecastData.forecast.forecastday[0].day.avgtemp_c,
                minTemp: forecastData.forecast.forecastday[0].day.mintemp_c,
                maxTemp: forecastData.forecast.forecastday[0].day.maxtemp_c,
                currentConditionIcon: forecastData.current.condition.icon
            }])

            if (!isMobile) {
                // If the app is in desktop mode, we can set the location to load the data
                // On mobile, the user will have to click the location to be directed to the /weather page
                searchLocation(location)
            }
        }
    }

    // This function is called when the user clicks on a location widget in the sidebar / home page
    const handleLocationClick = (location) => {
        if (isMobile) {
            // On mobile, the app has to navigate to the /weather page and pass the location in the url
            navigate(`/weather?location=${location.split(" ").join("_")}`)
            return;
        }
        // On desktop, the app can load the weather data on the current page
        setLocation(location)
        searchLocation(location)
    }

    return <div className={`location-sidebar${isMobile ? "-mobile" : ""} ${!isOpen ? "location-sidebar-hidden" : ""}`}>
        <div className="location-sidebar-header">
            {/* Sidebar toggle icon */}
            {!isMobile &&
                <svg onClick={() => setIsOpen(false)} xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" fillOpacity="0.6" stroke-linejoin="round" class="sidebar-toggle"><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M15 3v18" /><path d="m8 9 3 3-3 3" /></svg>
            }
            <div className="location-sidebar-header-search">
                {/* Location search icon and input */}
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
                    onKeyPress={handleSearch}
                    placeholder="Search Location"
                    type="text"
                />
            </div>
            {/* Show light/dark mode toggle icon only on mobile. On desktop it is in a different location in /weather */}
            {isMobile &&
                (isDarkMode ? (
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
                ))}

        </div>
        <div className="location-container">
            {/* Show all saved location widgets in a column if there are any */}
            {savedLocations.length == 0 && <h1>No saved locations</h1>}
            {locationData.map((location, idx) => <div key={idx} className={`widget location_widget ${isDarkMode ? "dark" : "light"}`} onClick={() => handleLocationClick(location.name)}>
                <div className="location_widget_text">
                    <h1 className="location_widget_text location_widget_text_header">{location.currentTemp.toFixed(0)}°C</h1>
                    <p className="location_widget_text location_widget_text_subtext">{`H:${location.maxTemp?.toFixed(
                        0
                    )}°C L:${location.minTemp?.toFixed(0)}°C`}</p>
                    <p className="location_widget_text_location">{location.name}, {location.country}</p>
                </div>
                <div>
                    <img src={location.currentConditionIcon} alt="Current Condition Icon" />
                </div>
            </div >)
            }
        </div >
    </div>
}

export default LocationSidebar;