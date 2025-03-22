import "./eventsWidget.css"

const EventsWidget = ({ events }) => {
    return <div className="widget widget-events">
        <div className="widget-events-header-container">
            <h2 className="wtitle">{events.length} Upcoming Events</h2>
            <p>See all</p>
        </div>
        <div className="events-widget-events-container">
            {
                events.map((event, idx) => {
                    return <div key={idx} className="events-widget-event-item">
                        <p>{event.type.split("_").join(" ")}</p>
                        <p>{new Date(event.rise).toLocaleString()}</p>
                    </div>
                })
            }
        </div>
    </div>
}

export default EventsWidget;