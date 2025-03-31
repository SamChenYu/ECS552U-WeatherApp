import "./eventsWidget.css";

const SingleEventWidget = ({ isDarkMode, singleEvent }) => {
  if (!singleEvent) {
    return <p>No event selected</p>;
  }

  const riseDate = new Date(singleEvent.rise);
  const setDate = singleEvent.set ? new Date(singleEvent.set) : null;

  // Function to format date and time separately
  const formatDateTime = (date) => {
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString();
    return { date: formattedDate, time: formattedTime };
  };

  const eventType = singleEvent.type.split("_").join(" ");
  const capitalizedEventType =
    eventType.charAt(0).toUpperCase() + eventType.slice(1);

  return (
    <div className={`widget widget-events ${isDarkMode ? "dark" : "light"}`}>
      <div className="widget-events-header-container">
        <h2 className="wtitle">Event Details</h2>
      </div>
      <div className="events-widget-events-container">
        <div className="single-events-widget-event-item">
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
