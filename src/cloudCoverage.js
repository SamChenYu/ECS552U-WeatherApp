import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CloudMapWidget from "./components/widgets/cloudMap/cloudMapWidget";



const CloudCoverage = ({ isDarkMode, toggleDarkMode }) => {

    const navigate = useNavigate();

    const [coords, setCoords] = useState(() => {
        return JSON.parse(localStorage.getItem("cloudMapCoords")) || { lat: 0, lon: 0 };
    });

    const [cloudCoveragePercentage, setCloudCoveragePercentage] = useState(() => {
          return JSON.parse(localStorage.getItem("cloudCoveragePercentage")) || 0;
      }
    );

    const [visibility, setVisibility] = useState(() => {
        return JSON.parse(localStorage.getItem("cloudMapVisibility")) || 0;
      }
    );

    const [isMobile, setIsMobile] = useState(() => {
        return JSON.parse(localStorage.getItem("cloudMapIsMobile")) || false;
      }
    );

    const [isFullScreen, setIsFullScreen] = useState(true);



  return (
    <div>
      <div className="top_bar">
        <svg
          className="back_button"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="31"
          viewBox="0 0 20 31"
          fill="none"
          onClick={() => {
            navigate("/weather")
          }}
        >
          <path
            d="M0.680984 13.8536L13.8409 0.682755C14.7505 -0.227585 16.2213 -0.227585 17.1213 0.682755L19.3081 2.87145C20.2177 3.78179 20.2177 5.25383 19.3081 6.15448L9.98972 15.5L19.3178 24.8358C20.2274 25.7462 20.2274 27.2182 19.3178 28.1189L17.1309 30.3172C16.2213 31.2276 14.7505 31.2276 13.8506 30.3172L0.690661 17.1464C-0.228601 16.236 -0.228601 14.764 0.680984 13.8536Z"
            fill="white"
            fill-opacity="0.8"
          />
        </svg>
            {isDarkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg"
              width="50px"
              height="50px"
              fill="currentColor"
              class="bi bi-sun" 
              viewBox="0 0 20 20"
              color ="white"
              fillOpacity = "0.8"
              onClick={(e) => {
                e.stopPropagation();
                toggleDarkMode()
              }}
              style={{
                cursor: "pointer", // Show pointer cursor
                marginTop: "0px",
              }}

              >
                <path  d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"/>
              </svg>
            ) : (
            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" 
            xmlns="http://www.w3.org/2000/svg"
             width="50px" 
             height="50px" 
             fill="none" 
             viewBox="0 0 26 26"
             color ="white"
             fillOpacity = "0.6"
             onClick={(e) => {
               e.stopPropagation();
               toggleDarkMode()
             }}

             style={{
               cursor: "pointer", // Show pointer cursor
               marginTop: "0px",
             }}
             >
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M17 5v3m0 0v3m0-3h-3m3 0h3m-3.3556 7.0913c-1.6389 0-2.58-.2487-3.7085-.9576-1.1285-.709-2.0191-1.7196-2.5631-2.9086-.54402-1.1891-.71806-2.50523-.5009-3.78809.2172-1.28287.8161-2.47705 1.724-3.43701-1.3427.20491-2.60689.74436-3.66765 1.56511-1.06077.82074-1.88149 1.8944-2.38113 3.11496-.49965 1.22056-.66094 2.54583-.46795 3.84493.19298 1.2992.73357 2.5273 1.56839 3.563.83482 1.0358 1.93501 1.8435 3.19194 2.3433 1.2569.4999 2.6272.6745 3.9754.5068 1.3482-.1676 2.6279-.6719 3.7125-1.463 1.0847-.7911 1.937-1.8416 2.4726-3.0478-1.0063.5199-1.9323.664-3.3556.664Z"/>
            </svg>
          )}
      </div>
      
      {/* Updated Map Widget*/}
          

        <div style={{ maxHeight: "80vh", maxWidth: "80vw", display: "flex", justifyContent: "center", alignItems: "center", margin: "auto"}} className="cloudMapWidget">
          <CloudMapWidget
                    cloudCoveragePercentage={cloudCoveragePercentage ?? "N/A"}
                    visibility={visibility?? "N/A"}
                    coords={coords}
                    isDarkMode={isDarkMode}
                    isMobile={isMobile}
                    isFullScreen={isFullScreen}
                  />
        </div>


        
    </div>
  );
};

export default CloudCoverage;