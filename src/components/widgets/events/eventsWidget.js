import "./eventsWidget.css";
import { useNavigate } from "react-router-dom";

const EventsWidget = ({ events, isDarkMode, isMobile }) => {
  const navigate = useNavigate();
  return (
    <div className={`widget widget-events ${isDarkMode ? "dark" : "light"}`}>
      <div className={`widget-events-header-container${isMobile ? "-mobile" : ""}`}>
        <h2 className={`wtitle${isMobile ? "_mobile" : ""}`}>{events.length} Upcoming Events</h2>
        <a href="../events" class="events_link">
          See all
        </a>
      </div>
      <div className="events-widget-events-container">
        {events.length === 0 && (
          <div className="events-widget-no-events">
            <p>No events available</p>
          </div>
        )}
        {events.map((event, idx) => {
          return (
            <div key={idx} className="events-widget-event-item" onClick={() => {
              localStorage.setItem("currentEvent", JSON.stringify(event));
              console.log("Event clicked:", event);
              navigate("/singleEvent"); // Navigate to SingleEvent page
            }}>
              <p>{event.type.split("_").join(" ")}</p>
              <p>{new Date(event.rise).toLocaleString()}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EventsWidget;
