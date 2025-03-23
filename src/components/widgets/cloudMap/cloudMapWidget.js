import React, { useState, useEffect } from "react";
import "./cloudMapWidget.css";


const CloudMapWidget = ({
  cloudCoveragePercentage,
  visibility,
  isDarkMode,
  coords,
  }) => {

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
    }, [cloudCoveragePercentage]); // Only run when cloudCoveragePercentage changes to prevent re-rendering (e.g. when keyboard is typed)

  // Map API
  const [mapUrl, setMapUrl] = useState("");
  useEffect(() => {

    if(!coords || !coords.lat || !coords.lon) {
      console.error("Invalid coordinates");
    }

    const API_KEY = process.env.REACT_APP_STATIC_MAPS_API_KEY;
    const lat = coords.lat;
    const lon = coords.lon;
    const url = `https://maps.geoapify.com/v1/staticmap?&width=1200&height=500&center=lonlat%3A${lon}%2C${lat}&zoom=10&apiKey=${API_KEY}`;
    // Possible style=dark-matter-purple-roads
    setMapUrl(url);

  }, [coords])

  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  


  return (
    <div
      className={`widget widget-cloud-coverage ${
        isDarkMode ? "dark" : "light"
      }`}
    >
      <div className="widget-cloud-coverage-header">
        <div>
          <p className="widget-cloud-coverage-title">Cloud coverage</p>
          <p className="widget-cloud-coverage-level">
            {cloudCoveragePercentage}%{" "}
            <span className="widget-cloud-coverage-description">
              Visibility: {visibility} miles
            </span>
          </p>
        </div>
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
