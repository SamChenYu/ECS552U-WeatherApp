import "./eventsWidget.css";

const SingleEventWidget = ({ isDarkMode }) => {
  const singleEvent = JSON.parse(localStorage.getItem("currentEvent"));

  if (!singleEvent) {
    return <p>No event selected</p>;
  }

  const { type, rise, set, background } = singleEvent; // Get background from localStorage

  const riseDate = new Date(rise);
  const setDate = set ? new Date(set) : null;

  // Function to format date and time separately
  const formatDateTime = (date) => {
    return { date: date.toLocaleDateString(), time: date.toLocaleTimeString() };
  };

  const eventType = type.split("_").join(" ");
  const capitalizedEventType =
    eventType.charAt(0).toUpperCase() + eventType.slice(1);

  return (
    <div className={`widget widget-events ${isDarkMode ? "dark" : "light"}`}>
      <div className="widget-events-header-container">
        <h2 className="wtitle">Event Details</h2>
      </div>
      <div className="events-widget-events-container">
        <div
          className="single-events-widget-event-item"
          style={{
            backgroundImage: background ? `url(${background})` : "none", // Apply background
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <p>
            <strong>Event Type:</strong> {capitalizedEventType}
          </p>
          <p>
            <strong>Rise Date:</strong> {formatDateTime(riseDate).date}
          </p>
          <p>
            <strong>Rise Time:</strong> {formatDateTime(riseDate).time}
          </p>

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

          {singleEvent.eventHighlights && (
            <>
              <p>
                <strong>Partial Start Date:</strong>{" "}
                {new Date(
                  singleEvent.eventHighlights.partialStart.date
                ).toLocaleDateString()}
              </p>
              <p>
                <strong>Partial Start Time:</strong>{" "}
                {new Date(
                  singleEvent.eventHighlights.partialStart.date
                ).toLocaleTimeString()}
              </p>
              <p>
                <strong>Peak Date:</strong>{" "}
                {new Date(
                  singleEvent.eventHighlights.peak.date
                ).toLocaleDateString()}
              </p>
              <p>
                <strong>Peak Time:</strong>{" "}
                {new Date(
                  singleEvent.eventHighlights.peak.date
                ).toLocaleTimeString()}
              </p>
              <p>
                <strong>Partial End Date:</strong>{" "}
                {new Date(
                  singleEvent.eventHighlights.partialEnd.date
                ).toLocaleDateString()}
              </p>
              <p>
                <strong>Partial End Time:</strong>{" "}
                {new Date(
                  singleEvent.eventHighlights.partialEnd.date
                ).toLocaleTimeString()}
              </p>
            </>
          )}

          {singleEvent.extraInfo && singleEvent.extraInfo.obscuration && (
            <p>
              <strong>Obscuration:</strong> {singleEvent.extraInfo.obscuration}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleEventWidget;
