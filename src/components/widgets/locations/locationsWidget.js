import "./locationsWidget.css";
const LocationsWidget = ({ recommendations, isDarkMode, isMobile }) => {
  return (
    <div className={`widget widget-locations ${isDarkMode ? "dark" : "light"}`}>
      <div className={`widget-locations-header-container${isMobile ? "-mobile" : ""}`}>
        <h2 className={`wtitle${isMobile ? "_mobile" : ""}`}>Recommended Locations</h2>
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
          className="lucide lucide-telescope"
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
      <div className="widget-locations-recommendations-container">
        {recommendations.map((rec, idx) => {
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
                  className="lucide lucide-land-plot"
                >
                  <path d="m12 8 6-3-6-3v10" />
                  <path d="m8 11.99-5.5 3.14a1 1 0 0 0 0 1.74l8.5 4.86a2 2 0 0 0 2 0l8.5-4.86a1 1 0 0 0 0-1.74L16 12" />
                  <path d="m6.49 12.85 11.02 6.3" />
                  <path d="M17.51 12.85 6.5 19.15" />
                </svg>
                <a
                  target="_blank"
                  href={`https://www.google.com/maps/place/${rec.location.lat()},${rec.location.lng()}`}
                >
                  Open in map
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LocationsWidget;
