import React, { useState, useEffect } from "react";
import "./cloudMapWidget.css";

/*

  This component is reused twice:
  - Weather page
  - Cloud coverage page

  This component takes in isFullScreen as a prop to determine map settings
  Within the Weather page, isFullScreen is false and map is smaller
  Within the Cloud coverage page, isFullScreen is true and map is larger

*/


const CloudMapWidget = ({
  cloudCoveragePercentage,
  visibility,
  isDarkMode,
  isMobile,
  coords,
  isFullScreen,
  }) => {

  if(isFullScreen) {
    // Fetch data from localStorage instead of props
    cloudCoveragePercentage = JSON.parse(localStorage.getItem("cloudMapPercentage")) || 0;
    visibility = JSON.parse(localStorage.getItem("cloudMapVisibility")) || 0;
    isDarkMode = JSON.parse(localStorage.getItem("isDarkMode")) || false;
    isMobile = JSON.parse(localStorage.getItem("isMobile")) || false;
    coords = JSON.parse(localStorage.getItem("cloudMapCoords")) || { lat: 0, lon: 0 };
  }




  // Cloud generating grid => Simulated data
  const [squares, setSquares] = useState([]);

  const generateCloudOpacity = (cloudCoveragePercentage) => {
    const cloudFormationProbability = cloudCoveragePercentage / 100;
    const noiseFactor = Math.random();
    if (noiseFactor < cloudFormationProbability) {
      return Math.random() * 0.7 + 0.2; // Opacity between [0.2, 0.9]
    } else {
      return Math.random() * 0.1; // Opacity between [0, 0.2]
    }
  };

  // Generate the grid once or when cloudCoveragePercentage changes
  useEffect(() => {
    const gridRow = 30;
    const gridCol = 20;

    
    const newSquares = [];

    for (let i = 0; i < gridRow * gridCol; i++) {
      const opacity = generateCloudOpacity(cloudCoveragePercentage);
      newSquares.push(
        <div
          key={i}
          className="widget-cloud-coverage-square"
          style={{
            background: `rgba(255, 255, 255, ${opacity})`,
          }}
        ></div>
      );
    }
    setSquares(newSquares);
  }, [cloudCoveragePercentage]); 

  // Map API
  const [mapUrl, setMapUrl] = useState("");
  useEffect(() => {

    if (!coords || !coords.lat || !coords.lon) {
      console.error("Invalid coordinates");
    }

    const API_KEY = process.env.REACT_APP_STATIC_MAPS_API_KEY;
    const lat = coords.lat;
    const lon = coords.lon;

    // Save information for cloudcoverage page
    localStorage.setItem("cloudMapCoords", JSON.stringify(coords)); // Save coords to local storage
    const mapZoom = isFullScreen ? 10 : 8;
    console.log("Map zoom level:", mapZoom);
    const url = `https://maps.geoapify.com/v1/staticmap?&width=1200&height=500&center=lonlat%3A${lon}%2C${lat}&zoom=${mapZoom}&apiKey=${API_KEY}`;
    // Possible style=dark-matter-purple-roads
    setMapUrl(url);

  }, [coords])

  useEffect(() => {
    localStorage.setItem("cloudMapPercentage", JSON.stringify(cloudCoveragePercentage));
  }, [cloudCoveragePercentage]);

  useEffect(() => {
    localStorage.setItem("cloudMapVisibility", JSON.stringify(visibility));
  }, [visibility]);

  useEffect(() => {
    localStorage.setItem("cloudMapIsMobile", JSON.stringify(isMobile)); // Save isMobile to local storage
  })

  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  console.log("Rendering CloudMapWidget with isFullScreen:", isFullScreen);
  console.log("Cloud Coverage Percentage:", cloudCoveragePercentage);

  return (
    <div
      className={`widget widget-cloud-coverage ${isDarkMode ? "dark" : "light"
        }`}
    >
      <div className="widget-cloud-coverage-header">
        <div>
          <p className={`widget-cloud-coverage-title${isMobile ? "_mobile" : ""}`}>Cloud coverage</p>
          <p className={`widget-cloud-coverage-level${isMobile ? "_mobile" : ""}`}>
            {cloudCoveragePercentage}%{" "}
            <span className={`widget-cloud-coverage-description${isMobile ? "_mobile" : ""}`}>
              Visibility: {visibility} miles
            </span>
          </p>
        </div>
        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
          <svg
            className="widget-cloud-coverage-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FFFF"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M17.5 21H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
            <path d="M22 10a3 3 0 0 0-3-3h-2.207a5.502 5.502 0 0 0-10.702.5" />
          </svg>
          {Boolean(!isFullScreen) && <a href="../cloudcoverage" style={{ color: "white" }}>Fullscreen</a>}

        </div>


      </div>
      <div className="widget-cloud-coverage-map">

        {/*<img src="cloud-coverage.png" alt="Cloud Coverage" />*/}
        {mapUrl ? (
          <img src={mapUrl} alt="Cloud Coverage" className="widget-cloud-coverage-map" onLoad={handleImageLoad} />
        ) : (
          <p>Loading map...</p> // Show loading text until mapUrl is available
        )}

        {isImageLoaded && (
          <div className="widget-cloud-coverage-grid">
            {/* Only render squares after image has loaded */}
            {squares}
          </div>
        )}
      </div>
    </div>
  );
};

export default CloudMapWidget;
