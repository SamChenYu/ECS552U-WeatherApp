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