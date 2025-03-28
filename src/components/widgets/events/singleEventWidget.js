import "./eventsWidget.css";

const EventsPageWidget = ({ events, isDarkMode }) => {
  return (
    <div className={`widget widget-events ${isDarkMode ? "dark" : "light"}`}>
      <div className="widget-events-header-container">
        <h2 className="wtitle">{events.length} Upcoming Events</h2>
      </div>
      <div className="events-widget-events-container">
        {events.map((event, idx) => {
          const riseDate = new Date(event.rise);
          const setDate = event.set ? new Date(event.set) : null;

          // Function to format date and time separately
          const formatDateTime = (date) => {
            const formattedDate = date.toLocaleDateString();
            const formattedTime = date.toLocaleTimeString();
            return { date: formattedDate, time: formattedTime };
          };
          const eventType = event.type.split("_").join(" ");
          const capitalizedEventType =
            eventType.charAt(0).toUpperCase() + eventType.slice(1);

          return (
            <div key={idx} className="events-widget-event-item">
              <p>
                <strong>Event Type:</strong> {capitalizedEventType}
              </p>
              <p>
                <strong>Rise Date:</strong> {formatDateTime(riseDate).date}
              </p>
              <p>
                <strong>Rise Time:</strong> {formatDateTime(riseDate).time}
              </p>

              {/* Only show the Set time if it exists */}
              {setDate && (
                <>
                  <p>
                    <strong>Set Date:</strong> {formatDateTime(setDate).date}
                  </p>
                  <p>
                    <strong>Set Time:</strong> {formatDateTime(setDate).time}
                  </p>
                </>
              )}

              {/* Render eventHighlights and extraInfo if available */}
              {event.eventHighlights && (
                <>
                  <p>
                    <strong>Partial Start Date:</strong>{" "}
                    {new Date(
                      event.eventHighlights.partialStart.date
                    ).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Partial Start Time:</strong>{" "}
                    {new Date(
                      event.eventHighlights.partialStart.date
                    ).toLocaleTimeString()}
                  </p>
                  <p>
                    <strong>Peak Date:</strong>{" "}
                    {new Date(
                      event.eventHighlights.peak.date
                    ).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Peak Time:</strong>{" "}
                    {new Date(
                      event.eventHighlights.peak.date
                    ).toLocaleTimeString()}
                  </p>
                  <p>
                    <strong>Partial End Date:</strong>{" "}
                    {new Date(
                      event.eventHighlights.partialEnd.date
                    ).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Partial End Time:</strong>{" "}
                    {new Date(
                      event.eventHighlights.partialEnd.date
                    ).toLocaleTimeString()}
                  </p>
                </>
              )}

              {event.extraInfo && event.extraInfo.obscuration && (
                <p>
                  <strong>Obscuration:</strong> {event.extraInfo.obscuration}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EventsPageWidget;
