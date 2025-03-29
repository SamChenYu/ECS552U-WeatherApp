import { useNavigate } from "react-router-dom";
import "./pageWidget.css";

const EventsPageWidget = ({ events, isDarkMode }) => {
  const navigate = useNavigate(); // React Router Hook for navigation

  const handleClick = (event) => {
    localStorage.setItem("currentEvent", JSON.stringify(event));
    console.log("Event clicked:", event);
    navigate("/singleEvent"); // Navigate to SingleEvent page
  };

  return (
    <div className={`widget widget-events ${isDarkMode ? "dark" : "light"}`}>
      <div className="widget-events-header-container">
        <h2 className="wtitle">{events.length} Upcoming Events</h2>
      </div>
      <div className="events-page-widget-events-container">
        {events.map((event, idx) => (
          <div
            key={idx}
            className="events-widget-event-item"
            onClick={() => handleClick(event)}
          >
            <p>{event.type.split("_").join(" ")}</p>
            <p>{new Date(event.rise).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsPageWidget;
