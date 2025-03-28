import "./pageWidget.css";
const EventsPageWidget = ({ events, isDarkMode }) => {
  return (
    <div className={`widget widget-events ${isDarkMode ? "dark" : "light"}`}>
      <div className="widget-events-header-container">
        <h2 className="wtitle">{events.length} Upcoming Events</h2>
      </div>
      <div className="events-widget-events-container">
        {events.map((event, idx) => {
          return (
            <div
              key={idx}
              className="events-widget-event-item"
              onClick={() => (window.location = "/weather")}
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
