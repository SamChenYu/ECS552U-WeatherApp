import "./cloudMapWidget.css";

const CloudMapWidget = ({
  cloudCoveragePercentage,
  visibility,
  isDarkMode,
}) => {
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
        <img src="cloud-coverage.png" alt="Cloud Coverage" />
      </div>
    </div>
  );
};

export default CloudMapWidget;
