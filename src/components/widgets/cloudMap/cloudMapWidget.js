import "./cloudMapWidget.css";

const CloudMapWidget = ({
  cloudCoveragePercentage,
  visibility,
  isDarkMode,
}) => {

  // Generate simulated cloud map data
  const gridRow = 30;
  const gridCol = 20;
  const squares = [];
  
  function generateCloudOpacity() {
    const cloudFormationProbability = 0.5; 
    const noiseFactor = Math.random();
    
    // Higher opacity in clusters (clouds), lower opacity elsewhere
    if (noiseFactor < cloudFormationProbability) {
      return Math.random() * 0.8 + 0.5; // Opacity in the range [0.5, 1]
    } else {
      return Math.random() * 0.1; // Opacity in the range [0, 0.1]
    }
  }
  
  for (let i = 0; i < gridRow * gridCol; i++) {
    const opacity = generateCloudOpacity();
    squares.push(
      <div
        key={i}
        className="widget-cloud-coverage-square"
        style={{
          background: `rgba(255, 255, 255, ${opacity})`,
        }}
      ></div>
    );
  }

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
        <div className="widget-cloud-coverage-grid">{squares}</div>
      </div>
    </div>
  );
};

export default CloudMapWidget;
