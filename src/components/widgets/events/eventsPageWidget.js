import { useNavigate } from "react-router-dom";
import "./pageWidget.css";

const EventsPageWidget = ({ events, isDarkMode }) => {
  const navigate = useNavigate();

  const eventBackgrounds = ["/Lights.png", "/comet.png", "/meteor_shower.png"];

  const handleClick = (event, backgroundImage) => {
    const eventData = { ...event, background: backgroundImage }; // Add background to event data
    localStorage.setItem("currentEvent", JSON.stringify(eventData));
    navigate("/singleEvent"); // Navigate to SingleEvent page
  };

  return (
    <div className={`widget widget-events ${isDarkMode ? "dark" : "light"}`}>
      <div className="widget-events-header-container">
        <h2 className="wtitle">{events.length} Upcoming Events</h2>
      </div>
      <div className="events-page-widget-events-container">
        {events.map((event, idx) => {
          const backgroundImage =
            eventBackgrounds[idx % eventBackgrounds.length];

          return (
            <div
              key={idx}
              className="events-widget-event-item"
              style={{ backgroundImage: `url(${backgroundImage})` }} // Apply inline style
              onClick={() => handleClick(event, backgroundImage)} // Pass background
            >
              <p>{event.type.split("_").join(" ")}</p>
              <p>{new Date(event.rise).toLocaleString()}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EventsPageWidget;
